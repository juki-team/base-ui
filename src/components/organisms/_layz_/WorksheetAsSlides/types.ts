import type { WorksheetDataResponseDTO } from '@juki-team/commons/dto';
export interface WorksheetAsSlidesProps {
  worksheet: WorksheetDataResponseDTO;
  resultsUserKey?: string;
  readOnly?: boolean;
  page?: number;
}
