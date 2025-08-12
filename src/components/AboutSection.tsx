import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, Zap, Globe } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const topics = [
    {
      icon: Code,
      title: "IEEE SB DAIICT",
      subtitle: "Empowering Innovation",
      description: "The IEEE Student Branch at DAIICT aims to empower students, researchers, and tech enthusiasts by raising awareness about the limitless opportunities in AI-driven technologies while fostering an intellectually stimulating environment.",
    },
    {
      icon: Zap,
      title: "Expert-led Learning", 
      subtitle: "Hands-on Experience",
      description: "Through expert-led lectures, hands-on coding sessions, and real-world project challenges, participants will tackle AI applications across domains such as computer vision, natural language processing, and predictive analytics.",
    },
    {
      icon: Palette,
      title: "Comprehensive Program",
      subtitle: "Two-Week Journey",
      description: "Week 1 covers MATLAB basics, AI-ML fundamentals, and deep learning theory, while Week 2 focuses on hands-on projects applying these concepts. This program embodies the spirit of curiosity, problem-solving, and futuristic thinking.",
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
              <span className="neon-text">Summer School</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Machine Learning and Neural Networks - Explore the fundamentals and applications 
              of AI technologies that are shaping the future of technology.
            </p>
          </motion.div>

          {/* Topics grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="neon-card h-full">
                  <CardContent className="p-8 text-center">
                    <div className="p-4 rounded-full bg-secondary/10 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <topic.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-secondary font-medium text-sm mb-4">
                      {topic.subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Workshop highlights */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="neon-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">4</div>
                    <div className="text-sm text-muted-foreground">Days Workshop</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">ML/NN</div>
                    <div className="text-sm text-muted-foreground">Focus Areas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">Hands-on</div>
                    <div className="text-sm text-muted-foreground">Learning</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}