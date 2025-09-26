import { BarChartImport } from './BarChart';
import { CodeEditorImport } from './CodeEditor';
import { CodeViewerImport } from './CodeViewer';
import { DataGridImport } from './DataGrid';
import { DrawerViewImport } from './DrawerView';
import { InputColorImport } from './InputColor';
import { LineChartImport } from './LineChart';
import { SlideDeckImport } from './SlideDeck';
import { SortableItemsImport } from './SortableItems';
import { TabsInlineImport } from './TabsInline';

export async function preImportMolecules() {
  await BarChartImport();
  await CodeEditorImport();
  await CodeViewerImport();
  await DataGridImport();
  await DrawerViewImport();
  await InputColorImport();
  await LineChartImport();
  await SortableItemsImport();
  await SlideDeckImport();
  await TabsInlineImport();
}
