// TODO: check appearance-* selectors
export function ThemeColorPalette() {
  return (
    <div className="jk-row gap jk-pg">
      {['light', 'dark'].map((theme) => (
        <div key={theme} className={'jk-pg-lg jk-col gap jk-theme-' + theme} style={{ backgroundColor: 'var(--cr-we)' }}>
          <h3>Theme {theme}</h3>
          <div className="jk-row color-cells">
            <div style={{ backgroundColor: 'var(--base-white)' }} />
            <div style={{ backgroundColor: 'var(--base-black)' }} />
          </div>
          <div className="jk-row color-cells">
            <div style={{ backgroundColor: 'var(--cr-at-lt)' }}>light</div>
            <div style={{ backgroundColor: 'var(--cr-at)' }}>error</div>
            <div style={{ backgroundColor: 'var(--cr-at-dk)' }}>dark</div>
          </div>
          <div className="jk-row color-cells">
            <div style={{ backgroundColor: 'var(--cr-ss-lt)' }}>light</div>
            <div style={{ backgroundColor: 'var(--cr-ss)' }}>error</div>
            <div style={{ backgroundColor: 'var(--cr-ss-dk)' }}>dark</div>
          </div>
          <div className="jk-row color-cells">
            <div style={{ backgroundColor: 'var(--cr-wg-lt)' }}>light</div>
            <div style={{ backgroundColor: 'var(--cr-wg)' }}>error</div>
            <div style={{ backgroundColor: 'var(--cr-wg-dk)' }}>dark</div>
          </div>
          <div className="jk-row color-cells">
            <div style={{ backgroundColor: 'var(--cr-er-lt)' }}>light</div>
            <div style={{ backgroundColor: 'var(--cr-er)' }}>error</div>
            <div style={{ backgroundColor: 'var(--cr-er-dk)' }}>dark</div>
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
          <div className="jk-row color-cells with-labels">
            <div style={{ backgroundColor: 'var(--bc-sf)' }}>
              <div>bc-sf</div>
            </div>
            <div style={{ backgroundColor: 'var(--bc-sf-md)' }}>
              <div>bc-sf-md</div>
            </div>
            <div style={{ backgroundColor: 'var(--bc-sf-hi)' }}>
              <div>bc-sf-hi</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
