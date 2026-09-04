import { forwardRef, AnchorHTMLAttributes } from 'react';

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  className?: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active = false, className = '', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`relative font-medium text-sm transition-colors hover:text-primary ${active ? 'text-primary' : 'text-muted-foreground'} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = 'NavLink';