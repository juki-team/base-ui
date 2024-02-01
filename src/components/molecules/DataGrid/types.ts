import { SheetDataType } from '../../../modules';

export type DataGridProps = Pick<SheetDataType, 'rows' | 'freeze' | 'styles' | 'autofilter'>
  & { firstRowAsHeaders?: boolean };
