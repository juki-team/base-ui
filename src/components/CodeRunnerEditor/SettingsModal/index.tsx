import React from 'react';
import { CODE_EDIT0R_TAB_SIZES, CODE_EDITOR_KEY_MAPS, CODE_EDITOR_THEMES } from '../../CodeEditor';
import { Select } from '../../Input';
import { Modal } from '../../Modal';
import { T } from '../../Translate';
import { SettingsModalProps } from '../types';

export const SettingsModal = ({ onClose, isOpen, onChange, theme, keyMap, tabSize }: SettingsModalProps) => {
  return (
    <Modal className="editor-settings-modal jk-pad" isOpen={isOpen} onClose={onClose} closeIcon>
      <div className="jk-pad jk-col stretch gap">
        <h6><T>code editor settings</T></h6>
        <div className="jk-row left gap">
          <label className="text-semi-bold text-sentence-case"><T>choose editor style</T>: </label>
          <Select
            options={CODE_EDITOR_THEMES.map(theme => ({ value: theme, label: theme }))}
            optionSelected={{ label: theme, value: theme }}
            onChange={({ value }) => onChange?.({ theme: value })}
          />
        </div>
        <div className="jk-row left gap">
          <label className="text-semi-bold text-sentence-case"><T>choose your editor key mapping</T>: </label>
          <Select
            options={CODE_EDITOR_KEY_MAPS.map(keyMap => ({ value: keyMap, label: keyMap }))}
            optionSelected={{ label: keyMap, value: keyMap }}
            onChange={({ value }) => onChange?.({ keyMap: value })}
          />
        </div>
        <div className="jk-row left gap">
          <label className="text-semi-bold text-sentence-case"><T>choose your tab size</T>: </label>
          <Select
            options={CODE_EDIT0R_TAB_SIZES.map(keyMap => ({ value: keyMap, label: keyMap + '' }))}
            optionSelected={{ label: tabSize + '', value: tabSize }}
            onChange={({ value }) => onChange?.({ tabSize: value })}
          />
        </div>
      </div>
    </Modal>
  );
};
