import { Button } from '../../../../atoms/Button/Button';
import { ArrowDownwardIcon } from '../../../../atoms/server/icons/google/ArrowDownwardIcon';
import { ArrowUpwardIcon } from '../../../../atoms/server/icons/google/ArrowUpwardIcon';
import { DeleteIcon } from '../../../../atoms/server/icons/google/DeleteIcon';

interface UpRemoveDownButtonsProps<T> {
  index: number;
  length: number;
  onChange: (callback: (newList: T[]) => T[]) => void;
}

export const UpRemoveDownButtons = <T,>({ index, length, onChange }: UpRemoveDownButtonsProps<T>) => {
  return (
    <div className="jk-col gap">
      <Button
        size="small"
        icon={<ArrowUpwardIcon />}
        disabled={index === 0}
        onClick={() => {
          onChange((list) => {
            const newSheets = [...list];
            const previous = newSheets[index - 1];
            if (newSheets[index] && previous) {
              [newSheets[index], newSheets[index - 1]] = [previous, newSheets[index]];
            }
            return newSheets;
          });
        }}
      />
      <Button
        size="small"
        icon={<DeleteIcon />}
        onClick={() => {
          onChange((list) => list.filter((_, i) => i !== index));
        }}
      />
      <Button
        size="small"
        icon={<ArrowDownwardIcon />}
        disabled={index === length - 1}
        onClick={() => {
          onChange((list) => {
            const newSheets = [...list];
            const next = newSheets[index + 1];
            if (newSheets[index] && next) {
              [newSheets[index], newSheets[index + 1]] = [next, newSheets[index]];
            }
            return newSheets;
          });
        }}
      />
    </div>
  );
};
