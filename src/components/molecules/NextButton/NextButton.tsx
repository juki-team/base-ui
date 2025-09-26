import { Button } from '../../atoms';
import type { ButtonProps } from '../../atoms/Button/Button';
import { NavigateNextIcon } from '../../atoms/server';

export function NextButton({ onClick }: { onClick: ButtonProps['onClick'] }) {
  return (
    <Button
      size="small"
      icon={<NavigateNextIcon />}
      type="light"
      onClick={onClick}
    />
  );
}
