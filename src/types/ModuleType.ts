export type ModuleType = 'video' | 'document' | 'quiz' | 'assignment' | 'text' | 'resource';

export interface ModuleDto {
    id: number;
    type: ModuleType;
    title: string;
    content: string | null;
    file_url: string | null;
    section_order: number;
    due_date?: string | null;
}
