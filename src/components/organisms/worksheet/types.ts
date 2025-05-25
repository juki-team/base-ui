import { BodyWorksheetType, WorksheetsInPages, WorksheetUserSubmissionsResponseDTO } from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';

export interface ContentsSectionHeaderProps {
  page: number, // [1, pages]
  setPage: Dispatch<number>,
  sheetsInPages: WorksheetsInPages,
  totalPages?: number,
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
  isEditor?: boolean,
  worksheetKey: string,
  withoutContentsHeader?: boolean,
  page?: number, // [1, pages]
  setPage?: (page: number) => void,
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
  content: BodyWorksheetType[],
  worksheetKey: string,
  isSolvable?: boolean,
  isEditor?: boolean,
  resultsUserKey?: string,
  // withoutContentsHeader?: boolean,
  page?: number,
  setPage?: (newPage: number) => void,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
}

export interface WorksheetEditorProps {
  content: BodyWorksheetType[],
  setContent: (content: BodyWorksheetType[]) => void,
  worksheetKey: string,
  isSolvable?: boolean,
  isEditor?: boolean,
  // withoutContentsHeader?: boolean,
  page?: number,
  setPage?: (newPage: number) => void,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
}
