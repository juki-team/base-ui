import { BodyWorksheetType } from '@juki-team/commons';
import { SetContentType, SetSheetType, UserResultsType } from '../types';

export interface SheetSection<T extends BodyWorksheetType> {
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
  asSlides: boolean,
}
