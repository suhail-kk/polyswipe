'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { lessonService, Lesson } from '@/services/lesson';
import LessonCard from './Card';

interface LessonsListProps {
  refresh: boolean;
}

export default function LessonsList({ refresh }: LessonsListProps) {
  // ✅ Initialize state directly from localStorage (avoids effect warning)
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lessonPage');
      return saved ? parseInt(saved, 10) : 2;
    }
    return 2;
  });

  // ✅ Save index to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lessonPage', activeIndex.toString());
    }
  }, [activeIndex]);

  // ✅ React Query for fetching & caching lessons
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const data = await lessonService.getLessons();
      return data.lessons || [];
    },
  });

  // ✅ Re-fetch manually when `refresh` changes
  useEffect(() => {
    if (refresh) refetch();
  }, [refresh, refetch]);

  const lessons = data || [];
  const totalPages = lessons.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeIndex < totalPages - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (direction === 'right' && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  if (isLoading) return <div className="p-6 text-white">Loading lessons...</div>;
  if (isError) return <div className="p-6 text-red-400">Failed to load lessons.</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden py-8">
      <div className="relative w-full flex justify-center items-center">
        <div className="relative w-[100vw] md:w-[800px] h-[500px] flex justify-center items-center">
          {lessons.map((lesson: Lesson, i: number) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;
            const translateX = offset * 250;
            const scale = isActive ? 1 : 0.85;
            const zIndex = 30 - Math.abs(offset);
            const opacity = Math.abs(offset) > 2 ? 0 : 1;
            const translateY = isActive ? 0 : 20;

            return (
              <div
                key={lesson.english + i}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                <LessonCard item={lesson} onSwipe={handleSwipe} isFront={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Page Indicator */}
      <div className="text-white/60 text-2xl mt-6">
        {activeIndex + 1} / {totalPages}
      </div>
    </div>
  );
}
