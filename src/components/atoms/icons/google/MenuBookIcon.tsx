import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M14 9.9V8.2q.825-.35 1.688-.525Q16.55 7.5 17.5 7.5q.65 0 1.275.1.625.1 1.225.25v1.6q-.6-.225-1.212-.337Q18.175 9 17.5 9q-.95 0-1.825.238Q14.8 9.475 14 9.9Zm0 5.5v-1.7q.825-.35 1.688-.525Q16.55 13 17.5 13q.65 0 1.275.1.625.1 1.225.25v1.6q-.6-.225-1.212-.337-.613-.113-1.288-.113-.95 0-1.825.225T14 15.4Zm0-2.75v-1.7q.825-.35 1.688-.525.862-.175 1.812-.175.65 0 1.275.1.625.1 1.225.25v1.6q-.6-.225-1.212-.337-.613-.113-1.288-.113-.95 0-1.825.238-.875.237-1.675.662ZM6.5 16q1.175 0 2.288.262 1.112.263 2.212.788V7.2q-1.025-.6-2.175-.9Q7.675 6 6.5 6q-.9 0-1.787.175Q3.825 6.35 3 6.7v9.9q.875-.3 1.738-.45Q5.6 16 6.5 16Zm6.5 1.05q1.1-.525 2.213-.788Q16.325 16 17.5 16q.9 0 1.763.15.862.15 1.737.45V6.7q-.825-.35-1.712-.525Q18.4 6 17.5 6q-1.175 0-2.325.3-1.15.3-2.175.9ZM12 20q-1.2-.95-2.6-1.475Q8 18 6.5 18q-1.05 0-2.062.275-1.013.275-1.938.775-.525.275-1.012-.025Q1 18.725 1 18.15V6.1q0-.275.138-.525.137-.25.412-.375 1.15-.6 2.4-.9Q5.2 4 6.5 4q1.45 0 2.838.375Q10.725 4.75 12 5.5q1.275-.75 2.663-1.125Q16.05 4 17.5 4q1.3 0 2.55.3 1.25.3 2.4.9.275.125.413.375.137.25.137.525v12.05q0 .575-.487.875-.488.3-1.013.025-.925-.5-1.938-.775Q18.55 18 17.5 18q-1.5 0-2.9.525T12 20Zm-5-8.35Z"
    fill={color}
    
  />
);

export const MenuBookIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'menu-book');
};