import { forwardRef, HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ spacing = 'lg', className = '', children, ...props }, ref) => {
    const spacingMap = {
      none: '',
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24',
      lg: 'py-24 md:py-32',
      xl: 'py-32 md:py-48',
    };

    return (
      <section
        ref={ref}
        className={`w-full relative overflow-hidden ${spacingMap[spacing]} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';