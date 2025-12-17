export interface CategoryDto {
    id: number;
    name: string;
    parent_id: number | null;
    description: string | null;
    children?: CategoryDto[];
}
