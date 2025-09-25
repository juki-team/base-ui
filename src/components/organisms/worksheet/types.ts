import type { BodyWorksheetType, WorksheetDataResponseDTO, WorksheetsInPages } from '@juki-team/commons';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { SetSearchParamsType, UserResultsType } from '../../types';

export type OnPageChange = (newPage: number, newSubPage: number, entries: Parameters<SetSearchParamsType>[0]) => void;

export interface ContentsSectionHeaderProps {
  page: number, // [1, pages]
  subPage: number,
  onPageChange: OnPageChange
  sheetsInPages: WorksheetsInPages,
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
  sheet: BodyWorksheetType[],
  setSheet?: SetSheetType<BodyWorksheetType>,
  userResults?: UserResultsType,
  readOnly: boolean,
  isSolvable: boolean,
  isEditor?: boolean,
  worksheetKey: string,
  asSlides?: boolean,
}

export interface WorksheetNodeProps extends Pick<WorksheetBodyProps, 'sheet' | 'setSheet' | 'userResults' | 'readOnly' | 'isSolvable' | 'worksheetKey' | 'asSlides'> {
  index: number,
  length: number,
}

export interface WorksheetViewerProps {
  worksheet: Pick<WorksheetDataResponseDTO, 'content' | 'user' | 'key' | 'quiz'>,
  resultsUserKey?: string,
  page?: number,
  subPage?: number,
  onPageChange?: OnPageChange,
  lastPageChildren?: ReactNode,
  readOnly?: boolean,
  withoutTableOfContents?: boolean,
}

export interface WorksheetAsSlidesProps {
  worksheet: WorksheetDataResponseDTO,
  resultsUserKey?: string,
  readOnly?: boolean,
  page?: number,
}

export interface WorksheetEditorProps extends Omit<WorksheetViewerProps, 'resultsUserKey' | 'withoutTableOfContents'> {
  setContent: (content: BodyWorksheetType[]) => void,
}
