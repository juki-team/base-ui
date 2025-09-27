import { CollapseImport } from './Collapse';
import { InputCellPhoneNumberImport } from './InputCellPhoneNumber';
import { PopoverImport } from './Popover';
import { TooltipImport } from './Tooltip';
import { VirtualizedRowsFixedImport } from './VirtualizedRowsFixed';

export async function preImportAtoms() {
  await CollapseImport();
  await InputCellPhoneNumberImport();
  await PopoverImport();
  await TooltipImport();
  await VirtualizedRowsFixedImport();
}
