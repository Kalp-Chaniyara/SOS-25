import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, Zap, Globe } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Code,
      title: 'Modern Development',
      description: 'Built with React, TypeScript, and the latest web technologies for optimal performance.',
    },
    {
      icon: Palette,
      title: 'Design Excellence',
      description: 'Beautiful, accessible interfaces crafted with attention to every detail and user experience.',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed with efficient rendering, lazy loading, and modern build tools.',
    },
    {
      icon: Globe,
      title: 'Global Ready',
      description: 'Responsive, accessible, and ready for users worldwide with internationalization support.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About{' '}
              <span className="gradient-text">Our Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're pushing the boundaries of web development by combining cutting-edge 3D graphics, 
              smooth animations, and thoughtful design to create unforgettable digital experiences.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Crafting Digital Experiences
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our approach combines technical excellence with creative vision. We believe that 
                great web experiences should be both beautiful and functional, accessible and engaging.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From interactive 3D elements to smooth micro-animations, every detail is carefully 
                crafted to create a seamless user journey that delights and inspires.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3D</div>
                  <div className="text-sm text-muted-foreground">Interactive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">100%</div>
                  <div className="text-sm text-muted-foreground">Responsive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">A11Y</div>
                  <div className="text-sm text-muted-foreground">Accessible</div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Feature cards */}
            <motion.div variants={itemVariants} className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card-hover border-0 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}