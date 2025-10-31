import axios from 'axios';

export interface Lesson {
    english: string;
    malayalam: string;
    hindi: string;
    category: string;
    type: string;
    pronunciation: {
        malayalam: string;
        hindi: string;
    };
}

export interface LessonsResponse {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    lessons: Lesson[];
}

export interface LessonsQuery {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
}

const api = axios.create({
    baseURL: '/api',
});

export const lessonService = {
    // Get lessons with pagination and filters
    getLessons: async (params?: LessonsQuery): Promise<LessonsResponse> => {
        const { data } = await api.get('/get-lessons', { params });
        return data;
    },

    // Save single lesson or multiple lessons
    saveLessons: async (lessons: Lesson | Lesson[]) => {
        const { data } = await api.post('/save-lessons', lessons);
        return data;
    },
};