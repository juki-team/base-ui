import React from 'react';
import { Button, InvertColorsIcon } from '../components';

export const ToggleThemeButton = () => {
  return (
    <div style={{ position: 'absolute', right: 0, bottom: 10, zIndex: 10000000 }}>
      <Button
        onClick={() => {
          if (document.documentElement.classList.contains(`jk-theme-dark`)) {
            document.documentElement.classList.remove(`jk-theme-dark`);
            document.documentElement.classList.add(`jk-theme-light`);
          } else {
            document.documentElement.classList.remove(`jk-theme-light`);
            document.documentElement.classList.add(`jk-theme-dark`);
          }
        }}
        icon={<InvertColorsIcon />}
      />
    </div>
  );
};
