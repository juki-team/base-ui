import React from 'react';
import { Button, NavigateBeforeIcon, NavigateNextIcon } from '../../atoms';

export const PreviousButton = ({ onClick }: { onClick: (() => void) }) => (
  <Button
    size="small"
    icon={<NavigateBeforeIcon />}
    type="light"
    onClick={onClick}
  />
);

export const NextButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size="small"
    icon={<NavigateNextIcon />}
    type="light"
    onClick={onClick}
  />
);
