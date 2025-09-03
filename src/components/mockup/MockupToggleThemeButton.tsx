import React from 'react';
import { Button } from '../atoms';
import { InvertColorsIcon } from '../server';

export const MockupToggleThemeButton = () => {
  return (
    <div style={{ position: 'fixed', right: 0, bottom: 0, zIndex: 10000000, margin: 24 }}>
      <Button
        onClick={() => {
          if (document.body.classList.contains(`jk-theme-dark`)) {
            document.body.classList.remove(`jk-theme-dark`);
            document.body.classList.add(`jk-theme-light`);
          } else {
            document.body.classList.remove(`jk-theme-light`);
            document.body.classList.add(`jk-theme-dark`);
          }
        }}
        icon={<InvertColorsIcon />}
      />
    </div>
  );
};
