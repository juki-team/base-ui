import type { WorksheetDataResponseDto } from '@juki-team/commons';

export interface WorksheetAsSlidesProps {
  worksheet: WorksheetDataResponseDto,
  resultsUserKey?: string,
  readOnly?: boolean,
  page?: number,
}
