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
      title: "Machine Learning",
      subtitle: "AI & Computer Science",
      description: "Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.",
    },
    {
      icon: Zap,
      title: "Neural Networks", 
      subtitle: "Brain-inspired Computing",
      description: "Artificial neural networks (ANN) model the neurons in a human brain through multiple layers of connected units or nodes to determine any kinds of relationship exhibited in a provided data set. It is a booming field of technology and the basics of the same would be covered during this workshop.",
    },
    {
      icon: Palette,
      title: "About Summer School",
      subtitle: "Learning Platform",
      description: "Summer School Student Branch aims to provide an interactive and informative platform for students to develop professional and technical abilities. Summer School is organised every year bringing in an opportunity for students to explore various domains and evolve their technical skills to turn their summer fruitful.",
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