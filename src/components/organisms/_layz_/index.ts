import { ChangePasswordModalImport } from './ChangePasswordModal';
import { DataViewerImport } from './DataViewer';
import { ExcalidrawButtonImport } from './ExcalidrawButton';
import { GraphvizViewerImport } from './GraphvizViewer';
import { MdMathImport } from './MdMath';
import { MdMathEditorImport } from './MdMathEditor';
import { UserCodeEditorImport } from './UserCodeEditor';
import { WorksheetAsSlidesImport } from './WorksheetAsSlides';
import { WorksheetContentsImport } from './WorksheetContents';
import { WorksheetEditorImport } from './WorksheetEditor';
import { WorksheetViewerImport } from './WorksheetViewer';

export async function preImportOrganisms() {
  await ChangePasswordModalImport();
  await DataViewerImport();
  await ExcalidrawButtonImport();
  await GraphvizViewerImport();
  await MdMathEditorImport();
  await MdMathImport();
  await UserCodeEditorImport();
  await WorksheetAsSlidesImport();
  await WorksheetContentsImport();
  await WorksheetEditorImport();
  await WorksheetViewerImport();
}
