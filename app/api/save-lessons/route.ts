import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "lessons.json");

// ✅ Validation helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidLesson(lesson: any): boolean {
  if (
    !lesson ||
    typeof lesson.english !== "string" ||
    typeof lesson.malayalam !== "string" ||
    typeof lesson.hindi !== "string" ||
    typeof lesson.category !== "string" ||
    typeof lesson.type !== "string" ||
    !lesson.pronunciation ||
    typeof lesson.pronunciation.malayalam !== "string" ||
    typeof lesson.pronunciation.hindi !== "string"
  ) {
    return false;
  }
  return true;
}

// ✅ Utility: detect duplicate by matching english text (case-insensitive)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDuplicate(existingData: any[], newLesson: any): boolean {
  return existingData.some(
    (item) =>
      item.english.trim().toLowerCase() ===
      newLesson.english.trim().toLowerCase()
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 🧩 Allow single lesson or array of lessons
    const newLessons = Array.isArray(body) ? body : [body];

    // ✅ Validate input
    const invalidLessons = newLessons.filter((item) => !isValidLesson(item));
    if (invalidLessons.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid lesson format",
          invalidItems: invalidLessons,
          expectedFormat:
            "{ english, malayalam, hindi, category, type, pronunciation: { malayalam, hindi } }",
        },
        { status: 400 }
      );
    }

    // ✅ Read existing data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let existingData: any[] = [];
    try {
      const file = await readFile(filePath, "utf8");
      existingData = JSON.parse(file || "[]");
      if (!Array.isArray(existingData)) existingData = [];
    } catch {
      existingData = [];
    }

    // ✅ Detect duplicates
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const duplicates: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniqueToAdd: any[] = [];

    for (const lesson of newLessons) {
      if (isDuplicate(existingData, lesson)) {
        duplicates.push(lesson);
      } else {
        uniqueToAdd.push(lesson);
      }
    }

    // 🛑 If duplicates found, skip writing
    if (duplicates.length > 0) {
      return NextResponse.json(
        {
          message: "Duplicate lessons found. No new lessons were added.",
          duplicates,
        },
        { status: 409 } // 409 Conflict
      );
    }

    // ✅ Add unique lessons
    existingData.push(...uniqueToAdd);

    // ✅ Write updated array back
    await writeFile(filePath, JSON.stringify(existingData, null, 2), "utf8");

    return NextResponse.json({
      message: "Lesson(s) added successfully!",
      addedCount: uniqueToAdd.length,
      data: uniqueToAdd,
    });
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json(
      { error: "Failed to write file", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-static';
export const revalidate = false;