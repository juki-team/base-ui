import { Status } from '@juki-team/commons';
import { type TFunction } from 'i18next';
import { type ReactNode } from 'react';
import { CLICK, ESCAPE, HOVER, NONE } from '../constants';
import { Sound } from '../enums';
import { DataViewerRequestPropsType } from './commons';

export type { TFunction };

export type ReactNodeOrFunctionType = ReactNode | (() => ReactNode);

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

export type Sounds = { [key in Sound]: HTMLAudioElement };

export type DataViewerRequesterGetUrlType = (props: Omit<DataViewerRequestPropsType, 'setLoaderStatus'>) => string | null;

export type * from './commons';
export type * from './api';
// export type * from './components';
export type * from './route';
export type * from './services';
export type * from './editor';
export type * from './entity';
export type * from '../contexts/types';
export type * from './time';
export type * from './worksheet';
