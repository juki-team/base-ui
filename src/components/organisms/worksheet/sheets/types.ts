import { BodyWorksheetType } from '@juki-team/commons';
import { WorkSheetSubmissions } from '@juki-team/commons/dist/types/dto/worksheet-submissions';
import { SetContentType, SetSheetType, UserResultsType } from '../types';

export interface SheetSection<T extends BodyWorksheetType, U extends WorkSheetSubmissions[keyof WorkSheetSubmissions][string][number]> {
  content: T,
  setContent?: SetContentType<T>,
  index: number,
  chunkId: string,
  sheetLength: number,
  setSheet?: SetSheetType<BodyWorksheetType>,
  worksheetKey: string,
  isSolvable: boolean,
  readOnly: boolean,
  userResults?: UserResultsType,
}
