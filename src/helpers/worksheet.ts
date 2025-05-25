import { JkmdSheetType, WorksheetType } from '@juki-team/commons';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../constants';

export const getHeight = (height: number | 'auto', sourceCode: string) => {
  return (typeof height === 'number' && !Number.isNaN(height) && height > WORKSHEET_CODE_EDITOR_MIN_HEIGHT)
    ? height + 'px'
    : Math.max((sourceCode?.split('\n').length ?? 0) * 20 + 60, WORKSHEET_CODE_EDITOR_MIN_HEIGHT);
};

export const isJkmdSheetType = (value: any): value is JkmdSheetType => {
  return typeof value?.id == 'string' && value.id
    && value?.type === WorksheetType.JK_MD
    && typeof value?.title == 'string'
    && typeof value?.points == 'number'
    && typeof value?.content == 'string';
};
