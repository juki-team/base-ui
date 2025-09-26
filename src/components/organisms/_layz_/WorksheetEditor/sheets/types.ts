import type { BodyWorksheetType } from '@juki-team/commons';

import { UserResultsType } from '../../../../types';
import type { SetContentType, SetSheetType } from '../types';

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
}
