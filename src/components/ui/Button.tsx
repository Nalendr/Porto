'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'children'>;

interface ButtonProps extends MotionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg cursor-pointer';
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-accent text-accent-foreground hover:bg-accent/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      outline: 'border border-border bg-transparent hover:bg-accent',
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 py-2 text-sm gap-2',
      lg: 'h-11 px-6 text-base gap-2',
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <motion.span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';