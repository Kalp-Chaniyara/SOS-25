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
import LiquidBlobInteractive from '@/components/LiquidBlobInteractive';
import StarfieldBackground from '../components/StarfieldBackground';

const Index = () => {
  // Force dark theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Fixed header with navigation */}
      <Header />

      {/* Liquid blob interactive background */}
      <StarfieldBackground />

      {/* Main content sections */}
      <main className="relative">
        {/* Hero section with Bootcamps theme */}
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
        {/* <Speakers /> */}

        {/* Photo gallery */}
        {/* <Gallery /> */}

        {/* Contact section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Index;
