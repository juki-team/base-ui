import React from 'react';
import { CODE_EDIT0R_FONT_SIZES, CODE_EDIT0R_TAB_SIZES } from '../../CodeEditor';
import { Select } from '../../Input';
import { Modal } from '../../Modal';
import { T } from '../../Translate';
import { SettingsModalProps } from '../types';

export const SettingsModal = ({ onClose, isOpen, onChange, tabSize, fontSize }: SettingsModalProps) => {
  return (
    <Modal className="editor-settings-modal jk-pad-lg" isOpen={isOpen} onClose={onClose} closeIcon closeWhenClickOutside>
      <div className="jk-pad-md jk-col stretch gap">
        <h2><T>code editor settings</T></h2>
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
