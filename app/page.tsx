'use client';

import { useState, useEffect } from 'react';
import LessonsList from '@/components/LessonsList';
import { BACKGROUNDS } from '@/constants';
import { motion } from 'framer-motion';
import FloatingGlassButton from '@/components/FloatingButton';
import AddLessonModal from '@/components/AddLessonModal';
import AuthModal from '@/components/AuthModal'; // Import AuthModal
import { getNextBackground } from './helpers';
import { Orbit } from 'lucide-react';
import { toast } from 'sonner'; // Import toast

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // State for AuthModal
  const [bg, setBg] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appBackground') || BACKGROUNDS[0]?.url || '#f8f9fa';
    }
    return BACKGROUNDS[0]?.url || '#f8f9fa';
  });
  const [refreshLessons, setRefreshLessons] = useState(false);


  // ✅ Save background to localStorage whenever it changes
  useEffect(() => {
    if (bg) localStorage.setItem('appBackground', bg);
  }, [bg]);

  const handleLessonAdded = () => setRefreshLessons((prev) => !prev);
  const handleShowForm = () => setShowForm(true);
  const handleClose = () => setShowForm(false);
  const handleChangeBg = () => setBg((prev) => getNextBackground(prev));

  const handleAuth = (password: string) => {
    // Placeholder for authentication logic
    if (password === '2452') { // Replace with actual authentication
      toast.success('Authentication successful!');
      setShowAuthModal(false);
      handleShowForm(); // Open AddLessonModal after successful auth
    } else {
      toast.error('Incorrect password.');
    }
  };

  const handleOpenAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);

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

      {/* Lessons list */}
      <div className="max-w-6xl mx-auto space-y-8 h-full">
        <LessonsList refresh={refreshLessons} />
      </div>

      {/* Add Lesson Modal */}
      <AddLessonModal
        open={showForm}
        onClose={handleClose}
        handleLessonAdded={handleLessonAdded}
      />

      {/* Authentication Modal */}
      <AuthModal
        open={showAuthModal}
        onClose={handleCloseAuthModal}
        onAuthenticate={handleAuth}
      />

      {/* Floating Button - now opens AuthModal */}
      <FloatingGlassButton onClick={handleOpenAuthModal} />

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
