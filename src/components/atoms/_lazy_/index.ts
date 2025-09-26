import { CollapseImport } from './Collapse';
import { InputCellPhoneNumberImport } from './InputCellPhoneNumber';
import { PopoverImport } from './Popover';
import { VirtualizedRowsFixedImport } from './VirtualizedRowsFixed';

export async function preImportAtoms() {
  await CollapseImport();
  await InputCellPhoneNumberImport();
  await PopoverImport();
  await VirtualizedRowsFixedImport();
}
