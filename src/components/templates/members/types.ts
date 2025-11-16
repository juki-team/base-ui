import {
  DocumentMemberResponseDTO,
  EntityAccess,
  EntityMembersResponseDTO,
  UserCompanyBasicInfoResponseDTO,
} from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type MemberObj = {
  name?: string,
  description?: ReactNode,
  closeable?: boolean,
  readOnly?: boolean,
  renderMember?: (member: DocumentMemberResponseDTO) => ReactNode
};

export interface DocumentCustomMembersContentProps {
  members: EntityMembersResponseDTO,
  setMembers?: Dispatch<SetStateAction<EntityMembersResponseDTO>>,
  documentOwner: UserCompanyBasicInfoResponseDTO,
  administrators?: MemberObj,
  managers?: Omit<MemberObj, 'closeable'>,
  participants?: MemberObj,
  guests?: MemberObj,
  spectators?: Omit<MemberObj, 'closeable'>,
  entityAccess?: {
    [EntityAccess.PRIVATE]?: { name?: string, description?: string },
    [EntityAccess.RESTRICTED]?: { name?: string, description?: string },
    [EntityAccess.PUBLIC]?: { name?: string, description?: string },
    [EntityAccess.EXPOSED]?: { name?: string, description?: string },
  }
}

interface DocCommon extends Pick<DocumentCustomMembersContentProps, 'entityAccess' | 'documentOwner' | 'members' | 'administrators' | 'managers' | 'participants' | 'guests' | 'spectators'> {
  isAdministrator: boolean,
  documentName: ReactNode,
  copyLink?: () => string,
}

export interface DocumentMembersButton1Props extends DocCommon {
  onSave: (members: EntityMembersResponseDTO, close: () => void) => Promise<void>,
  saveUrl?: never,
  reloadDocument?: never,
}

export interface DocumentMembersButton2Props extends DocCommon {
  onSave?: never,
  saveUrl: string,
  reloadDocument?: () => Promise<void>,
}

export type DocumentMembersButtonProps = DocumentMembersButton1Props | DocumentMembersButton2Props;

export interface DocumentMembersContentProps extends DocumentCustomMembersContentProps {
  // members: EntityMembersResponseDTO,
  // setMembers?: Dispatch<SetStateAction<EntityMembersResponseDTO>>,
  // documentOwner: UserCompanyBasicInfoResponseDTO,
  // administrators?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // managers?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // participants?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // guests?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // spectators?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
}
