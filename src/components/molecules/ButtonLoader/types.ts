import { Status } from '@juki-team/commons';
import { ButtonBasicProps, OnClickButtonEventType } from '../../atoms';

export type LoaderStatusOnClickType = [ Status, number ];

export type SetLoaderStatusOnClickType = (status: (Status | ((props: LoaderStatusOnClickType) => LoaderStatusOnClickType)), timestamp?: number) => void;

export type ButtonLoaderOnClickType =
  ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: OnClickButtonEventType) => void)
  | ((setLoaderStatus: SetLoaderStatusOnClickType, loaderStatus: LoaderStatusOnClickType, event: OnClickButtonEventType) => Promise<void>);

export interface ButtonLoaderProps extends ButtonBasicProps {
  withIconTransition?: boolean,
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onClick?: ButtonLoaderOnClickType,
}
