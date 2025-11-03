import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { Lesson } from "@/services/lesson";

const filePath = path.join(process.cwd(), "data", "lessons.json");

/**
 * GET /api/lessons
 * Optional query params:
 * - search (filters by english field)
 * - category (filters by category)
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search")?.toLowerCase() || "";
        const category = searchParams.get("category")?.toLowerCase() || "";

        // 🔹 Load lessons
        const file = await readFile(filePath, "utf8");
        const data = JSON.parse(file || '{"lessons": []}');
        const lessons = Array.isArray(data) ? data : data.lessons || [];

        if (!Array.isArray(lessons)) {
            return NextResponse.json(
                { error: "Invalid lessons data format" },
                { status: 500 }
            );
        }

        // 🔹 Apply filters (if any)
        const filtered = lessons.filter((lesson: Lesson) => {
            const matchesSearch = search
                ? lesson.english?.toLowerCase().includes(search)
                : true;
            const matchesCategory = category
                ? lesson.category?.toLowerCase() === category
                : true;
            return matchesSearch && matchesCategory;
        });

        // ✅ Return all filtered lessons
        return NextResponse.json({
            totalItems: filtered.length,
            lessons: filtered,
        });
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch lessons",
                details: (error as Error).message,
            },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-static';
export const revalidate = false;