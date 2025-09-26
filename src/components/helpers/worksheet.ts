import { WORKSHEET_CODE_EDITOR_MIN_HEIGHT } from '../../constants';

export const getHeight = (height: number | 'auto', sourceCode: string) => {
  return (typeof height === 'number' && !Number.isNaN(height) && height > WORKSHEET_CODE_EDITOR_MIN_HEIGHT)
    ? height + 'px'
    : Math.max((sourceCode?.split('\n').length ?? 0) * 20 + 60, WORKSHEET_CODE_EDITOR_MIN_HEIGHT);
};
