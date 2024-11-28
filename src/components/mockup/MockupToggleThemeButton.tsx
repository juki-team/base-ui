import React from 'react';
import { Button, InvertColorsIcon } from '../atoms';

export const MockupToggleThemeButton = () => {
  return (
    <div style={{ position: 'absolute', right: 0, bottom: 10, zIndex: 10000000 }}>
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
