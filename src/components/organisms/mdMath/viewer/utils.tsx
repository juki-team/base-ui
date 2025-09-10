import { Theme } from '@juki-team/commons';
import type { Element } from 'hast';
import React, { CSSProperties, ReactNode } from 'react';
import { SetSearchParamsType } from '../../../../contexts/JukiRouterProvider/types';
import { classNames } from '../../../../helpers';
import { QueryParamKey } from '../../../../types';
import { CommandsFunctionsType, CommandsObjectType } from './types';

const keys: CommandsFunctionsType = {
  textAlign: (value = '') => value,
  imgAlign: (value = '') => value,
  size: (value = '') => {
    const [ width, height ] = value.trim().split('x');
    return { width: +width || 'auto', height: +height || 'auto' };
  },
  height: (value = '') => value,
  theme: (value = '') => value === Theme.DARK ? Theme.DARK : Theme.LIGHT,
  lang: (value = '') => value,
  preview: (value = '') => value,
};

export const getCommands = (text: string): [ CommandsObjectType, string ] => {
  const X = text.split('\n');
  const Y = X[0].split(' ');
  const commands = Y[0].split('\\');
  const commandsObject: CommandsObjectType = {};
  let i = 0;
  if (commands[0] === '') {
    for (i++; i < commands.length; i++) {
      const command = commands[i];
      const [ key = '', value = '' ] = command.trim().split('=');
      if (key === 'textAlign') {
        // commandsObject[key] = keys[key](value);
      } else if (key === 'imgAlign') {
        commandsObject[key] = keys[key](value);
      } else if (key === 'size') {
        // commandsObject[key] = keys[key](value);
      } else if (key === 'height') {
        commandsObject[key] = keys[key](value);
      } else if (key === 'theme') {
        commandsObject[key] = keys[key](value);
      } else if (key === 'lang') {
        commandsObject[key] = keys[key](value);
      } else if (key === 'lineNumbers') {
        commandsObject[key] = true;
      } else if (key === 'preview') {
        commandsObject[key] = keys[key](value);
      } else if (key === 'asImage') {
        commandsObject[key] = true;
      } else if (key === 'jkUserNickname') {
        commandsObject[key] = value;
      } else {
        commandsObject.rest = (commandsObject.rest || '') + key + '=' + value;
      }
    }
  }
  Y[0] = commands.slice(i).join('\\');
  X[0] = Y.join(' ');
  return [ commandsObject, X.join('\n') ];
};

export const textAlignStyle: { [key: string]: CSSProperties } = {
  center: { textAlign: 'center' },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },
};

export const imgAlignStyle: { [key: string]: CSSProperties } = {
  center: { display: 'block', margin: '0 auto' },
  left: { display: 'block', margin: '0 auto 0 0' },
  right: { display: 'block', margin: '0 0 0 auto' },
};

const wrapPageFocus = (children: ReactNode, setSearchParams: SetSearchParamsType) => {
  if (typeof children === 'string' && !!children.trim()) {
    const id = encodeURI(`${children.trim().toLowerCase().split(' ').join('-')}`);
    
    return (
      <div
        className="jk-md-math-link-container jk-row left cr-pr"
        id={id}
        onClick={() => setSearchParams({ name: QueryParamKey.PAGE_FOCUS, value: id })}
      >
        <div className="jk-md-math-link">
          {children}
        </div>
      </div>
    );
  }
  
  return children;
};

export const hxRender = (node: Element, children: ReactNode, style: CSSProperties, setSearchParams: SetSearchParamsType, noHLinks: boolean) => {
  
  const isRoot = node?.position?.start?.column === 11111;
  
  switch (node?.tagName) {
    case 'h1':
      return <h1
        className={classNames({ 'fragment': isRoot })}
        style={style}
      >{noHLinks ? children : wrapPageFocus(children, setSearchParams)}</h1>;
    case 'h2':
      return <h2
        className={classNames({ 'fragment': isRoot })}
        style={style}
      >{noHLinks ? children : wrapPageFocus(children, setSearchParams)}</h2>;
    case 'h3':
      return <h3
        className={classNames({ 'fragment': isRoot })}
        style={style}
      >{noHLinks ? children : wrapPageFocus(children, setSearchParams)}</h3>;
    case 'h4':
      return <h4
        className={classNames({ 'fragment': isRoot })}
        style={style}
      >{noHLinks ? children : wrapPageFocus(children, setSearchParams)}</h4>;
    case 'h5':
      return <h5
        className={classNames({ 'fragment': isRoot })}
        style={style}
      >{noHLinks ? children : wrapPageFocus(children, setSearchParams)}</h5>;
    default:
      return <h6
        className={classNames({ 'fragment': isRoot })}
        style={style}
      >{noHLinks ? children : wrapPageFocus(children, setSearchParams)}</h6>;
  }
};
