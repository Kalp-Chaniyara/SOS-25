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

  const pricingPlans = [
    {
      category: "DA-IICT Students",
      plans: [
        {
          type: "IEEE Members", 
          price: "₹400",
          features: [
            "4-day complete workshop",
            "All study materials",
            "Certificates",
            "Workshop kit",
            "Networking sessions"
          ],
          popular: false
        },
        {
          type: "Non-IEEE Members",
          price: "₹500", 
          features: [
            "4-day complete workshop",
            "All study materials", 
            "Certificates",
            "Workshop kit",
            "Networking sessions"
          ],
          popular: true
        }
      ]
    },
    {
      category: "Outside DA-IICT",
      plans: [
        {
          type: "IEEE Members",
          price: "₹600",
          features: [
            "4-day complete workshop",
            "All study materials",
            "Certificates", 
            "Workshop kit",
            "Networking sessions",
            "Accommodation support"
          ],
          popular: false
        },
        {
          type: "Non-IEEE Members", 
          price: "₹700",
          features: [
            "4-day complete workshop",
            "All study materials",
            "Certificates",
            "Workshop kit", 
            "Networking sessions",
            "Accommodation support"
          ],
          popular: false
        }
      ]
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

          {/* Pricing grid */}
          <div className="space-y-12">
            {pricingPlans.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                transition={{ delay: categoryIndex * 0.2 }}
              >
                <h3 className="text-2xl font-bold text-center mb-8 text-secondary">
                  {category.category}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {category.plans.map((plan, planIndex) => (
                    <motion.div
                      key={plan.type}
                      variants={itemVariants}
                      transition={{ delay: (categoryIndex * 2 + planIndex) * 0.1 }}
                      className="relative"
                    >
                      <Card className={`neon-card h-full ${plan.popular ? 'border-accent' : ''}`}>
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-accent text-accent-foreground font-bold px-4 py-1">
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        
                        <CardContent className="p-6">
                          <div className="text-center mb-6">
                            <h4 className="text-xl font-bold text-foreground mb-2">
                              {plan.type}
                            </h4>
                            <div className="text-3xl font-bold text-secondary mb-1">
                              {plan.price}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Complete workshop access
                            </p>
                          </div>

                          <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="w-5 h-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button 
                            className={`w-full btn-glow ${
                              plan.popular 
                                ? 'bg-accent hover:bg-accent-dark text-accent-foreground' 
                                : 'bg-secondary hover:bg-secondary-dark text-secondary-foreground'
                            }`}
                            onClick={() => window.open('https://forms.gle/FwJ4aGyXRofPLTeS9', '_blank')}
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Register Now
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
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
                      <li>• Official completion certificate</li>
                      <li>• Networking opportunities with peers</li>
                      <li>• Post-workshop support and resources</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <Users className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      Limited Seats Available
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Only 50 participants will be selected for this intensive workshop.
                      Register early to secure your spot!
                    </p>
                    <Button 
                      variant="outline" 
                      className="neon-border"
                      onClick={() => window.open('https://forms.gle/FwJ4aGyXRofPLTeS9', '_blank')}
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