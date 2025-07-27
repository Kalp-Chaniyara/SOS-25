import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

export default function EventSchedule() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const schedule = [
    {
      day: "Day 1",
      date: "June 3, 2024",
      title: "Kickstart to Machine Learning",
      topics: [
        "Introduction to practical ML",
        "Basics of Python and its libraries (NumPy)",
        "Data Analysis",
        "Data Visualisation", 
        "Machine Learning Classification"
      ],
      time: "9:00 AM - 5:00 PM",
      venue: "Tech Hub Auditorium"
    },
    {
      day: "Day 2", 
      date: "June 4, 2024",
      title: "ML Models",
      topics: [
        "Linear Regression",
        "Gradient Descent Algorithm", 
        "Logistic Regression",
        "Clustering (K-nearest neighbours)",
        "Metrics and introduction to Sklearn libraries"
      ],
      time: "9:00 AM - 5:00 PM",
      venue: "Tech Hub Auditorium"
    },
    {
      day: "Day 3",
      date: "June 10, 2024", 
      title: "Neural Networks",
      topics: [
        "Introduction to Neural Networks",
        "Artificial Neural Networks",
        "Convolution Neural Networks",
        "Recurrent Neural Networks"
      ],
      time: "9:00 AM - 5:00 PM",
      venue: "Tech Hub Auditorium"
    },
    {
      day: "Day 4",
      date: "June 11, 2024",
      title: "Applications", 
      topics: [
        "Applications of Machine Learning",
        "Applications of Neural Networks",
        "Recommendation System"
      ],
      time: "9:00 AM - 5:00 PM",
      venue: "Tech Hub Auditorium"
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
    <section id="event-schedule" className="py-20 bg-background" ref={ref}>
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
              <span className="neon-text">Schedule</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive 4-day workshop covering machine learning fundamentals 
              to advanced neural network applications.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-8">
            {schedule.map((day, index) => (
              <motion.div
                key={day.day}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="timeline-item"
              >
                <Card className="neon-card">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Day and Date */}
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-sm font-bold px-3 py-1">
                          {day.day}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground">
                          {day.title}
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {day.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {day.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {day.venue}
                          </div>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-3 text-secondary">Topics Covered:</h4>
                        <ul className="space-y-2">
                          {day.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Event Info */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Card className="neon-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                  </div>
                  <div>
                    <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">32</div>
                    <div className="text-sm text-muted-foreground">Hours Content</div>
                  </div>
                  <div>
                    <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">4</div>
                    <div className="text-sm text-muted-foreground">Days Workshop</div>
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