import type { WorksheetDataResponseDTO } from '@juki-team/commons';
import type { ReactNode } from 'react';
import { OnPageChange } from '../WorksheetEditor/types';

export interface WorksheetViewerProps {
  worksheet: Pick<WorksheetDataResponseDTO, 'content' | 'user' | 'key' | 'quiz'>,
  resultsUserKey?: string,
  page?: number,
  subPage?: number,
  onPageChange?: OnPageChange,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
  withoutTableOfContents?: boolean,
}
