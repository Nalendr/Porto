'use client';

import { Container, Section, Heading, Text, Badge } from '@/components/ui';
import { motion } from 'motion/react';

export function About() {
  return (
    <Section id="about">
      <Container size="lg">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              01 — About
            </p>
            <Heading as="h2" size="h1">
              About
              <br />
              <span className="text-muted-foreground">Me.</span>
            </Heading>
            <Text size="lg" variant="muted">
              I'm a final-year Information Techonology student at University Buana Perjuangan Karawang with a GPA of 3.74/4.00. I have hands-on experience in software development, backend systems, RESTful API integration, system integration, and data-driven applications. I'm experienced in developing and maintaining applications using Python and Laravel, building responsive monitoring dashboards, and troubleshooting application and deployment issues. My technical stack includes Go, PHP, JavaScript, TypeScript, Python, SQL, C++, Laravel, Express.js, Gin, Node.js, React, Next.js, Vue.js, MySQL, REST APIs, Docker, Git, and Linux.
            </Text>
            <Text size="lg" variant="muted">
              I've interned at PT Data Center Indonesia Sukses Makmur as a Web Developer & System Integration intern, where I developed data-driven applications using Python and Laravel while supporting system integration through RESTful APIs. I also developed responsive monitoring dashboards and automated data-processing scripts to improve application stability. Additionally, I worked as an IT Infrastructure & Part-Time Lecturer at PKBM Bina Sejahtera, maintaining computer and network infrastructure and delivering technical instruction to 50+ students.
            </Text>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Stack & Tools</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Go', 'PHP', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'C++',
                  'Laravel', 'Express.js', 'Gin', 'Node.js', 'React', 'Next.js',
                  'Vue.js', 'MySQL', 'REST APIs', 'Docker', 'Git', 'Linux',
                  'Agile Software Development', 'SDLC', 'System Integration',
                  'Requirements Analysis', 'Troubleshooting', 'Functional Testing'
                ].map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                  >
                    <Badge variant="muted">{skill}</Badge>
                  </motion.span>
                ))}
              </div>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-6 border-t border-border pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <p className="text-4xl font-extrabold tracking-tighter">1+</p>
                <p className="text-sm text-muted-foreground mt-1">Years of experience</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}