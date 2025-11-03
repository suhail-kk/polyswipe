import allLessonsData from '../data/lessons.json';

export interface Lesson {
    english: string;
    malayalam: string;
    hindi: string;
    kannada: string;
    category: string;
    type: string;
    pronunciation: {
        malayalam: string;
        hindi: string;
        kannada: string;
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

const allLessons: Lesson[] = allLessonsData as Lesson[];

export const lessonService = {
    // Get lessons with pagination and filters
    getLessons: async (params?: LessonsQuery): Promise<LessonsResponse> => {
        const page = params?.page || 1;
        const limit = params?.limit || 5000;
        const search = params?.search?.toLowerCase();
        const category = params?.category?.toLowerCase();

        let filteredLessons = allLessons;

        if (search) {
            filteredLessons = filteredLessons.filter(
                (lesson) =>
                    lesson.english.toLowerCase().includes(search) ||
                    lesson.malayalam.toLowerCase().includes(search) ||
                    lesson.hindi.toLowerCase().includes(search)
            );
        }

        if (category) {
            filteredLessons = filteredLessons.filter(
                (lesson) => lesson.category.toLowerCase() === category
            );
        }

        const totalItems = filteredLessons.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const lessons = filteredLessons.slice(startIndex, endIndex);

        return {
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            lessons,
        };
    },

    // Save single lesson or multiple lessons
    saveLessons: async (lessons: Lesson | Lesson[]) => {
        // This function would typically save to a database or file.
        // For this task, we'll just log it.
        console.log('Saving lessons:', lessons);
        return lessons;
    },
};
