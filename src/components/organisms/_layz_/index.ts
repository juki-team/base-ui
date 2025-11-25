import { ChangePasswordModalImport } from './ChangePasswordModal';
import { DataViewerImport } from './DataViewer';
import { ExcalidrawButtonImport } from './ExcalidrawButton';
import { GraphvizViewerImport } from './GraphvizViewer';
import { LoginModalImport } from './LoginModal';
import { MdMathImport } from './MdMath';
import { MdMathEditorImport } from './MdMathEditor';
import { SignUpModalImport } from './SignUpModal';
import { SubmissionModalImport } from './SubmissionModal';
import { SubmitViewImport } from './SubmitView';
import { UserCodeEditorImport } from './UserCodeEditor';
import { UserPreviewModalImport } from './UserPreviewModal';
import { WelcomeModalImport } from './WelcomeModal';
import { WorksheetAsSlidesImport } from './WorksheetAsSlides';
import { WorksheetContentsImport } from './WorksheetContents';
import { WorksheetEditorImport } from './WorksheetEditor';
import { WorksheetViewerImport } from './WorksheetViewer';

export async function preImportOrganisms() {
  await ChangePasswordModalImport();
  await DataViewerImport();
  await ExcalidrawButtonImport();
  await GraphvizViewerImport();
  await LoginModalImport();
  await MdMathEditorImport();
  await MdMathImport();
  await SignUpModalImport();
  await SubmissionModalImport();
  await SubmitViewImport();
  await UserCodeEditorImport();
  await UserPreviewModalImport();
  await WelcomeModalImport();
  await WorksheetAsSlidesImport();
  await WorksheetContentsImport();
  await WorksheetEditorImport();
  await WorksheetViewerImport();
}
