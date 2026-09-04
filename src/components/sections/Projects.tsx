'use client';

import { Container, Section, Heading, Text, Badge, Button } from '@/components/ui';
import { ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  {
    title: 'Akfaza – Holiday Ticket Booking Website',
    category: 'Fullstack Developer',
    year: '2024',
    description: 'Developed a PHP-based ticket booking web application with PHP, HTML, CSS, and JavaScript. Implemented booking workflows and user interactions for the application\'s core functionality.',
    tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/Nalendr/Akfaza',
    github: 'https://github.com/Nalendr/Akfaza',
  },
  {
    title: 'AdaKami – Cooperative Management System',
    category: 'Database Developer',
    year: '2024',
    description: 'Developed a web and mobile cooperative management application using Laravel and Ionic. Designed and managed database functionality to support consistent data handling across application components.',
    tags: ['Laravel', 'Ionic', 'Database', 'System Integration'],
    link: 'https://github.com/Kalvseveryone/Koperasi_19',
    github: 'https://github.com/Kalvseveryone/Koperasi_19',
  },
  {
    title: 'Autonomous Gas Plume Tracking System',
    category: 'Lead Developer and Robotics Engineer',
    year: '2024',
    description: 'Developed and simulated an autonomous navigation system using Python and real-time sensor data. Built data-processing logic to analyze sensor inputs and support autonomous system decision-making.',
    tags: ['Python', 'Robotics', 'Sensor Data', 'Simulation'],
    link: '#',
    github: '#',
  },
];

export function Projects() {
  return (
    <Section id="projects" className="border-t border-border">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4 mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              02 — Selected Works
            </p>
            <Heading as="h2" size="h1">
              Featured
              <br />
              <span className="text-muted-foreground">projects.</span>
            </Heading>
          </div>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="group border-b border-border pb-16 last:border-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <div className="lg:col-span-2 font-mono text-sm text-muted-foreground">
                (0{idx + 1})
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <p className="text-xs font-mono text-muted-foreground uppercase">{project.category}</p>
                  <span className="text-xs text-muted-foreground">/</span>
                  <p className="text-xs font-mono text-muted-foreground">{project.year}</p>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
                <Text size="base" variant="muted">
                  {project.description}
                </Text>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    >
                      <Badge variant="muted">{tag}</Badge>
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3 pt-4 lg:pt-0">
                {project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Code2 className="h-4 w-4" />
                      Code
                    </Button>
                  </a>
                )}
                {project.link !== '#' && (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    <Button size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}