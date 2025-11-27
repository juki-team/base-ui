export function ThemeColorPalette() {
  return (
    <div className="jk-row gap jk-pg">
      {[ 'light', 'dark' ].map((theme) => (
        <div
          className={'jk-pg-lg jk-col gap jk-theme-' + theme}
          style={{ backgroundColor: 'var(--cr-we)' }}
        >
          <h3>Theme {theme}</h3>
          <div className="jk-row color-cells">
            <div style={{ backgroundColor: 'var(--base-white)' }} />
            <div style={{ backgroundColor: 'var(--base-black)' }} />
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-primary-light">light</div>
            <div className="appearance-primary">primary</div>
            <div className="appearance-primary-dark">dark</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-accent-light">light</div>
            <div className="appearance-accent">accent</div>
            <div className="appearance-accent-dark">dark</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-info-light">light</div>
            <div className="appearance-info">info</div>
            <div className="appearance-info-dark">dark</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-success-light">light</div>
            <div className="appearance-success">success</div>
            <div className="appearance-success-dark">dark</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-warning-light">light</div>
            <div className="appearance-warning">warning</div>
            <div className="appearance-warning-dark">dark</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-error-light">light</div>
            <div className="appearance-error">error</div>
            <div className="appearance-error-dark">dark</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-gray-1">gray-1</div>
            <div className="appearance-gray-2">gray-2</div>
            <div className="appearance-gray-3">gray-3</div>
          </div>
          <div className="jk-row color-cells">
            <div className="appearance-gray-4">gray-4</div>
            <div className="appearance-gray-5">gray-5</div>
            <div className="appearance-gray-6">gray-6</div>
          </div>
          <div className="jk-row color-cells with-labels">
            <div style={{ backgroundColor: 'var(--cr-ht-lt)' }}>
              <div>light</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-ht)' }}>
              <div>highlight</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-ht-dark)' }}>
              <div>dark</div>
            </div>
          </div>
          <div className="jk-row color-cells with-labels">
            <div style={{ backgroundColor: 'var(--cr-sw--lt)' }}>
              <div>light</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-sw)' }}>
              <div>shadow</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-sw-dark)' }}>
              <div>dark</div>
            </div>
          </div>
          <div className="jk-row color-cells with-labels">
            <div style={{ backgroundColor: 'var(--cr-gw)' }}>
              <div>glow</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-gy)' }}>
              <div>gray</div>
            </div>
          </div>
          <div className="jk-row color-cells with-labels">
            <div style={{ backgroundColor: 'var(--cr-bk)' }}>
              <div>black</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-bk-light)' }}>
              <div>light</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-bk-lightest)' }}>
              <div>lightest</div>
            </div>
          </div>
          <div className="jk-row color-cells with-labels">
            <div style={{ backgroundColor: 'var(--cr-we)' }}>
              <div>white</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-we-dark)' }}>
              <div>dark</div>
            </div>
            <div style={{ backgroundColor: 'var(--cr-we-darkest)' }}>
              <div>darkest</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
