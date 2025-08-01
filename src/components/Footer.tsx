import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@techsite.com', label: 'Email' },
  ];

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
    Services: [
      { name: 'Web Development', href: '#' },
      { name: '3D Experiences', href: '#' },
      { name: 'UI/UX Design', href: '#' },
      { name: 'Consulting', href: '#' },
    ],
    Resources: [
      { name: 'Blog', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
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
                    <span className="text-primary-foreground font-bold text-sm">3D</span>
                  </div>
                  <span className="font-bold text-xl gradient-text">TechSite</span>
                </div>

                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Crafting exceptional digital experiences with cutting-edge 3D graphics, 
                  smooth animations, and thoughtful design. Let's build the future together.
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
              © {currentYear} TechSite. Made with{' '}
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              using React, Three.js & Tailwind CSS
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 text-sm text-muted-foreground"
            >
              <button
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
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}