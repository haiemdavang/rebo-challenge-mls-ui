export interface ScheduleDto {
    id: number;
    course_id: number;
    course_name: string;
    teacher_name: string;
    start_time: string;
    end_time: string;
    day_of_week: number; // 0-6 (Sunday-Saturday)
    location: string | null;
    type: 'lecture' | 'lab' | 'tutorial' | 'exam';
}

export interface ScheduleEventDto {
    id: number;
    title: string;
    start: Date;
    end: Date;
    course: {
        id: number;
        name: string;
    };
    teacher: string;
    location: string | null;
    type: 'lecture' | 'lab' | 'tutorial' | 'exam';
}
