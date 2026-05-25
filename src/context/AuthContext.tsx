import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '@/services/Auth/authService';
import apiClient from '@/services/Api/client';

// 📦 1. Definimos la estructura estricta que compartirá el Contexto
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: Record<string, string>) => Promise<User>;
    logout: () => Promise<void>;
}

// Inicializamos el contexto con el tipo correcto (o null)
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    // 👤 Tipamos el estado de React con la interfaz real de tu base de datos
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // authService.getCurrentUser() ya retorna una promesa de tipo 'User'
                const validatedUser = await authService.getCurrentUser();
                setUser(validatedUser);
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Error de validación asíncrona en F5:', error);
                }
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                delete apiClient.defaults.headers.common['Authorization'];
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    // 🔒 Tipamos estrictamente la entrada y salida de la acción de login
    const loginAction = async (credentials: Record<string, string>): Promise<User> => {
        try {
            const data = await authService.login(credentials);

            const currentUser = data.user;
            const currentToken = data.token;

            if (!currentUser) {
                throw new Error('La respuesta del servidor no contiene datos de usuario válidos.');
            }

            setUser(currentUser);
            localStorage.setItem('user', JSON.stringify(currentUser));

            if (currentToken) {
                localStorage.setItem('token', currentToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
            }

            return currentUser;
        } catch (error) {
            throw error;
        }
    };

    const logoutAction = async (): Promise<void> => {
        try {
            await authService.logout();
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error al notificar cierre de sesión al servidor:', error);
            }
        } finally {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete apiClient.defaults.headers.common['Authorization'];
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login: loginAction, logout: logoutAction }}>
            {!loading ? (
                children
            ) : (
                /* Pantalla de Carga Premium Estilo SaaS con Glassmorphism sutil */
                <div className="flex h-screen w-screen items-center justify-center bg-[#090d16] relative overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-yellow-500/10 blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]"></div>

                    <div className="text-center z-10 p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-2xl">
                        <div className="mb-5 h-12 w-12 animate-spin rounded-full border-[3px] border-solid border-yellow-500 border-t-transparent mx-auto"></div>
                        <p className="text-lg font-medium text-slate-200 tracking-wide">
                            Verificando credenciales seguras
                        </p>
                        <p className="text-xs text-slate-400 mt-1 animate-pulse">
                            Conectando con la pasarela académica...
                        </p>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
}

// 🔒 Ganamos tipado automático al consumir el hook en cualquier componente o layout
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
