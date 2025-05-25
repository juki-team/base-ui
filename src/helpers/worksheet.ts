import { JkmdSheetType, QuizOptionsSheetType, WorksheetType } from '@juki-team/commons';
import { BasicWorksheetType } from '@juki-team/commons/dist/types/types/sheet';
import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../constants';

export const getHeight = (height: number | 'auto', sourceCode: string) => {
  return (typeof height === 'number' && !Number.isNaN(height) && height > WORKSHEET_CODE_EDITOR_MIN_HEIGHT)
    ? height + 'px'
    : Math.max((sourceCode?.split('\n').length ?? 0) * 20 + 60, WORKSHEET_CODE_EDITOR_MIN_HEIGHT);
};

export const isBasicWorksheetType = (value: any): value is BasicWorksheetType & any => {
  return typeof value?.id == 'string' && value.id
    && Object.values(WorksheetType).includes(value?.type as WorksheetType)
    && typeof value?.title == 'string'
    && typeof value?.points == 'number';
};

export const isJkmdSheetType = (value: any): value is JkmdSheetType => {
  return isBasicWorksheetType(value)
    && value?.type === WorksheetType.JK_MD
    && typeof value?.content == 'string';
};

export const isQuizOptionsSheetType = (value: any): value is QuizOptionsSheetType => {
  return isBasicWorksheetType(value)
    && value?.type === WorksheetType.QUIZ_OPTIONS
    && typeof value?.description == 'string'
    && Array.isArray(value?.options)
    && value?.options.every((option: any) => typeof option?.label == 'string' && typeof option?.correct == 'boolean' && typeof option?.id == 'string')
    && typeof value?.multiple == 'boolean'
    && (value?.scoringMode === 'TOTAL' || value?.scoringMode === 'PARTIAL');
};
