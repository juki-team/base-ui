import { Button } from '../../atoms';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';

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
