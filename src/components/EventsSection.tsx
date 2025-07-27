import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import event1 from '@/assets/event-1.jpg';
import event2 from '@/assets/event-2.jpg';
import event3 from '@/assets/event-3.jpg';

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const events = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      description: 'Join industry leaders as we explore the future of technology and innovation. Discover cutting-edge solutions and network with professionals.',
      date: 'March 15, 2024',
      location: 'Tech Hub, San Francisco',
      attendees: '500+',
      image: event1,
      category: 'Conference',
      featured: true,
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      description: 'Hands-on workshop covering modern web development practices, from React to Node.js and everything in between.',
      date: 'March 22, 2024',
      location: 'Innovation Center, NYC',
      attendees: '150+',
      image: event2,
      category: 'Workshop',
      featured: false,
    },
    {
      id: 3,
      title: 'AI & Machine Learning Seminar',
      description: 'Deep dive into artificial intelligence and machine learning applications in modern software development.',
      date: 'April 5, 2024',
      location: 'Virtual Event',
      attendees: '1000+',
      image: event3,
      category: 'Seminar',
      featured: false,
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
    <section id="events" className="py-20 bg-background" ref={ref}>
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
              Upcoming{' '}
              <span className="gradient-text">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join us for exciting events, workshops, and conferences that showcase 
              the latest in technology and innovation.
            </p>
          </motion.div>

          {/* Events grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="flip-card h-[400px] overflow-hidden border-0 bg-transparent">
                  <div className="flip-card-inner">
                    {/* Front of card */}
                    <div className="flip-card-front">
                      <div className="relative h-full w-full rounded-lg overflow-hidden bg-card shadow-lg">
                        {/* Event image */}
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                              {event.category}
                            </span>
                          </div>
                          {event.featured && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Event content */}
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {event.description}
                          </p>

                          {/* Event details */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-4 h-4 mr-2" />
                              {event.attendees} attendees
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="flip-card-back">
                      <div className="h-full w-full rounded-lg bg-gradient-primary p-6 flex flex-col justify-center items-center text-center text-primary-foreground">
                        <h3 className="font-bold text-xl mb-4">{event.title}</h3>
                        <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                          {event.description}
                        </p>
                        <Button
                          variant="secondary"
                          className="btn-glow group"
                        >
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View all events button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="btn-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6"
            >
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}