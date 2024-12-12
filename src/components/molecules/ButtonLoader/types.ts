import { Status } from '@juki-team/commons';
import { ButtonBasicProps, OnClickButtonEventType } from '../../atoms';

export type LoaderStatusOnClickType = Status;

export type SetLoaderStatusOnClickType = (status: (Status | ((props: LoaderStatusOnClickType) => LoaderStatusOnClickType))) => void;

export type ButtonLoaderOnClickType<T = OnClickButtonEventType> =
  ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: T) => void)
  | ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: T) => Promise<void>);

export interface ButtonLoaderProps extends ButtonBasicProps {
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onClick?: ButtonLoaderOnClickType,
}
