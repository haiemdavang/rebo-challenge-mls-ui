import type { CategoryDto } from "./CategoryType";
import type { ModuleDto } from "./ModuleType";
import type { BaseUserDto } from "./UserType";

export interface CourseDto {
    id: number;
    fullname: string;
    shortname: string;
    summary: string | null;
    image_url: string | null;
    start_date: string | null;
    end_date: string | null;
    format: string;
    category?: CategoryDto;
    teachers?: BaseUserDto[];
}

export interface CourseDetailDto extends CourseDto {
    modules?: ModuleDto[];
    enrolled_students_count?: number;
    progress?: number;
    is_enrolled?: boolean;
}

export interface CreateCourseRequest {
    fullname: string;
    shortname: string;
    category_id: number;
    start_date?: string | null;
    end_date?: string | null;
    summary?: string | null;
    format: "online" | "offline" | "hybrid";
    image_url?: string | null;
}

export interface UpdateCourseRequest {
    fullname?: string;
    shortname?: string;
    category_id?: number;
    start_date?: string | null;
    end_date?: string | null;
    summary?: string | null;
    is_visible?: boolean;
    format?: "online" | "offline" | "hybrid";
    image_url?: string | null;
}

export interface CourseFilterParams {
    search?: string;
    category_id?: number;
    teacher_id?: number;
    format?: string;
    page?: number;
    per_page?: number;
}
