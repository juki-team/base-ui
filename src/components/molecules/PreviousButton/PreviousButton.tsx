import { Button } from '../../atoms/Button/Button';
import type { ButtonProps } from '../../atoms/Button/Button';
import { NavigateBeforeIcon } from '../../atoms/server/icons/google/NavigateBeforeIcon';

export function PreviousButton({ onClick }: { onClick: ButtonProps['onClick'] }) {
  return <Button size="small" icon={<NavigateBeforeIcon />} type="secondary" onClick={onClick} />;
}
