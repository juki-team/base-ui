import { CODE_EDIT0R_FONT_SIZES, CODE_EDIT0R_TAB_SIZES } from '../../../../../../constants';
import { Modal, Select, T } from '../../../../../atoms';
import { SettingsModalProps } from '../types';

export const SettingsModal = <T, >({ onChange, tabSize, fontSize, ...modalProps }: SettingsModalProps<T>) => {
  return (
    <Modal className="jk-pg" {...modalProps}>
      <div className="jk-col stretch gap jk-pg-sm-tb">
        <h3><T className="tt-se">code editor settings</T></h3>
        <div className="jk-row left gap">
          <label className="tt-se"><T>choose your tab size</T>: </label>
          <Select
            options={CODE_EDIT0R_TAB_SIZES.map(keyMap => ({ value: keyMap, label: keyMap + '' }))}
            selectedOption={{ value: tabSize }}
            onChange={({ value }) => onChange?.({ tabSize: value })}
          />
        </div>
        <div className="jk-row left gap">
          <label className="tt-se"><T>choose your font size</T>: </label>
          <Select
            options={CODE_EDIT0R_FONT_SIZES.map(keyMap => ({ value: keyMap, label: keyMap + '' }))}
            selectedOption={{ value: fontSize }}
            onChange={({ value }) => onChange?.({ fontSize: value })}
          />
        </div>
      </div>
    </Modal>
  );
};
