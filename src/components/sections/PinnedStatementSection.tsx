'use client';

import { Container, Heading, Text, Badge } from '@/components/ui';

const pinnedStatements = [
  {
    num: '01',
    tag: 'ARCHITECTURE',
    heading: 'ROBUST SYSTEM INTEGRATION.',
    body: 'Connecting disparate services, microservices, and databases through performant REST APIs, asynchronous workers, and resilient backend pipelines.',
  },
  {
    num: '02',
    tag: 'INFRASTRUCTURE',
    heading: 'REPRODUCIBLE & SECURE DEPLOYMENT.',
    body: 'Leveraging Docker containers, Linux server configurations, and structured diagnostics to guarantee identical execution across staging and production.',
  },
  {
    num: '03',
    tag: 'RELIABILITY',
    heading: 'DATA-DRIVEN DECISION MAKING.',
    body: 'From autonomous sensor tracking simulations in Python to live monitoring dashboards in Laravel, delivering dependable software grounded in analytical rigor.',
  },
];

export function PinnedStatementSection() {
  return (
    <section className="relative border-b border-border py-24">
      <Container size="lg">
        <div className="space-y-8">
          {pinnedStatements.map((item, index) => (
            <div
              key={item.num}
              className="sticky flex items-center bg-background border border-border rounded-2xl p-8 md:p-14 shadow-lg transition-all"
              style={{
                top: `${5 + index * 1.5}rem`,
                zIndex: index + 10,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
                <div className="md:col-span-3">
                  <span className="text-sm font-mono text-muted-foreground">{item.num}</span>
                  <div className="mt-2">
                    <Badge variant="outline">{item.tag}</Badge>
                  </div>
                </div>
                <div className="min-w-0 md:col-span-9 space-y-6">
                  <Heading as="h3" size="display" className="wrap-break-word text-3xl md:text-5xl lg:text-6xl">
                    {item.heading}
                  </Heading>
                  <Text size="lead" variant="muted" className="max-w-2xl">
                    {item.body}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}