import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items - matching IEEE structure
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Event Schedule', href: '#event-schedule' },
    { name: 'Registration Details', href: '#registration-details' },
    // { name: 'Speakers', href: '#speakers' },
    // { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smooth scroll function
  // const scrollToSection = (href: string) => {
  //   const element = document.querySelector(href);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   // setIsMobileMenuOpen(false);
  //   setTimeout(() => {
  //       setIsMobileMenuOpen(false);
  //     }, 1000);
  // };

  // Smooth scroll function using IntersectionObserver for reliability
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return; // Exit if the element doesn't exist

    // 1. Start the smooth scroll
    element.scrollIntoView({ behavior: 'smooth' });

    // 2. Define what to do when the element is visible
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // As soon as the element is intersecting (visible on screen)
        if (entry.isIntersecting) {
          // 3. Close the menu
          setIsMobileMenuOpen(false);
          // 4. Stop observing to clean up
          observer.disconnect();
        }
      });
    };

    // 5. Create the observer with the callback
    const observer = new IntersectionObserver(onIntersection, {
      // The threshold determines how much of the element needs to be visible
      // before the callback is triggered. 0.1 means 10%.
      threshold: 0.1, 
    });

    // 6. Tell the observer to start watching the target element
    observer.observe(element);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ML</span>
            </div>
            <span className="font-bold text-xl neon-text">IEEE</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="nav-link text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background/90 backdrop-blur-lg"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors rounded-md"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}