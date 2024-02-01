import { SheetDataType } from '../../../modules';

export type DataGridProps = Pick<SheetDataType, 'rows' | 'cols' | 'freeze' | 'styles' | 'autofilter'>
  & { firstRowAsHeaders?: boolean };
