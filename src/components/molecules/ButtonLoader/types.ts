import { ButtonBasicProps, ButtonLoaderOnClickType, SetLoaderStatusOnClickType } from '../../types';

export interface ButtonLoaderProps extends ButtonBasicProps {
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onClick?: ButtonLoaderOnClickType,
}
