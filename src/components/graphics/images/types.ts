import { FlagEnImage, FlagEsImage, JukiCompleteLaptopImage, JukiCouchLogoHorImage, JukiCouchLogoVerImage, JukiHeadImage, JukiCourtImage, JukiJudgeLogoHorImage, JukiJudgeLogoVerImage, JukiLaptopImage } from './index';

export type ImagesType =
  typeof FlagEsImage |
  typeof FlagEnImage |
  typeof JukiCompleteLaptopImage |
  typeof JukiCouchLogoHorImage |
  typeof JukiCouchLogoVerImage |
  typeof JukiHeadImage |
  typeof JukiCourtImage |
  typeof JukiJudgeLogoHorImage |
  typeof JukiJudgeLogoVerImage |
  typeof JukiLaptopImage;

export interface ImageProps {
  onClick?: () => void,
  className?: string,
}
