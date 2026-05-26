import { LucideIcon } from 'lucide-react';
import { 
    LayoutDashboard, 
    User, 
    Users, 
    BookOpen, 
    ClipboardList, 
    Calendar 
} from 'lucide-react';
export const ROLES = {
    SUPERUSER: 1,
    ADMIN: 2,
    SECRETARY: 3,
    TEACHER: 4,
    STUDENT: 5
} as const;
export type RoleId = typeof ROLES[keyof typeof ROLES];
export interface NavLink {
    path: string;
    label: string;
    icon: LucideIcon; 
    roles?: RoleId[]; 
}
export const ALL_NAV_LINKS: NavLink[] = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/perfil', label: 'Mi Perfil', icon: User },
    { 
        path: '/dashboard/alumnos', 
        label: 'Alumnos', 
        icon: Users, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER] 
    },
    { path: '/dashboard/cursos', label: 'Mis Cursos', icon: BookOpen },
    { 
        path: '/dashboard/Asistencias', 
        label: 'Asistencia', 
        icon: ClipboardList, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER] 
    },
    { path: '/dashboard/horarios', label: 'Horarios', icon: Calendar },
    { path: '/dashboard/actividades', label: 'Actividades', icon: ClipboardList },
    { 
        path: '/dashboard/CursosAsignados', 
        label: 'Cursos Asignados', 
        icon: ClipboardList, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.TEACHER] 
    },
    { 
        path: '/dashboard/detallealumnos', 
        label: 'Detalles Alumnos', 
        icon: Users, 
        roles: [ROLES.SUPERUSER, ROLES.ADMIN, ROLES.SECRETARY, ROLES.TEACHER] 
    },
];