import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CountdownTimer from '@/components/CountdownTimer';
import EventSchedule from '@/components/EventSchedule';
import RegistrationDetails from '@/components/RegistrationDetails';
import Speakers from '@/components/Speakers';
import Gallery from '@/components/Gallery';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  // Theme management
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Fixed header with navigation */}
      <Header toggleTheme={toggleTheme} isDark={isDark} />

      {/* Main content sections */}
      <main className="relative">
        {/* Hero section with Summer School theme */}
        <HeroSection />

        {/* About section - ML/Neural Networks topics */}
        <AboutSection />

        {/* Countdown timer */}
        <CountdownTimer />

        {/* Event schedule with day-wise breakdown */}
        <EventSchedule />

        {/* Registration details and pricing */}
        <RegistrationDetails />

        {/* Expert speakers */}
        <Speakers />

        {/* Photo gallery */}
        <Gallery />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Index;
