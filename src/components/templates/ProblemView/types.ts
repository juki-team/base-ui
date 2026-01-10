import { ProblemDataResponseDTO } from '@juki-team/commons';
import { ReactNode } from 'react';
import { IconProps } from '../../atoms/server/icons/types';
import { CodeEditorExpandPositionType, UserCodeEditorProps } from '../../organisms/types';

export interface ProblemStatementViewProps<T> {
  problem: ProblemDataResponseDTO,
  contest?: { index: string, color: string },
  infoPlacement: 'left' | 'name' | 'none',
  withoutName?: boolean,
  forPrinting?: boolean,
  withoutDownloadButtons?: boolean,
  languages?: { value: T, label: ReactNode }[],
}

export interface ProblemViewProps<T> extends ProblemStatementViewProps<T> {
  codeEditorCenterButtons?: UserCodeEditorProps<T>['centerButtons'],
  codeEditorStoreKey: string,
  expandPosition?: CodeEditorExpandPositionType,
  className?: string,
}

export interface ProblemInfoProps {
  problem: ProblemDataResponseDTO,
  size?: IconProps['size'],
}
