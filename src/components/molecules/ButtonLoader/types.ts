import { ButtonBasicProps, ButtonLoaderOnClickType, SetLoaderStatusOnClickType } from '../../types/commons';

export interface ButtonLoaderProps extends ButtonBasicProps {
  setLoaderStatusRef?: (setLoader: SetLoaderStatusOnClickType) => void,
  onClick?: ButtonLoaderOnClickType,
}
