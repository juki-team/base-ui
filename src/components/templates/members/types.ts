import {
  DocumentMembersResponseDTO,
  EntityMembersResponseDTO,
  UserCompanyBasicInfoResponseDTO,
} from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface DocumentCustomMembersContentProps {
  members: EntityMembersResponseDTO,
  setMembers?: Dispatch<SetStateAction<EntityMembersResponseDTO>>,
  documentOwner: UserCompanyBasicInfoResponseDTO,
  administrators?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  managers?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  participants?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  guests?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  spectators?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
}

export interface DocumentMembersButton1Props {
  copyLink?: () => string,
  documentName: ReactNode,
  documentMembers: DocumentMembersResponseDTO,
  documentOwner: UserCompanyBasicInfoResponseDTO,
  onSave: (members: DocumentMembersResponseDTO, close: () => void) => Promise<void>,
  saveUrl?: never,
  reloadDocument?: never,
}

export interface DocumentMembersButton2Props {
  copyLink?: () => string,
  documentName: ReactNode,
  documentMembers: DocumentMembersResponseDTO,
  documentOwner: UserCompanyBasicInfoResponseDTO,
  onSave?: never,
  saveUrl: string,
  reloadDocument?: () => Promise<void>,
}

export type DocumentMembersButtonProps = DocumentMembersButton1Props | DocumentMembersButton2Props;

export interface DocumentMembersContentProps {
  members: DocumentMembersResponseDTO,
  setMembers?: Dispatch<SetStateAction<DocumentMembersResponseDTO>>,
  documentOwner: UserCompanyBasicInfoResponseDTO,
}
