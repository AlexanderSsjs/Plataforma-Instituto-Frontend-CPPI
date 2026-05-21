import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/Auth/authService';
import apiClient from '@/services/Api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('auth_token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Aseguramos de inmediato la cabecera por si el interceptor tarda en registrarse
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Consultamos de forma directa al backend de Laravel
                const validatedUser = await authService.getCurrentUser();
                setUser(validatedUser);
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Error de validación asíncrona en F5:', error);
                }
                // Si el token falló o expiró, ejecutamos la acción de limpieza local sin bucles
                setUser(null);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
            } finally {
                setLoading(false); // Liberamos el candado de carga de la app
            }
        };

        checkSession();
    }, []);

    const loginAction = async (credentials) => {
        const data = await authService.login(credentials);
        const currentUser = data.user || data;
        const currentToken = data.token;

        setUser(currentUser);

        if (currentToken) {
            localStorage.setItem('auth_token', currentToken);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
        }

        localStorage.setItem('auth_user', JSON.stringify(currentUser));
        return currentUser;
    };

    const logoutAction = async () => {
        try {
            await authService.logout();
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error al notificar cierre de sesión al servidor:', error);
            }
        } finally {
            setUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            delete apiClient.defaults.headers.common['Authorization'];
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login: loginAction, logout: logoutAction }}>
            {!loading ? (
                children
            ) : (
                <div className="flex h-screen w-screen items-center justify-center bg-[#0f172a] text-white">
                    <div className="text-center">
                        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-500 border-t-transparent mx-auto"></div>
                        <p className="text-xl font-semibold animate-pulse tracking-wide">
                            Verificando credenciales seguras...
                        </p>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
