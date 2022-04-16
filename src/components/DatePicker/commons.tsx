import React from 'react';
import { Button } from '../Button';
import { UpIcon } from '../graphics';

export const PreviousButton = ({ onClick }: { onClick: (() => void) }) => (
  <Button
    icon={<UpIcon rotate={-90} />}
    type="text"
    onClick={onClick}
  />
);

export const NextButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    icon={<UpIcon rotate={90} />}
    type="text"
    onClick={onClick}
  />
);
