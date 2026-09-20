import React from 'react';
import { Container, ContainerSize } from './Container';

export type SectionBg = 'cream' | 'white' | 'dark' | 'soft';
export type SectionPadding = 'sm' | 'md' | 'lg' | 'none';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  bg?: SectionBg;
  padding?: SectionPadding;
  containerSize?: ContainerSize;
  children: React.ReactNode;
}

const bgStyles: Record<SectionBg, string> = {
  cream: 'bg-[#FAF7F2] text-[#33251D]',
  white: 'bg-[#FFFDF9] text-[#33251D]',
  dark: 'bg-[#33251D] text-[#FAF7F2]',
  soft: 'bg-[#F5EBE6] text-[#33251D]',
};

const paddingStyles: Record<SectionPadding, string> = {
  sm: 'py-10 sm:py-12',
  md: 'py-14 sm:py-20',
  lg: 'py-20 sm:py-28',
  none: 'py-0',
};

export const Section: React.FC<SectionProps> = ({
  id,
  bg = 'cream',
  padding = 'md',
  containerSize = 'lg',
  className = '',
  children,
  ...props
}) => {
  return (
    <section
      id={id}
      className={`relative overflow-hidden transition-colors ${bgStyles[bg]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};
