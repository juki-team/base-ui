import { UserHandlesType } from '@juki-team/commons';

export interface UpdatePasswordPayloadDTO {
  newPassword: string,
  oldPassword: string,
}

export interface SignUpPayloadDTO {
  givenName: string,
  familyName: string,
  nickname: string,
  email: string,
  password: string,
}

export interface UpdateUserProfileDataPayloadDTO {
  nickname: string,
  givenName: string,
  familyName: string,
  aboutMe: string,
  country: string,
  city: string,
  institution: string,
  handles: UserHandlesType,
}
