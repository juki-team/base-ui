import { Button } from '../../atoms/Button/Button';
import type { ButtonProps } from '../../atoms/Button/Button';
import { NavigateNextIcon } from '../../atoms/server/icons/google/NavigateNextIcon';

export function NextButton({ onClick }: { onClick: ButtonProps['onClick'] }) {
  return <Button size="small" icon={<NavigateNextIcon />} type="secondary" onClick={onClick} />;
}
