import { ComponentPropsWithRef } from 'react';
import { ButtonBasicProps, OnClickButtonEventType } from '../../../types';
import { Button } from './Button';

export interface ButtonCmpProps extends ButtonBasicProps {
  withIconTransition?: boolean,
  onClick?: (props: OnClickButtonEventType) => void,
}

export type ButtonProps = ComponentPropsWithRef<typeof Button>;
