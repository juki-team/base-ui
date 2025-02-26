import { ProblemDataResponseDTO } from '@juki-team/commons';
import { CodeEditorExpandPositionType, UserCodeEditorProps } from '../../organisms';

export interface ProblemStatementViewProps {
  problem: ProblemDataResponseDTO,
  contest?: { index: string, color: string },
  infoPlacement: 'left' | 'name' | 'none',
  withoutName?: boolean,
  forPrinting?: boolean,
  withoutDownloadButtons?: boolean,
}

export interface ProblemViewProps<T> extends ProblemStatementViewProps {
  codeEditorCenterButtons?: UserCodeEditorProps<T>['centerButtons'],
  codeEditorStoreKey: string,
  expandPosition?: CodeEditorExpandPositionType,
}

export interface ProblemInfoProps {
  problem: ProblemDataResponseDTO;
}
