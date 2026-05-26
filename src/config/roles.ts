import { LucideIcon } from 'lucide-react';
import { 
    LayoutDashboard, 
    User, 
    Users, 
    BookOpen, 
    ClipboardList, 
    Calendar 
} from 'lucide-react';

// 🔒 1. Diccionario de Roles actualizado según tu phpMyAdmin real (Inmutable con as const)
export const ROLES = {
    SUPERUSER: 1,
    ADMIN: 2,
    SECRETARY: 3,
    TEACHER: 4,
    STUDENT: 5
} as const;

// El tipo ahora infiere estrictamente: 1 | 2 | 3 | 4 | 5
export type RoleId = typeof ROLES[keyof typeof ROLES];

// 📦 2. Interfaz estricta para definir la estructura de cada enlace de navegación
export interface NavLink {
    path: string;
    label: string;
    icon: LucideIcon; 
    roles?: RoleId[]; // Permite usar el nuevo tipado numérico ampliado
}

// 🧭 3. Arreglo centralizado y validado con los nuevos accesos
export const ALL_NAV_LINKS: NavLink[] = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/perfil', label: 'Mi Perfil', icon: User },
    
    // Alumnos: Visible para Superuser, Admin, Secretaria y Profesores
    { 
        path: '/dashboard/alumnos', 
        label: 'Alumnos', 
        icon: Users, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER] 
    },
    
    { path: '/dashboard/cursos', label: 'Mis Cursos', icon: BookOpen },
    
    // Asistencia: Visible para gestión y docentes
    { 
        path: '/dashboard/asistencias', 
        label: 'Asistencia', 
        icon: ClipboardList, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER] 
    },
    
    { path: '/dashboard/horarios', label: 'Horarios', icon: Calendar },
    { path: '/dashboard/actividades', label: 'Actividades', icon: ClipboardList },
    
    // Cursos Asignados: Exclusivo de gestión superior y profesores
    { 
        path: '/dashboard/cursos-asignados', 
        label: 'Cursos Asignados', 
        icon: ClipboardList, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.TEACHER] 
    },
    
    // Detalles Alumnos: Información académica para personal administrativo y docente
    { 
        path: '/dashboard/detallealumnos', 
        label: 'Detalles Alumnos', 
        icon: Users, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER] 
    },
];