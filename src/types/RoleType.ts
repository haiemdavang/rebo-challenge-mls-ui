export interface RoleDto {
    id: number;
    name: 'student' | 'teacher' | 'admin';
    shortname?: string;
}

export const UserRole = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];
