import apiClient from '../Api/client';

// 👤 Estructura alineada con tus tablas y lo que retorna el controlador
export interface User {
    id: number;
    email: string;
    rol_id?: number; // Por si manejas el ID numérico directo de la tabla usuarios
    rol?: 'superuser' | 'admin' | 'secretary' | 'teacher' | 'student'; // Si cargas la relación
    nombres?: string;   // Opcionales por si en algún endpoint no se cargan desde 'perfiles'
    apellidos?: string;
    foto_perfil?: string | null;
    estado: 'activo' | 'inactivo';
}

// 📦 Estructura de respuesta REAL de tu API Laravel
export interface LoginResponse {
    status: string;
    token: string;       // 🔒 CORREGIDO: Laravel envía 'token', no 'access_token'
    token_type: string;
    user: User;          // 🔒 CORREGIDO: Laravel envía 'user', no 'usuario'
}

// 🔒 SERVICIO DE AUTENTICACIÓN UNIFICADO
export const authService = {
    /**
     * Iniciar sesión tradicional enviando credenciales sanadas.
     */
    login: async (credentials: Record<string, string>): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/login', credentials);
        return response.data;
    },

    /**
     * Destruye el token o la cookie activa en el servidor de Laravel.
     */
    logout: async (): Promise<void> => {
        await apiClient.post('/logout');
    },

    /**
     * REFUERZO CRÍTICO: Recupera la sesión activa al presionar F5 o recargar la SPA.
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/user'); 
        return response.data;
    },
};

// Exportación por defecto limpia del objeto ya declarado
export default authService;