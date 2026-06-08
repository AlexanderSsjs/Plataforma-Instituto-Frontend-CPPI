import { LucideIcon } from 'lucide-react';
import {
    LayoutDashboard,
    User,
    Users,
    BookOpen,
    ClipboardList,
    Calendar,
    GraduationCap,
    UserCog,
    Award,
    Percent,
    MessageSquare,
} from 'lucide-react';
export const ROLES = {
    SUPERUSER: 1,
    ADMIN: 2,
    SECRETARY: 3,
    TEACHER: 4,
    STUDENT: 5,
} as const;

// El tipo ahora infiere estrictamente: 1 | 2 | 3 | 4 | 5
export type RoleId = (typeof ROLES)[keyof typeof ROLES];

// 📦 2. Interfaz estricta para definir la estructura de cada enlace de navegación
export interface NavLink {
    path: string;
    label: string;
    icon: LucideIcon;
    roles?: RoleId[]; // Permite usar el nuevo tipado numérico ampliado
}
export const ALL_NAV_LINKS: NavLink[] = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/perfil', label: 'Mi Perfil', icon: User },

    // Alumnos: Visible para Superuser, Admin, Secretaria y Profesores
    {
        path: '/dashboard/alumnos',
        label: 'Alumnos',
        icon: Users,
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER],
    },

    {
        path: '/dashboard/cursos',
        label: 'Mis Cursos',
        icon: BookOpen,
        roles: [ROLES.STUDENT],
    },

    // Asistencia: Visible para gestión y docentes
    {
        path: '/dashboard/asistencias',
        label: 'Asistencia',
        icon: ClipboardList,
        roles: [ROLES.TEACHER],
    },

    {
        path: '/dashboard/horarios',
        label: 'Horarios',
        icon: Calendar,
        roles: [ROLES.STUDENT],
    },
    { 
        path: '/dashboard/actividades',
        label: 'Actividades',
        icon: ClipboardList,
        roles: [ROLES.STUDENT],
    },

    // Cursos Asignados: Exclusivo de gestión superior y profesores
    {
        path: '/dashboard/cursos-asignados',
        label: 'Cursos Asignados',
        icon: ClipboardList,
        roles: [ ROLES.TEACHER],
    },

    // Detalles Alumnos: Información académica para personal administrativo y docente
    {
        path: '/dashboard/detallealumnos',
        label: 'Detalles Alumnos',
        icon: Users,
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER],
    },

    // Gestión de Estudiantes: Solo Superuser y Admin
    {
        path: '/dashboard/gestion-estudiantes',
        label: 'Gestión Estudiantes',
        icon: GraduationCap,
        roles: [ROLES.SUPERUSER, ROLES.ADMIN],
    },

    // Gestión de Profesores: Solo Superuser y Admin
    {
        path: '/dashboard/gestion-profesores',
        label: 'Gestión Profesores',
        icon: UserCog,
        roles: [ROLES.SUPERUSER, ROLES.ADMIN],
    },

    // Certificados Digitales: Solo Superuser y Admin
    {
        path: '/dashboard/certificados',
        label: 'Certificados',
        icon: Award,
        roles: [ROLES.SUPERUSER, ROLES.ADMIN],
    },

    // Promociones: Solo Superuser y Admin
    {
        path: '/dashboard/promociones',
        label: 'Promociones',
        icon: Percent,
        roles: [ROLES.SUPERUSER, ROLES.ADMIN],
    },

    // Soporte / Contacto Admin: Visible para todos
    {
        path: '/dashboard/soporte',
        label: 'Contacto Admin',
        icon: MessageSquare,
    },
];
