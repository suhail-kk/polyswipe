'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Lesson } from '@/services/lesson';

interface LessonCardProps {
    item: Lesson;
    onSwipe: (direction: 'left' | 'right') => void;
    isFront?: boolean;
}

export default function LessonCard({ item, onSwipe, isFront = false }: LessonCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 150], [-15, 15]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (_: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
            const direction = offset > 0 ? 'right' : 'left';
            onSwipe(direction);
        } else {
            x.set(0);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className={`w-[300px] h-[420px] text-white flex flex-col items-center justify-center 
        rounded-3xl p-6 text-center shadow-2xl border border-white/20 
        ${isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none opacity-70 scale-95'}
        bg-white/10 backdrop-blur-xl`}
            style={{ x, rotate }}
            drag={isFront ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <h2 className="text-2xl font-bold mb-4">{item.english}</h2>
            <div className="text-lg mb-2">
                <p>{item.malayalam}</p>
                <p className="text-base italic text-gray-300">({item.pronunciation.malayalam})</p>
            </div>
            <div className="text-lg mb-2">
                <p>{item.hindi}</p>
                <p className="text-base italic text-gray-300">({item.pronunciation.hindi})</p>
            </div>
            <div className="text-lg mb-2">
                <p>{item.kannada}</p>
                <p className="text-base italic text-gray-300">({item.pronunciation.kannada})</p>
            </div>
        </motion.div>
    );
}
