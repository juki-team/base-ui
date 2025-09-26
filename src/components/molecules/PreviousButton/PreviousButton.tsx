import { Button } from '../../atoms';
import type { ButtonProps } from '../../atoms/Button/Button';
import { NavigateBeforeIcon } from '../../atoms/server';

export function PreviousButton({ onClick }: { onClick: ButtonProps['onClick'] }) {
  return (
    <Button
      size="small"
      icon={<NavigateBeforeIcon />}
      type="light"
      onClick={onClick}
    />
  );
}
