import React from 'react';
import { CODE_EDIT0R_FONT_SIZES, CODE_EDIT0R_TAB_SIZES, Modal, Select, T } from '../../../index';
import { SettingsModalProps } from '../types';

export const SettingsModal = <T, >({ onClose, isOpen, onChange, tabSize, fontSize }: SettingsModalProps<T>) => {
  return (
    <Modal
      className="editor-settings-modal jk-pad-lg"
      isOpen={isOpen}
      onClose={onClose}
      closeIcon
      closeWhenClickOutside
    >
      <div className="jk-col stretch gap">
        <h3><T>code editor settings</T></h3>
        <div className="jk-row left gap">
          <label className="fw-bd tt-se"><T>choose your tab size</T>: </label>
          <Select
            options={CODE_EDIT0R_TAB_SIZES.map(keyMap => ({ value: keyMap, label: keyMap + '' }))}
            selectedOption={{ value: tabSize }}
            onChange={({ value }) => onChange?.({ tabSize: value })}
          />
        </div>
        <div className="jk-row left gap">
          <label className="fw-bd tt-se"><T>choose your font size</T>: </label>
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
