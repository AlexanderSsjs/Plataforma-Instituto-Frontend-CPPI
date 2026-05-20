import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

// Interceptor para capturar caídas de sesión (401)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('auth_token');
            // Aquí puedes meter la redirección al login cuando implementemos las rutas
        }
        return Promise.reject(error);
    },
);

export default apiClient;
