import { CSSProperties } from 'react';
import { T } from '../../atoms';

export function ApplicationLoaderLayout() {
  return (
    <div className="expand-absolute pe-ne jk-col bc-pd">
      <h1 className="jk-row cr-pt" style={{ alignItems: 'baseline' }}>
        <T className="tt-se">loading application</T>&nbsp;
        <div
          className="dot-flashing"
          style={{
            '--dot-flashing-color': 'var(--cr-py-tx)',
            '--dot-flashing-color-light': 'var(--cr-pl)',
            '--dot-flashing-size': '10px',
          } as CSSProperties}
        />
      </h1>
    </div>
  );
}
