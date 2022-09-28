import React from 'react';
import { CODE_EDIT0R_FONT_SIZES, CODE_EDIT0R_TAB_SIZES, CODE_EDITOR_KEY_MAPS, CODE_EDITOR_THEMES } from '../../CodeEditor';
import { Select } from '../../Input';
import { Modal } from '../../Modal';
import { T } from '../../Translate';
import { SettingsModalProps } from '../types';

export const SettingsModal = ({ onClose, isOpen, onChange, theme, keyMap, tabSize, fontSize }: SettingsModalProps) => {
  return (
    <Modal className="editor-settings-modal jk-pad-lg" isOpen={isOpen} onClose={onClose} closeIcon>
      <div className="jk-pad-md jk-col stretch gap">
        <h6><T>code editor settings</T></h6>
        <div className="jk-row left gap">
          <label className="fw-bd tt-se"><T>choose editor style</T>: </label>
          <Select
            options={CODE_EDITOR_THEMES.map(theme => ({ value: theme, label: theme }))}
            selectedOption={{ value: theme }}
            onChange={({ value }) => onChange?.({ theme: value })}
          />
        </div>
        <div className="jk-row left gap">
          <label className="fw-bd tt-se"><T>choose your editor key mapping</T>: </label>
          <Select
            options={CODE_EDITOR_KEY_MAPS.map(keyMap => ({ value: keyMap, label: keyMap }))}
            selectedOption={{ value: keyMap }}
            onChange={({ value }) => onChange?.({ keyMap: value })}
          />
        </div>
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
