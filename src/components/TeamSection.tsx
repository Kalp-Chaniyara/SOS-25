import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture. Passionate about creating scalable solutions.',
      image: team1,
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'sarah@techsite.com',
      },
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Senior Frontend Engineer',
      bio: 'Specialist in modern frontend technologies and 3D web experiences. Loves pushing the boundaries of what\'s possible in the browser.',
      image: team2,
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'marcus@techsite.com',
      },
      skills: ['Three.js', 'React', 'WebGL', 'GSAP'],
    },
    {
      id: 3,
      name: 'Alex Rivera',
      role: 'UX/UI Designer',
      bio: 'Creative designer focused on user-centered design and accessibility. Brings ideas to life through thoughtful design and prototyping.',
      image: team3,
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'alex@techsite.com',
      },
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'Accessibility'],
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

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      case 'email':
        return Mail;
      default:
        return Github;
    }
  };

  return (
    <section id="team" className="py-20 bg-muted/30" ref={ref}>
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
              Meet Our{' '}
              <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Talented individuals passionate about creating exceptional digital experiences 
              and pushing the boundaries of modern web development.
            </p>
          </motion.div>

          {/* Team grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="card-hover overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {/* Profile image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Social links overlay */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        {Object.entries(member.social).map(([platform, url]) => {
                          const Icon = getSocialIcon(platform);
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

                    {/* Member info */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-1 text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {member.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Join team CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <Card className="bg-gradient-primary p-8 border-0 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion 
                for innovation and excellence. Let's build the future together.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="btn-glow"
              >
                View Open Positions
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}