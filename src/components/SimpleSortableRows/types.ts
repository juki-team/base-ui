import { ReactNodeOrFunctionType } from '../../types';

export interface RowItem {
  id: number;
  content: ReactNodeOrFunctionType,
}

export interface DragItem {
  index: number,
  id: number,
  type: string,
}
