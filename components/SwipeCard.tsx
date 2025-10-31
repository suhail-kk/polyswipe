"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

interface SwipeableCardProps {
    children: React.ReactNode;
    onSwipe?: (direction: "left" | "right") => void;
}

export default function SwipeableCard({ children, onSwipe }: SwipeableCardProps) {
    const [exitX, setExitX] = useState<number | null>(null);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

    return (
        <motion.div
            className="glass-card w-[300px] h-[400px] rounded-2xl shadow-2xl flex items-center justify-center text-white select-none cursor-grab"
            style={{
                x,
                rotate,
                opacity,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
                const velocity = info.velocity.x;
                if (info.offset.x > 150 || velocity > 500) {
                    setExitX(400);
                    onSwipe?.("right");
                } else if (info.offset.x < -150 || velocity < -500) {
                    setExitX(-400);
                    onSwipe?.("left");
                } else {
                    setExitX(0);
                }
            }}
            animate={{ x: exitX ?? 0, opacity: exitX ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {children}
        </motion.div>
    );
}
