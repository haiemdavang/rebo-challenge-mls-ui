import type { RoleDto } from "./RoleType";

export interface UserDto {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    fullname: string;
    phone: string | null;
    address: string | null;
    birthday: string | null;
    gender: string | null;
    id_number: string | null;
    department: string | null;
    is_active: boolean;
    created_at: string;
    role: RoleDto;
}

export interface BaseUserDto {
    id: number;
    username: string;
    fullName: string;
    email: string;
    department: string | null;
    role: string | null;
}