import { ReactNode } from 'react';

export interface TwoContentSectionProps {
  children: [ReactNode, ReactNode];
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
}
