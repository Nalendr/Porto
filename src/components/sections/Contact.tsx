'use client';

import { Container, Section, Heading, Text } from '@/components/ui';
import { Mail, Code2, Share2, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <Section id="contact" className="border-t border-border">
      <Container size="lg">
        <motion.div
          className="max-w-xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Banner - muri.mp4 */}
          <div className="h-32 relative overflow-hidden">
            <video
              src="/Porto/video/muri.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-zinc-950/60" />
          </div>
          
          <div className="px-8 pb-8 relative">
            {/* Avatar Image */}
            <div className="w-20 h-20 bg-zinc-900 border-4 border-zinc-950 rounded-full -mt-10 overflow-hidden relative shadow-lg">
              <img
                src="/Porto/images/profile.png"
                alt="Fauzya Shubhi Nalendrasidi"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            
            <div className="mt-4 space-y-1">
              <Heading as="h3" size="h2" className="text-white">Fauzya Shubhi Nalendrasidi</Heading>
              <Text className="text-zinc-400 font-mono text-xs uppercase tracking-wider">Information Techonology Student · Karawang, Indonesia</Text>
            </div>

            <Text className="text-zinc-300 mt-4 mb-8 leading-relaxed">
              Final-year Information Techonology with hands-on experience in software development, backend systems, RESTful API integration, and data-driven applications. Building reliable and maintainable software solutions.
            </Text>

            {/* Contact Grid */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[
                { label: 'Email', icon: Mail, value: 'fauzyasn@gmail.com', href: 'mailto:fauzyasn@gmail.com' },
                { label: 'GitHub', icon: Code2, value: 'github.com/Nalendr', href: 'https://github.com/Nalendr' },
                { label: 'LinkedIn', icon: Share2, value: 'linkedin.com/in/nalendrs', href: 'https://linkedin.com/in/nalendrs' },
              ].map((stat) => (
                <a
                  key={stat.label}
                  href={stat.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-900 hover:bg-zinc-800 transition-colors rounded-xl p-4 flex flex-col items-center justify-center gap-2 group cursor-pointer"
                >
                  <stat.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-300 uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Additional Contact Info */}
            <div className="space-y-3 mb-8 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3 text-zinc-300 text-sm">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span className="font-mono">+62 896-0455-0836</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300 text-sm">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Karawang, Jawa Barat, Indonesia</span>
              </div>
            </div>

            <a
              href="mailto:fauzyasn@gmail.com"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Connect With Me <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}