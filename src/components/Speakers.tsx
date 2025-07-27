import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Github, Mail, MapPin, Building } from 'lucide-react';
import speaker1 from '@/assets/speaker-1.jpg';
import speaker2 from '@/assets/speaker-2.jpg';
import speaker3 from '@/assets/speaker-3.jpg';

export default function Speakers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const speakers = [
    {
      id: 1,
      name: "Kadam Parikh",
      title: "Senior Software Engineer",
      company: "Simform Solutions",
      image: speaker1,
      bio: "I am an inquisitive person with a strong sense of intuition. I have built several ML/DL systems from scratch, involving custom model architectures and have worked with a variety of data such as digital, textual, timeseries, statistical and others. My major tech stack includes libraries and frameworks revolving around Python.",
      occupation: [
        "Senior Software Engineer at Simform Solutions LLP",
        "Founding Team Member at Wall", 
        "Freelancer & Mentor"
      ],
      expertise: ["Python", "Machine Learning", "Deep Learning", "Data Science"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "kadam@example.com"
      }
    },
    {
      id: 2,
      name: "Harsh Wani", 
      title: "Machine Learning Engineer",
      company: "F(x) Data Labs",
      image: speaker2,
      bio: "Working as a machine learning engineer right now, I've worked on many projects including diverse kinds of data and difficulties. Currently working on a project to create a smart attorney for court hearings. Having an experience on working on cloud systems as well. The majority of the work is focused on the Python language's libraries and accompanying frameworks.",
      expertise: ["Machine Learning", "Cloud Computing", "Python", "Legal Tech"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com", 
        email: "harsh@example.com"
      }
    },
    {
      id: 3,
      name: "Ali Asgar Zakir",
      title: "Machine Learning Engineer", 
      company: "F(x) Data Labs",
      image: speaker3,
      bio: "An experienced Machine Learning Engineer with a strong background in Python, AWS, and machine learning. I have a passion for leveraging data to build intelligent solutions and have successfully developed and deployed ML models in various applications. Additionally, I have an advantage of healthcare domain knowledge with prior experience in Healthcare industry as well.",
      expertise: ["Python", "AWS", "Healthcare ML", "Model Deployment"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "ali@example.com"
      }
    }
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
    <section id="speakers" className="py-20 bg-background" ref={ref}>
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
              Event{' '}
              <span className="neon-text">Speakers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn from industry experts who have extensive experience in machine learning, 
              neural networks, and real-world AI applications.
            </p>
          </motion.div>

          {/* Speakers grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Card className="speaker-card h-full">
                  <CardContent className="p-0">
                    {/* Speaker image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Social links overlay */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        {Object.entries(speaker.social).map(([platform, url]) => {
                          const Icon = platform === 'linkedin' ? Linkedin : platform === 'github' ? Github : Mail;
                          return (
                            <Button
                              key={platform}
                              variant="secondary"
                              size="icon"
                              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                              onClick={() => window.open(url, '_blank')}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Speaker info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-xl text-foreground mb-1">
                          {speaker.name}
                        </h3>
                        <div className="flex items-center text-secondary font-medium text-sm mb-2">
                          <Building className="w-4 h-4 mr-1" />
                          {speaker.title}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {speaker.company}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                        {speaker.bio}
                      </p>

                      {/* Expertise tags */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-foreground">Expertise:</h4>
                        <div className="flex flex-wrap gap-2">
                          {speaker.expertise.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs bg-secondary/10 text-secondary border-secondary/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Occupation if available */}
                      {speaker.occupation && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground">Current Roles:</h4>
                          <ul className="space-y-1">
                            {speaker.occupation.map((role, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-start">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Speaker CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="neon-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Learn from the <span className="neon-text">Best</span>
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our speakers bring years of industry experience and practical insights 
                  from working with machine learning and neural networks in production environments.
                </p>
                <Button 
                  size="lg"
                  className="btn-glow bg-secondary hover:bg-secondary-dark text-secondary-foreground"
                >
                  Register to Attend
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}