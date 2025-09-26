import type { WorksheetDataResponseDTO } from '@juki-team/commons';

export interface WorksheetAsSlidesProps {
  worksheet: WorksheetDataResponseDTO,
  resultsUserKey?: string,
  readOnly?: boolean,
  page?: number,
}
