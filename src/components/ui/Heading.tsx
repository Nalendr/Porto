import { forwardRef, HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle';
  className?: string;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h2', size = 'h1', className = '', children, ...props }, ref) => {
    const sizeMap = {
      display: 'text-6xl md:text-8xl lg:text-8xl font-extrabold tracking-tightest leading-none',
      h1: 'text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight',
      h2: 'text-3xl md:text-4xl font-bold tracking-tight leading-snug',
      h3: 'text-2xl md:text-3xl font-bold tracking-tight leading-snug',
      h4: 'text-xl md:text-2xl font-semibold tracking-normal leading-normal',
      subtitle: 'text-lg md:text-xl font-medium text-muted-foreground tracking-normal',
    };

    return (
      <Component
        ref={ref}
        className={`${sizeMap[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';