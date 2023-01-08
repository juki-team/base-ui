import React from 'react';
import { classNames } from '../../../helpers';

import Apps from './Apps'; // not antd
import Appstore from './Appstore';
import CaretLeft from './CaretLeft';
import Code from './Code';
import DoubleArrow from './DoubleArrow';
import DragIndicator from './DragIndicator'; // not antd
import Facebook from './Facebook';
import FileDone from './FileDone';
import InfoCircle from './InfoCircle';
import Layout from './Layout';
import Link from './Link';
import MessagePlus from './MessagePlus';
import MessageQuestion from './MessageQuestion';
import Note from './Note';
import NoteCode from './NoteCode'; // not antd
import PlayCircle from './PlayCircle';
import Read from './Read';
import Task from './Task'; // not antd
import { IconProps } from './types';
import Upload from './Upload';
import User from './User';
import Warning from './Warning';
import ZoomIn from './ZoomIn';
import ZoomOut from './ZoomOut';

export const AppsIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Apps /></span>
  );
};

export const AppstoreIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Appstore /></span>
  );
};

export const CaretLeftIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><CaretLeft /></span>
  );
};

export const CodeIcon_ = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Code /></span>
  );
};

export const DoubleArrowIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><DoubleArrow /></span>
  );
};

export const DragIndicatorIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><DragIndicator /></span>
  );
};

export const FacebookIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size, 'facebook')}><Facebook /></span>
  );
};

export const FileDoneIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><FileDone /></span>
  );
};

export const InfoCircleIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><InfoCircle /></span>
  );
};

export const LayoutIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Layout /></span>
  );
};

export const LinkIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Link /></span>
  );
};

export const MessagePlusIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><MessagePlus /></span>
  );
};

export const MessageQuestionIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><MessageQuestion /></span>
  );
};

export const NoteIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Note /></span>
  );
};

export const NoteCodeIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><NoteCode /></span>
  );
};

export const PlayCircleIcon_ = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><PlayCircle /></span>
  );
};

export const ReadIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Read /></span>
  );
};

export const TaskIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Task /></span>
  );
};

export const UploadIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Upload /></span>
  );
};

export const UserIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><User /></span>
  );
};

export const WarningIcon_ = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><Warning /></span>
  );
};

export const ZoomInIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><ZoomIn /></span>
  );
};

export const ZoomOutIcon = ({ size = 'regular', className = '', ...props }: IconProps) => {
  return (
    <span {...props} className={classNames(className, 'jk-icon', 'jk-icon-' + size)}><ZoomOut /></span>
  );
};

export * from './google';
export * from './Signs';
export * from './Basic';
export * from './Specials';

export * from './Link';
export * from './types';
