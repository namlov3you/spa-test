import React from 'react';

export type HeadingAlign = 'left' | 'center' | 'right';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: HeadingLevel;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: HeadingAlign;
  theme?: 'light' | 'dark';
}

const alignStyles: Record<HeadingAlign, { wrapper: string; text: string }> = {
  left: { wrapper: 'text-left items-start', text: 'text-left' },
  center: { wrapper: 'text-center items-center mx-auto', text: 'text-center' },
  right: { wrapper: 'text-right items-end ml-auto', text: 'text-right' },
};

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  badge,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
  ...props
}) => {
  const isDark = theme === 'dark';
  const Component = level;

  return (
    <div
      className={`flex flex-col space-y-3 max-w-3xl ${alignStyles[align].wrapper} ${className}`}
      {...props}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#C89B68]/15 text-[#C89B68] border border-[#C89B68]/30">
          <span>{badge}</span>
        </div>
      )}

      <Component
        className={`font-serif font-bold tracking-tight ${alignStyles[align].text} ${
          isDark ? 'text-[#FFFDF9]' : 'text-[#33251D]'
        } ${
          level === 'h1'
            ? 'text-3xl sm:text-5xl lg:text-6xl leading-[1.15]'
            : level === 'h2'
            ? 'text-2xl sm:text-4xl lg:text-4xl leading-[1.25]'
            : level === 'h3'
            ? 'text-xl sm:text-2xl lg:text-3xl leading-[1.3]'
            : 'text-lg sm:text-xl font-medium'
        }`}
      >
        {title}
      </Component>

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${alignStyles[align].text} ${
            isDark ? 'text-[#D5C2B2]' : 'text-[#7A695E]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
