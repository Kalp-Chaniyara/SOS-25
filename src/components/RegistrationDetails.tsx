import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Users, ExternalLink } from 'lucide-react';

export default function RegistrationDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const registrationFeatures = [
    "4-day complete workshop",
    "All study materials",
    "Certificates",
    "Workshop kit",
    "Networking sessions",
    // "Accommodation support (for outside participants)"
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
    <section id="registration-details" className="py-20 bg-muted/30" ref={ref}>
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
              Registration{' '}
              <span className="neon-text">Details</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose your registration plan and secure your spot in this comprehensive 
              machine learning and neural networks workshop.
            </p>
          </motion.div>

          {/* Registration Card */}
          <div className="max-w-xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <Card className="neon-card h-full">                        
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      Workshop Registration
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Register for complete workshop access
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {registrationFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full btn-glow bg-secondary hover:bg-secondary-dark text-secondary-foreground"
                    onClick={() => window.open('https://forms.gle/XnrmUSqCE5MSo37B9', '_blank')}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Registration info */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="neon-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      What's Included?
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Complete 4-day workshop curriculum</li>
                      <li>• Hands-on coding sessions with industry experts</li>
                      <li>• Workshop materials and datasets</li>
                      <li>• Official completion certificate from MATLAB</li>
                      <li>• Networking opportunities with peers</li>
                      <li>• Post-workshop support and resources</li>
                      <li>• Doubt solving session</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <Users className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      Limited Seats Available
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {/* Only 50 participants will be selected for this intensive workshop. */}
                      Register now to secure your spot!
                    </p>
                    <Button 
                      variant="outline" 
                      className="neon-border"
                      onClick={() => window.open('https://forms.gle/XnrmUSqCE5MSo37B9', '_blank')}
                    >
                      Register Here
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
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