import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      description: 'ieee@dau.ac.in',
      // action: 'mailto:ieee@dau.ac.in',
    },
    {
      icon: Phone,
      title: 'Contact Persons',
      description: (
        <>
          Kalp: +91 90541 45155<br />
          Dhyey: +91 96871 72037
        </>
      ),
      // action: 'tel:+919687172037',
    },
    {
      icon: MapPin,
      title: 'Location',
      description: (
        <>
          DA-IICT, Near Indroda Circle,<br />
          Gandhinagar, Gujarat 382007<br />
          <a 
            href="https://maps.app.goo.gl/maeiM6vUVaKbGJBF9" 
            target="_blank" 
            className="text-secondary hover:text-secondary-light underline mt-2 inline-block transition-colors"
          >
            View on Google Maps →
          </a>
        </>
      ),
      action: 'https://goo.gl/maps/9Y5PHkm8gH2bD8r77',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

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
    <section id="contact" className="py-20 bg-background" ref={ref}>
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
              Contact{' '}
              <span className="neon-text">Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about the ML Bootcamp? Want to know more about registration? 
              Get in touch with us and we'll be happy to help!
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Contact info cards */}
            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="neon-card border-0 bg-card/50 backdrop-blur-sm hover:shadow-secondary/50 transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-secondary/10">
                          <info.icon className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary mb-2">
                            {info.title}
                          </h3>
                          <div className="text-muted-foreground text-sm hover:text-secondary transition-colors">
                            {info.description}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Additional info */}
              {/* <motion.div variants={itemVariants}>
                <Card className="bg-gradient-accent border-0 text-accent-foreground">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Quick Response</h3>
                    <p className="text-accent-foreground/90 text-sm">
                      We typically respond to all inquiries within 24 hours. 
                      For urgent matters, please call us directly.
                    </p>
                  </CardContent>
                </Card>
              </motion.div> */}
            </motion.div>

            {/* Contact form */}
            {/* <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          required
                          className="border-border bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                          className="border-border bg-background/50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project or inquiry..."
                        required
                        rows={5}
                        className="border-border bg-background/50 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="btn-glow bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-6 w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}