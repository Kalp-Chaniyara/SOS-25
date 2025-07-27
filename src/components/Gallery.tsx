import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Expand, X } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: gallery1,
      title: "Tech Workshop Session",
      description: "Students engaged in hands-on machine learning workshop"
    },
    {
      id: 2, 
      src: gallery2,
      title: "Programming Workshop",
      description: "Hands-on coding session with instructor guidance"
    },
    {
      id: 3,
      src: gallery3,
      title: "Workshop Participants",
      description: "Group photo of successful workshop completion"
    },
    {
      id: 4,
      src: gallery4,
      title: "Neural Networks Presentation", 
      description: "Speaker explaining neural networks to engaged audience"
    },
    {
      id: 5,
      src: gallery1,
      title: "Interactive Learning",
      description: "Students collaborating on machine learning projects"
    },
    {
      id: 6,
      src: gallery2,
      title: "Practical Sessions",
      description: "Real-world implementation of ML algorithms"
    },
    {
      id: 7,
      src: gallery3,
      title: "Achievement Celebration",
      description: "Celebrating successful completion of the workshop"
    },
    {
      id: 8,
      src: gallery4,
      title: "Expert Presentations",
      description: "Industry experts sharing knowledge and insights"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="gallery" className="py-20 bg-muted/30" ref={ref}>
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
              <span className="neon-text">Gallery</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take a look at previous workshops and see the engaging learning environment 
              we create for our participants.
            </p>
          </motion.div>

          {/* Gallery grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="gallery-item group cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <Card className="neon-card overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <Expand className="w-8 h-8 mx-auto mb-2" />
                        <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                        <p className="text-xs text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Gallery stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="neon-card">
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">200+</div>
                    <div className="text-sm text-muted-foreground">Photos Captured</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Happy Participants</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">4</div>
                    <div className="text-sm text-muted-foreground">Days of Learning</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Expert Speakers</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* View more CTA */}
          {/* <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="neon-border"
            >
              View More Photos
            </Button>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Image modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Gallery image"
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}