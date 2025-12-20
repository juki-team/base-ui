import { ReactElement } from 'react';

export interface UserMockChipProps {
  className?: string,
}

export interface UserChipProps {
  imageUrl: string,
  nickname: string,
  givenName?: string,
  familyName?: string,
  email?: string,
  className?: string,
  companyKey: string,
  withoutLink?: boolean,
}

export interface UserNicknameLinkProps {
  nickname: string,
  companyKey: string,
  children: ReactElement,
}
