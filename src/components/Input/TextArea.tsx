import React from 'react';

export const TextArea = ({ value, onChange }: { value: string, onChange?: (value: string) => void }) => {
  return (
    <textarea
      className="jk-input-textarea jk-border-radius-inline"
      value={value}
      onChange={({ target }) => onChange?.(target.value)}
      disabled={!onChange}
      rows={Math.max(value.split('\n').length, 2)}
    />
  );
};
