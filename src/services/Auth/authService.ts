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
    login: async (credentials: Record<string, string>): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/login', credentials);
        return response.data;
    },
    logout: async (): Promise<void> => {
        await apiClient.post('/logout');
    },
};

export default authService;