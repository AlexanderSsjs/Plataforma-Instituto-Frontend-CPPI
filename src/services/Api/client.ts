import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Vital para Laravel Sanctum / Breeze (Manejo de Cookies HttpOnly)
});

// Interceptor para inyectar el token Bearer si manejas API Tokens tradicionales
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Mantenemos 'token' de manera consistente con tu AuthContext
        const token = localStorage.getItem('token'); 
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// 🔒 INTERCEPTOR DE RESPUESTAS SEGURO Y CONTROLADO
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // Sincronizamos las llaves para limpiar exactamente lo mismo que guarda tu AuthContext
            localStorage.removeItem('token');
            localStorage.removeItem('user');

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