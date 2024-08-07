import { Status } from '@juki-team/commons';
import { ReactNode } from 'react';

export type ReactNodeOrFunctionType = ReactNode | (() => ReactNode);

export type ReactNodeOrFunctionP1Type<T, U = ReactNode> = U | ((prop1: T) => U);

export const HOVER = 'hover';
export const CLICK = 'click';
export const ESCAPE = 'escape';
export const NONE = 'none';

export type TriggerActionsType = typeof HOVER | typeof CLICK | typeof ESCAPE | typeof NONE;

export type TriggerOnActionsType = typeof HOVER | typeof CLICK | typeof NONE;

export type TriggerOffActionsType = typeof HOVER | typeof CLICK | typeof ESCAPE | typeof NONE;

export type BoundingClientRectType = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  x: number,
  y: number
};

export type NotUndefined<T> = T extends undefined ? never : T;

export type SetStatusType = (status: Status) => void;

export type ViewPortSizeType = 'hg' | 'lg' | 'md' | 'sm' | '';

export type DateDisplayType =
  'year'
  | 'year-month'
  | 'year-month-day'
  | 'year-month-day-hours'
  | 'year-month-day-hours-minutes'
  | 'year-month-day-hours-minutes-seconds'
  | 'year-month-day-hours-minutes-seconds-milliseconds'
  | 'hours'
  | 'hours-minutes'
  | 'hours-minutes-seconds'
  | 'hours-minutes-seconds-milliseconds';

export enum Sound {
  CLICK,
  SUCCESS,
  ERROR,
  NOTIFICATION,
  WARNING,
  MESSAGE,
  POP,
  BELL,
}

export * from './api';
export * from './route';
export * from './services';
