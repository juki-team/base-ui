import type { BodyWorksheet } from '@juki-team/commons';

import { UserResultsType } from '../../../../types';
import type { SetContentType, SetSheetType } from '../types';

export interface SheetSection<T extends BodyWorksheet> {
  content: T,
  setContent?: SetContentType<T>,
  index: number,
  chunkId: string,
  sheetLength: number,
  setSheet?: SetSheetType<BodyWorksheet>,
  worksheetKey: string,
  isSolvable: boolean,
  readOnly: boolean,
  userResults?: UserResultsType,
}
