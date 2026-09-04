import { forwardRef, HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'lead';
  variant?: 'default' | 'muted' | 'subtle';
  className?: string;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = 'base', variant = 'default', className = '', children, ...props }, ref) => {
    const sizeMap = {
      sm: 'text-xs md:text-sm leading-relaxed',
      base: 'text-sm md:text-base leading-relaxed',
      lg: 'text-base md:text-lg leading-relaxed',
      xl: 'text-lg md:text-xl leading-relaxed',
      lead: 'text-lg md:text-2xl font-light leading-relaxed',
    };

    const variantMap = {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-muted-foreground/80',
    };

    return (
      <p
        ref={ref}
        className={`${sizeMap[size]} ${variantMap[variant]} ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';