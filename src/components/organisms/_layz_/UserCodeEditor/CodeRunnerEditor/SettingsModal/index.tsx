import { CODE_EDIT0R_FONT_SIZES, CODE_EDIT0R_TAB_SIZES } from '../../../../../../constants';
import { Modal } from '../../../../../atoms/Modal/Modal';
import { Select } from '../../../../../atoms/Select/Select';
import { T } from '../../../../../atoms/T/T';
import type { SettingsModalProps } from '../types';

export const SettingsModal = <T,>({ onChange, tabSize, fontSize, ...modalProps }: SettingsModalProps<T>) => {
  return (
    <Modal className="jk-pg" {...modalProps}>
      <div className="jk-col stretch gap jk-pg-sm-tb">
        <h3>
          <T className="tt-se">code editor settings</T>
        </h3>
        <div className="jk-row left gap">
          <span className="tt-se">
            <T>choose your tab size</T>:{' '}
          </span>
          <Select
            options={CODE_EDIT0R_TAB_SIZES.map((keyMap) => ({ value: keyMap, label: `${keyMap}` }))}
            selectedOption={{ value: tabSize }}
            onChange={({ value }) => onChange?.({ tabSize: value })}
          />
        </div>
        <div className="jk-row left gap">
          <span className="tt-se">
            <T>choose your font size</T>:{' '}
          </span>
          <Select
            options={CODE_EDIT0R_FONT_SIZES.map((keyMap) => ({ value: keyMap, label: `${keyMap}` }))}
            selectedOption={{ value: fontSize }}
            onChange={({ value }) => onChange?.({ fontSize: value })}
          />
        </div>
      </div>
    </Modal>
  );
};
