import { ChangePasswordModalImport } from './ChangePasswordModal';
import { DataViewerImport } from './DataViewer';
import { ExcalidrawButtonImport } from './ExcalidrawButton';
import { GraphvizViewerImport } from './GraphvizViewer';
import { LoginModalImport } from './LoginModal';
import { MdMathImport } from './MdMath';
import { MdMathEditorImport } from './MdMathEditor';
import { SignUpModalImport } from './SignUpModal';
import { SubmissionModalImport } from './SubmissionModal';
import { UserCodeEditorImport } from './UserCodeEditor';
import { UserPreviewModalImport } from './UserPreviewModal';
import { WorksheetAsSlidesImport } from './WorksheetAsSlides';
import { WorksheetEditorImport } from './WorksheetEditor';
import { WorksheetViewerImport } from './WorksheetViewer';

export async function preImportOrganisms() {
  await ChangePasswordModalImport();
  await DataViewerImport();
  await ExcalidrawButtonImport();
  await GraphvizViewerImport();
  await LoginModalImport();
  await MdMathImport();
  await MdMathEditorImport();
  await SignUpModalImport();
  await SubmissionModalImport();
  await UserCodeEditorImport();
  await UserPreviewModalImport();
  await WorksheetAsSlidesImport();
  await WorksheetEditorImport();
  await WorksheetViewerImport();
}
