import { ReactNode } from 'react';

export interface SubmitViewProps {
  submitId: string,
  triggerFetch?: number,
  header?: ReactNode,
  className?: string,
}
