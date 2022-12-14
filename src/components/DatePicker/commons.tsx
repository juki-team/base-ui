import React from 'react';
import { Button } from '../Button';
import { NavigateBeforeIcon, NavigateNextIcon } from '../graphics';

export const PreviousButton = ({ onClick }: { onClick: (() => void) }) => (
  <Button
    icon={<NavigateBeforeIcon />}
    type="text"
    onClick={onClick}
  />
);

export const NextButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    icon={<NavigateNextIcon />}
    type="text"
    onClick={onClick}
  />
);
