'use client';

import { Container, Section, Heading, Text, Badge } from '@/components/ui';
import { motion } from 'motion/react';

const experiences = [
  {
    role: 'Web Developer & System Integration (Intern)',
    company: 'PT Data Center Indonesia Sukses Makmur',
    period: 'Dec 2025 – May 2026',
    description: 'Developed and maintained data-driven applications using Python and Laravel. Supported system integration through RESTful APIs and developed responsive monitoring dashboards in an Agile environment.',
    skills: ['Python', 'Laravel', 'REST APIs', 'Docker', 'System Integration'],
  },
  {
    role: 'IT Infrastructure & Lecturer (Part-Time)',
    company: 'PKBM Bina Sejahtera',
    period: 'Apr 2023 – Nov 2025',
    description: 'Maintained computer and network infrastructure, diagnosed technical issues, and delivered technical instruction in Basic Computer operations, Programming, and Networking to 50+ students.',
    skills: ['Networking', 'Hardware Troubleshooting', 'Technical Mentoring', 'Infrastructure Maintenance'],
  },
];

export function Experience() {
  return (
    <Section id="experience" className="border-t border-border">
      <Container size="lg">
        <motion.div
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            03 — Experience
          </p>
          <Heading as="h2" size="h1">
            Work
            <br />
            <span className="text-muted-foreground">journey.</span>
          </Heading>
        </motion.div>

        <motion.div
          className="divide-y divide-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role + exp.company}
              className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="md:col-span-4 font-mono text-sm text-muted-foreground">
                {exp.period}
              </div>
              <div className="md:col-span-8 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {exp.company}
                  </p>
                </div>
                <Text size="base" variant="muted">
                  {exp.description}
                </Text>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Badge variant="muted">{s}</Badge>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}