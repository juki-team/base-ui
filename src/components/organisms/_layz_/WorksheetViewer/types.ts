import type { WorksheetDataResponseDTO } from '@juki-team/commons';
import type { ReactNode } from 'react';
import { SetSearchParamsType } from '../../../types';

export type OnPageChange = (newPage: number, newSubPage: number, entries: Parameters<SetSearchParamsType>[0]) => void;

export interface WorksheetViewerProps {
  worksheet: Pick<WorksheetDataResponseDTO, 'content' | 'user' | 'key' | 'quiz'>,
  resultsUserKey?: string,
  page?: number,
  subPage?: number,
  onPageChangeRef?: OnPageChange,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
  withoutTableOfContents?: boolean,
}
