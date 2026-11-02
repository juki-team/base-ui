import {
  DocumentMemberResponseDto,
  EntityAccess,
  EntityMembersResponseDto,
  UserOrganizationBasicInfoResponseDto,
} from '@juki-team/commons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ButtonSizeType } from '../../types';

type MemberObj = {
  name?: string;
  description?: ReactNode;
  closeable?: boolean;
  readOnly?: boolean;
  renderMember?: (member: DocumentMemberResponseDto) => ReactNode;
};

export interface DocumentCustomMembersContentProps {
  members: EntityMembersResponseDto;
  setMembers?: Dispatch<SetStateAction<EntityMembersResponseDto>>;
  documentOwner: UserOrganizationBasicInfoResponseDto;
  administrators?: MemberObj;
  managers?: Omit<MemberObj, 'closeable'>;
  participants?: MemberObj;
  guests?: MemberObj;
  spectators?: Omit<MemberObj, 'closeable'>;
  entityAccess?: {
    [EntityAccess.PRIVATE]?: { name?: string; description?: string };
    [EntityAccess.RESTRICTED]?: { name?: string; description?: string };
    [EntityAccess.PUBLIC]?: { name?: string; description?: string };
    [EntityAccess.EXPOSED]?: { name?: string; description?: string };
  };
}

interface DocCommon extends Pick<
  DocumentCustomMembersContentProps,
  'entityAccess' | 'documentOwner' | 'members' | 'administrators' | 'managers' | 'participants' | 'guests' | 'spectators'
> {
  isAdministrator: boolean;
  documentName: ReactNode;
  copyLink?: () => string;
  buttonSize?: ButtonSizeType;
}

export interface DocumentMembersButton1Props extends DocCommon {
  onSave: (members: EntityMembersResponseDto, close: () => void) => Promise<void>;
  saveUrl?: never;
  reloadDocument?: never;
}

export interface DocumentMembersButton2Props extends DocCommon {
  onSave?: never;
  saveUrl: string;
  reloadDocument?: () => Promise<void | string>;
}

export type DocumentMembersButtonProps = DocumentMembersButton1Props | DocumentMembersButton2Props;

export interface DocumentMembersContentProps extends DocumentCustomMembersContentProps {
  // members: EntityMembersResponseDto,
  // setMembers?: Dispatch<SetStateAction<EntityMembersResponseDto>>,
  // documentOwner: UserOrganizationBasicInfoResponseDto,
  // administrators?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // managers?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // participants?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // guests?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
  // spectators?: { name?: string, description?: ReactNode, closeable?: boolean, readOnly?: boolean },
}
