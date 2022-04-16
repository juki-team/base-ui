import React from 'react';
import { classNames } from '../../../helpers';
import JukiCompleteLaptop from './JukiCompleteLaptop';
import JukiCouchLogoHor from './JukiCouchLogoHor';
import JukiCouchLogoVer from './JukiCouchLogoVer';
import JukiCourt from './JukiCourt';
import JukiHead from './JukiHead';
import JukiJudgeLogoHor from './JukiJudgeLogoHor';
import JukiJudgeLogoVer from './JukiJudgeLogoVer';
import JukiLaptop from './JukiLaptop';
import { JukiSurprised } from './JukiSurprised';
import JukiUtilsLogoHor from './JukiUtilsLogoHor';

import { ImageProps } from './types';

export const FlagEnImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-bg-image flag-en', className)} />
  );
};

export const FlagEsImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-bg-image flag-es', className)} />
  );
};

// LOGO

export const JukiJudgeLogoHorImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiJudgeLogoHor /></div>
  );
};

export const JukiJudgeLogoVerImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiJudgeLogoVer /></div>
  );
};

export const JukiCouchLogoHorImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiCouchLogoHor /></div>
  );
};

export const JukiCouchLogoVerImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiCouchLogoVer /></div>
  );
};

export const JukiCompleteLaptopImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiCompleteLaptop /></div>
  );
};

export const JukiUtilsLogoHorImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiUtilsLogoHor /></div>
  );
};

// IMAGES

export const JukiHeadImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiHead /></div>
  );
};

export const JukiCourtImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiCourt /></div>
  );
};

export const JukiLaptopImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiLaptop /></div>
  );
};

export const JukiSurprisedImage = ({ className, ...props }: ImageProps) => {
  return (
    <div {...props} className={classNames('jk-image jk-svg-image', className)}><JukiSurprised /></div>
  );
};

export * from './types';
