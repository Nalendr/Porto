import Link from 'next/link';
import { Container, Button } from '@/components/ui';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <Container size="lg" className="flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="font-display-tightest text-xl tracking-tightest">
          NALENDRs.
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#experience" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Experience
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href="mailto:fauzyasn@gmail.com">
            <Button size="sm">Let's Talk</Button>
          </a>
        </div>
      </Container>
    </header>
  );
}