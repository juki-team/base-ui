import { ProblemDataResponseDTO } from '@juki-team/commons';
import { UserCodeEditorProps } from '../../organisms';

export interface ProblemStatementViewProps {
  problem: ProblemDataResponseDTO,
  contest?: { index: string, color: string },
  infoPlacement: 'left' | 'name' | 'none',
  withoutName?: boolean,
  forPrinting?: boolean,
}

export interface ProblemViewProps<T> extends ProblemStatementViewProps {
  codeEditorCenterButtons?: UserCodeEditorProps<T>['centerButtons'],
  codeEditorSourceStoreKey?: string,
}

export interface ProblemInfoProps {
  problem: ProblemDataResponseDTO;
}
