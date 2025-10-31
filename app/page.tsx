'use client';

import { useState, useEffect } from 'react';
import LessonsList from '@/components/LessonsList';
import { BACKGROUNDS } from '@/constants';
import { motion } from 'framer-motion';
import FloatingGlassButton from '@/components/FloatingButton';
import AddLessonModal from '@/components/AddLessonModal';
import { getNextBackground } from './helpers';
import { Orbit } from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [bg, setBg] = useState(BACKGROUNDS[0]?.url || '#f8f9fa');
  const [refreshLessons, setRefreshLessons] = useState(false);

  // ✅ Load background from localStorage on mount
  useEffect(() => {
    const savedBg = localStorage.getItem('appBackground');
    if (savedBg) setBg(savedBg);
  }, []);

  // ✅ Save background to localStorage whenever it changes
  useEffect(() => {
    if (bg) localStorage.setItem('appBackground', bg);
  }, [bg]);

  const handleLessonAdded = () => setRefreshLessons((prev) => !prev);
  const handleShowForm = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  const handleChangeBg = () => setBg((prev) => getNextBackground(prev));

  return (
    <motion.div
      // 🔹 Page fade + slight upward motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative min-h-screen flex flex-col justify-center items-center transition-all duration-700"
    >
      {/* Title */}
      <motion.h2
        className="text-6xl font-extrabold glass-text"
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.8, 0.25, 1],
        }}
      >
        PolySwipe
      </motion.h2>

      {/* Change background button */}
      <button
        onClick={handleChangeBg}
        className="fixed top-3 sm:top-6 right-3 sm:right-6 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300 active:scale-95"
        aria-label="Change Background"
      >
        <Orbit className="text-white w-3 h-3 sm:w-5 sm:h-5" />
      </button>

      {/* Lessons list */}
      <div className="max-w-6xl mx-auto space-y-8 h-full">
        <LessonsList refresh={refreshLessons} />
      </div>

      {/* Modal */}
      <AddLessonModal
        open={showForm}
        onClose={handleClose}
        handleLessonAdded={handleLessonAdded}
      />

      {/* Floating Button */}
      <FloatingGlassButton onClick={handleShowForm} />

      {/* Credits */}
      <p className="text-white/60 mt-20 text-xs">
        Credits:{' '}
        <a rel="noreferrer" target="blank" href="https://suhailkk.web.app/">
          SKK
        </a>
      </p>
    </motion.div>
  );
}
