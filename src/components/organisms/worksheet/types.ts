import {
  BodyWorksheetType,
  WorksheetDataResponseDTO,
  WorksheetsInPages,
  WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import { Dispatch, ReactNode } from 'react';
import { KeyedMutator } from 'swr';

export interface ContentsSectionHeaderProps {
  page: number, // [1, pages]
  setPage: Dispatch<number>,
  sheetsInPages: WorksheetsInPages,
  totalPages?: number,
}

export interface WorksheetBodiesProps {
  sheetsInPages: WorksheetsInPages,
  setSheets?: Dispatch<BodyWorksheetType[]>,
  results?: WorksheetUserSubmissionsResponseDTO,
  resultsIsLoading?: boolean,
  resultsIsValidating?: boolean,
  isSolvable?: boolean,
  isEditor?: boolean,
  worksheetKey: string,
  mutateUserResults?: KeyedMutator<any>,
  withoutContentsHeader?: boolean,
  page: number, // [1, pages]
  setPage: (page: number) => void,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
}

export interface WorksheetBodyProps {
  sheets: BodyWorksheetType[],
  setSheets?: Dispatch<BodyWorksheetType[]>,
  results?: WorksheetUserSubmissionsResponseDTO,
  resultsIsLoading?: boolean,
  resultsIsValidating?: boolean,
  readOnly: boolean,
  isSolvable?: boolean,
  isEditor?: boolean,
  worksheetKey: string,
  mutateUserResults?: KeyedMutator<any>,
}

export interface WorksheetViewerProps {
  worksheet: WorksheetDataResponseDTO,
  results?: WorksheetUserSubmissionsResponseDTO,
  resultsIsLoading?: boolean,
  resultsIsValidating?: boolean,
  mutateUserResults?: KeyedMutator<any>,
  // withoutContentsHeader?: boolean,
  page?: number,
  setPage?: (newPage: number) => void,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
}
