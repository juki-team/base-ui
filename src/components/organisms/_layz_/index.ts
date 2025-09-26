import { ExcalidrawButtonImport } from './ExcalidrawButton';
import { GraphvizImport } from './Graphviz';
import { GraphvizViewerImport } from './GraphvizViewer';
import { MdMathImport } from './MdMath';
import { MdMathEditorImport } from './MdMathEditor';

export async function preImportOrganisms() {
  await ExcalidrawButtonImport();
  await GraphvizImport();
  await GraphvizViewerImport();
  await MdMathImport();
  await MdMathEditorImport();
}
