import { ReactNode } from 'react';

export interface TwoContentSectionProps {
  children: [ ReactNode | JSX.Element | undefined, ReactNode | JSX.Element | undefined ],
  className?: string,
}
