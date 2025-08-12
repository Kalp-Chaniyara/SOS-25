import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    // { icon: Github, href: 'https://github.com/ieeesb-daiict', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/ieee-daiict/', label: 'LinkedIn' },
    // { icon: Twitter, href: 'https://twitter.com/ieeesb_daiict', label: 'Twitter' },
    { icon: Mail, href: 'mailto:ieee@dau.ac.in', label: 'Email' },
  ];

  const footerLinks = {
    'Quick Links': [
      { name: 'About', href: '#about' },
      { name: 'Schedule', href: '#event-schedule' },
      { name: 'Register', href: '#registration-details' },
      { name: 'Contact', href: '#contact' },
    ],
    'Event Info': [
      // { name: 'Speakers', href: '#speakers' },
      { name: 'Schedule', href: '#event-schedule' },
      // { name: 'Gallery', href: '#gallery' },
      { name: 'Location', href: '#contact' },
    ],
    // 'Connect': [
    //   { name: 'IEEE DAIICT', href: 'https://ieee.daiict.ac.in' },
    //   { name: 'IEEE Region 10', href: 'https://ieeer10.org' },
    //   { name: 'IEEE', href: 'https://www.ieee.org' },
    //   { name: 'Contact Us', href: '#contact' },
    // ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">ML</span>
                  </div>
                  <span className="font-bold text-xl gradient-text">IEEE DAIICT</span>
                </div>

                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Join us for an immersive journey into AI, ML, and Deep Learning. 
                  IEEE Student Branch at DAIICT brings you the ultimate learning experience 
                  through our Bootcamps Machine Learning Edition.
                </p>

                {/* Social links */}
                <div className="flex space-x-2">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10 hover:text-primary"
                      onClick={() => window.open(link.href, '_blank')}
                      aria-label={link.label}
                    >
                      <link.icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer links */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-foreground">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-sm flex items-center"
            >
              © {currentYear} IEEE Student Branch DAIICT. Made with{' '}
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              by IEEE Web Team
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 text-sm text-muted-foreground"
            >
              {/* <button
                onClick={() => scrollToSection('#')}
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                onClick={() => scrollToSection('#')}
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => scrollToSection('#')}
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </button> */}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}