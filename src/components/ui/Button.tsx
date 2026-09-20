import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'ghost' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#4A3B32] text-[#FAF7F2] hover:bg-[#33251D] border border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  gold:
    'bg-[#C89B68] text-[#1E140F] hover:bg-[#B78754] border border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] font-semibold',
  outline:
    'bg-transparent text-[#4A3B32] border border-[#C89B68] hover:bg-[#C89B68]/10 hover:border-[#4A3B32] active:scale-[0.98]',
  secondary:
    'bg-[#F5EBE6] text-[#4A3B32] hover:bg-[#EADBCE] border border-[#EADBCE] active:scale-[0.98]',
  ghost:
    'bg-transparent text-[#4A3B32] hover:bg-[#FAF7F2] active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3.5 py-1.5 min-h-[36px] gap-1.5 rounded-full',
  md: 'text-sm px-6 py-2.5 min-h-[44px] gap-2 rounded-full',
  lg: 'text-base px-8 py-3.5 min-h-[50px] gap-2.5 rounded-full tracking-wide',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B68] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
};
