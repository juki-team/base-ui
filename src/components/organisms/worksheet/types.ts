import { BodyWorksheetType, WorksheetsInPages, WorksheetUserSubmissionsResponseDTO } from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import { SetSearchParamsType } from '../../../contexts/JukiRouterProvider/types';

export type OnPageChange = (newPage: number, newSubPage: number, entries: Parameters<SetSearchParamsType>[0]) => void;

export interface ContentsSectionHeaderProps {
  page: number, // [1, pages]
  subPage: number,
  onPageChange: OnPageChange
  sheetsInPages: WorksheetsInPages,
}

export type UserResultsType = {
  data?: WorksheetUserSubmissionsResponseDTO,
  isLoading?: boolean,
  validating?: boolean,
  mutate?: KeyedMutator<any>,
}

export interface WorksheetBodiesProps {
  sheetsInPages: WorksheetsInPages,
  setSheets?: Dispatch<BodyWorksheetType[]>,
  userResults?: UserResultsType,
  isSolvable: boolean,
  isEditor: boolean,
  worksheetKey: string,
  page: number, // [1, pages]
  subPage: number, // [1, pages]
  onPageChange: OnPageChange,
  lastPageChildren?: ReactNode,
  readOnly: boolean,
}

export type SetSheetType<T extends BodyWorksheetType> = Dispatch<SetStateAction<T[]>>

export type SetContentType<T extends BodyWorksheetType> = Dispatch<SetStateAction<T>>;

export interface WorksheetBodyProps {
  sheet?: BodyWorksheetType[],
  setSheet?: SetSheetType<BodyWorksheetType>,
  userResults?: UserResultsType,
  readOnly: boolean,
  isSolvable: boolean,
  isEditor?: boolean,
  worksheetKey: string,
}

export interface WorksheetViewerProps {
  resultsUserKey?: string,
  
  content: BodyWorksheetType[],
  worksheetKey: string,
  isSolvable?: boolean,
  isEditor?: boolean,
  page?: number,
  subPage?: number,
  onPageChange?: OnPageChange,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
}

export interface WorksheetEditorProps extends Omit<WorksheetViewerProps, 'resultsUserKey'> {
  setContent: (content: BodyWorksheetType[]) => void,
}
