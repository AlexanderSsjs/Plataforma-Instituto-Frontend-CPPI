import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/Auth/authService'; // <--- CORREGIDO CON EL NOMBRE EXACTO DEL ARCHIVO

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const savedUser = localStorage.getItem('auth_user');

                if (token && savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Sesión inválida o expirada:', error);
                logoutAction(); // Limpiamos todo si el token falló
            } finally {
                setLoading(false); // Apagamos la pantalla de carga del LMS
            }
        };

        checkSession();
    }, []);

    const loginAction = async (credentials) => {
        const data = await authService.login(credentials);
        setUser(data.user || data);
        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }
        localStorage.setItem('auth_user', JSON.stringify(data.user || data));
        return data.user || data;
    };

    const logoutAction = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Error al notificar cierre de sesión al servidor:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login: loginAction, logout: logoutAction }}>
            {/* Mientras verifica si el alumno está logueado, muestra un spinner/pantalla de carga limpia */}
            {!loading ? (
                children
            ) : (
                <div className="flex h-screen w-screen items-center justify-center bg-[#0f172a] text-white">
                    <div className="text-center">
                        <p className="text-xl font-semibold animate-pulse tracking-wide">
                            Cargando plataforma...
                        </p>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
}

// Hook personalizado para inyectar la sesión en cualquier vista de forma directa
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
