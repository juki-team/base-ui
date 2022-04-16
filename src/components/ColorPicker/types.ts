import { PropsWithChildren } from 'react';

export type ColorPickerProps = PropsWithChildren<{ color?: string, onChange: (newColor: string) => void }>;
