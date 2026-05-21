import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Vital para Laravel Sanctum / Breeze
});

// Interceptor para inyectar el token Bearer si manejas API Tokens tradicionales
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// 🔒 INTERCEPTOR DE RESPUESTAS SEGURO Y CONTROLADO
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Limpiamos los datos locales para asegurar que no queden residuos corruptos
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');

            // 🔒 REFUERZO: Solo redirigimos físicamente si el usuario YA estaba navegando activamente 
            // y no durante el arranque inicial o refresco de la SPA.
            const isInitialLoad = document.readyState !== 'complete';
            if (!isInitialLoad && !window.location.pathname.startsWith('/login')) {
                window.location.href = '/login?reason=expired';
            }
        }
        return Promise.reject(error);
    },
);

export default apiClient;