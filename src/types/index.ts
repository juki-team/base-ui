import { UserPingResponseDTO } from '@juki-team/commons';
import { ReactNode } from 'react';

export {
  ProgrammingLanguage, Status, SubmissionRunStatus, ErrorCode, JkError, SocketEvent, HTTPMethod, UserStatus, Language, Theme,
} from '@juki-team/commons';
export type { ContentResponseType, ContentsResponseType, UserPingResponseDTO } from '@juki-team/commons';

export type ReactNodeOrFunctionType = ReactNode | (() => ReactNode);
export type ReactNodeOrFunctionP1Type<T> = ReactNode | ((prop1: T) => ReactNode);

export const HOVER = 'hover';
export const CLICK = 'click';
export const ESCAPE = 'escape';
export const NONE = 'none';

export type TriggerActionsType = typeof HOVER | typeof CLICK | typeof ESCAPE | typeof NONE;

export type TriggerOnActionsType = typeof HOVER | typeof CLICK | typeof NONE;

export type TriggerOffActionsType = typeof HOVER | typeof CLICK | typeof ESCAPE | typeof NONE;

export type BoundingClientRectType = { bottom: number, height: number, left: number, right: number, top: number, width: number, x: number, y: number };

export type NotUndefined<T> = T extends undefined ? never : T;

export interface UserState extends UserPingResponseDTO {
  isLogged: boolean,
}
