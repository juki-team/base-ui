import type { WorksheetsInPages } from '@juki-team/commons';
import { OnPageChange } from '../types';

export interface WorksheetContentsProps {
  page: number, // [1, pages]
  subPage: number,
  onPageChange: OnPageChange
  sheetsInPages: WorksheetsInPages,
}
