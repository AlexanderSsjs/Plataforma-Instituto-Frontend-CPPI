import apiClient from '../Api/client';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
}

export interface LoginResponse {
    user: User;
    token?: string; 
}

export const authService = {
    // 1. Iniciar sesión tradicional
    login: async (credentials: Record<string, string>): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/login', credentials);
        return response.data;
    },

    // 2. Cerrar sesión destruyendo la cookie en Laravel
    logout: async (): Promise<void> => {
        await apiClient.post('/logout');
    },

    // 🔒 REFUERZO CRÍTICO: Recuperar la sesión activa al presionar F5
    // Laravel leerá la cookie HttpOnly que viaja encriptada y nos devolverá al usuario
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/user'); // O tu endpoint correspondiente: '/me', '/profile'
        return response.data;
    },
};

export default authService;