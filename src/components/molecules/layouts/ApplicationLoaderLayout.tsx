import { CSSProperties } from 'react';
import { T } from '../../atoms';

export function ApplicationLoaderLayout() {
  return (
    <div className="expand-absolute pe-ne jk-col bc-tx-ht">
      <h1 className="jk-row cr-tx-ht-it" style={{ alignItems: 'baseline' }}>
        <T className="tt-se">loading application</T>&nbsp;
        <div
          className="dot-flashing"
          style={{
            '--dot-flashing-color': 'var(--cr-tx-ht-it)',
            '--dot-flashing-color-light': 'var(--cr-tx-ht-lt)',
            '--dot-flashing-size': '10px',
          } as CSSProperties}
        />
      </h1>
    </div>
  );
}
