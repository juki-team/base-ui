import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="m18.525 9-1.1-2.4-2.4-1.1 2.4-1.1 1.1-2.4 1.1 2.4 2.4 1.1-2.4 1.1Zm2 7-.8-1.7-1.7-.8 1.7-.8.8-1.7.8 1.7 1.7.8-1.7.8Zm-13 6-.3-2.35q-.2-.075-.387-.2-.188-.125-.313-.25l-2.2.95L1.85 15.8l1.875-1.4v-.8L1.85 12.2l2.475-4.35 2.2.95q.125-.125.313-.25.187-.125.387-.2l.3-2.35h5l.3 2.35q.2.075.388.2.187.125.312.25l2.2-.95L18.2 12.2l-1.875 1.4v.8l1.875 1.4-2.475 4.35-2.2-.95q-.125.125-.312.25-.188.125-.388.2l-.3 2.35Zm2.5-5q1.25 0 2.125-.875T13.025 14q0-1.25-.875-2.125T10.025 11q-1.25 0-2.125.875T7.025 14q0 1.25.875 2.125t2.125.875Zm0-2q-.425 0-.713-.288-.287-.287-.287-.712t.287-.713Q9.6 13 10.025 13t.713.287q.287.288.287.713t-.287.712q-.288.288-.713.288Zm-.75 5h1.5l.2-1.8q.725-.2 1.238-.512.512-.313 1.012-.838l1.65.75.7-1.25-1.45-1.1q.2-.575.2-1.25t-.2-1.25l1.45-1.1-.7-1.25-1.65.75q-.5-.525-1.012-.838Q11.7 10 10.975 9.8l-.2-1.8h-1.5l-.2 1.8q-.725.2-1.237.512-.513.313-1.013.838l-1.65-.75-.7 1.25 1.45 1.1q-.2.575-.212 1.25-.013.675.212 1.25l-1.45 1.1.7 1.25 1.65-.75q.5.525 1.013.838.512.312 1.237.512Zm.75-6Z"
    fill={color}
  />
);

export const SettingsSuggestIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon);
};
