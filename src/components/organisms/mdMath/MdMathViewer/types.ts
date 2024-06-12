import { Theme } from '@juki-team/commons';

export type CommandsObjectType = {
  textAlign?: string,
  imgAlign?: string,
  size?: {
    width: number | 'auto',
    height: number | 'auto',
  },
  height?: string,
  theme?: Theme,
  lang?: string,
  lineNumbers?: boolean,
  rest?: string,
  preview?: string,
  asImage?: boolean,
}

export type CommandsFunctionsType = {
  textAlign: (value: string) => string,
  imgAlign: (value: string) => string,
  size: (value: string) => {
    width: number | 'auto',
    height: number | 'auto'
  },
  height: (value: string) => string,
  theme: (value: string) => Theme,
  lang: (value: string) => string,
  preview: (value: string) => string,
}

export interface MdMathViewerProps {
  source: string,
  dark?: boolean,
  // sharedButton?: boolean,
  downloadButton?: boolean,
  className?: string,
}
