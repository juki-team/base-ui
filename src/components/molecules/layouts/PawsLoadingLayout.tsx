import React, { CSSProperties, memo, useId } from 'react';
import { useResizeDetector } from 'react-resize-detector';

const Icon = ({ height, width }: { height: number, width: number }) => (
  <svg
    height={height}
    width={width}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25.394 25.394"
    fill="currentColor"
    style={{ height, width }}
  >
    <g>
      <path
        fill="currentColor"
        d="M19.533,21.962c0,0.698-0.088,3.142-2.531,3.142c-1.309,0-1.92-2.182-4.798-2.182 c-1.919,0-1.571,0.784-5.147,0.784c-3.578,0-5.672-1.744-5.672-4.361c0-3.142,1.904-2.132,3.839-3.664 c2.095-1.658,1.92-2.967,4.538-2.967c2.18,0,3.398,2.981,4.885,3.577C16.828,17.163,19.533,20.13,19.533,21.962z M3.672,11.721 c0.057-1.491-0.574-2.754-1.778-2.754C0.631,8.967,0,10.23,0,11.261c0,1.435,0.803,2.811,1.894,2.811 C2.984,14.071,3.614,13.213,3.672,11.721z M12.734,10.344c1.09,0,2.524-2.007,2.581-3.499c0.058-1.492-0.114-3.039-1.319-3.039 c-1.262,0-3.04,1.892-3.04,3.441C10.956,8.681,11.645,10.344,12.734,10.344z M17.094,14.015c1.605,0,2.582-1.778,2.639-3.27 s-0.287-2.754-1.492-2.754c-1.949,0-2.925,1.894-2.925,3.442C15.316,12.867,16.004,14.015,17.094,14.015z M22.198,12.811 c-1.95,0-3.097,2.235-3.097,3.785c0,1.435,0.917,2.467,2.008,2.467c1.605,0,2.639-1.605,2.695-3.097 C23.861,14.473,23.402,12.811,22.198,12.811z M6.712,10.86c1.09,0,1.95-0.802,1.95-2.295c0-2.523,1.146-5.047-0.057-5.047 c-2.41,0-3.787,3.498-3.787,4.531C4.818,9.484,5.621,10.86,6.712,10.86z M2.053,8.109C2.387,8.2,2.699,8.369,2.69,7.897 C2.675,7.16,2.751,5.957,2.387,5.926C2.17,5.909,1.563,7.173,1.389,7.801C1.227,8.398,1.668,8.005,2.053,8.109z M8.846,2.325 C9.211,2.436,9.55,2.624,9.571,2.177C9.607,1.478,9.776,0.348,9.372,0.29C9.134,0.255,8.367,1.398,8.129,1.977 C7.906,2.528,8.425,2.192,8.846,2.325z M15.312,2.739c0.334,0.091,0.653,0.26,0.638-0.213c-0.03-0.849-0.09-2.026-0.453-2.057 c-0.216-0.018-0.703,1.064-0.876,1.692C14.458,2.759,14.928,2.634,15.312,2.739z M20.641,5.998 c0.334,0.092,0.654,0.261,0.637-0.212c-0.029-0.849-0.23-2.438-0.594-2.467c-0.216-0.018-0.537,1.245-0.795,1.928 C19.671,5.825,20.257,5.894,20.641,5.998z M24.822,9.556c-0.216-0.018-0.559,0.865-0.732,1.494 c-0.162,0.597,0.281,0.531,0.666,0.636c0.334,0.091,0.653,0.26,0.637-0.212C25.362,10.625,25.186,9.586,24.822,9.556z"
      />
    </g>
  </svg>
);

type Full<T> = {
  [P in keyof T]-?: T[P];
}

interface PathLoadingPawsProps extends Full<PawsLoadingLayoutProps> {
  step: number,
  totalSteps: number,
  N: number,
  H: number,
  W: number,
  delay: number,
  animationName: string,
  bottom: number | string,
}

export const PathLoadingPaws = memo(function A(props: PathLoadingPawsProps) {
  
  // const { step, totalSteps, N, H, W, delay, animationName, bottom, sec, size } = props;
  const { totalSteps, N, delay, animationName, bottom, sec, size, trace } = props;
  
  const children = [];
  for (let i = 0; i < N; i++) {
    const totalDelay = (N - i) * sec + delay;
    children.push(
      <div
        className="paw"
        style={{
          width: size,
          height: size,
          animation: `${animationName} ${(N + trace) * sec * totalSteps}s ${totalDelay}s ease-in-out infinite`,
        }}
      >
        <Icon height={size} width={size} />
      </div>,
    );
  }
  // const direction = step % 2 ? -1 : 1;
  // const ang = direction * (Math.asin(H / Math.sqrt(H * H + W * W)) - Math.PI / 2);
  const ang = Math.PI / 2; // 1
  
  return (
    <div className="jk-loader-layout-container" style={{ bottom }}>
      <div
        className="jk-loader-layout-paws"
        style={{ width: 56, '--paws-rotate': `${ang}rad` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
});

interface PawsLoadingLayoutProps {
  sec?: number,
  size?: number,
  trace?: number
}

export const PawsLoadingLayout = memo(function PawsLoadingLayoutCmp(props: PawsLoadingLayoutProps) {
  
  // const { sec = 0.1, size = 36, trace = 14 } = props;
  const { sec = 0.25, size = 18, trace = 4 } = props; // 1
  
  const id = useId().split(':').join('');
  const { width = 0, height = 0, ref } = useResizeDetector();
  const animationName = `pawAnimation${id}`;
  // const totalSteps = Math.max(1, Math.floor(height / (size * 6)) - 1) * 2;
  const totalSteps = 1; // 1
  const H = height / (1 + (totalSteps) * 10);
  //const H = 1;
  // const W = width - size * 2;
  const W = Math.min(width - size * 2, 200); // 1
  // const W = 200;
  const N = W / size;
  const children = [];
  for (let i = 0; i < totalSteps; i++) {
    children.push(
      <PathLoadingPaws
        sec={sec}
        size={size}
        trace={trace}
        N={N}
        H={H * 4}
        W={W}
        step={i + 1}
        totalSteps={totalSteps}
        delay={N * sec * i}
        animationName={animationName}
        bottom={totalSteps === 1 ? '50%' : (6 + i * 10) * H - (i % 2 ? 0 : 0)}
      />,
    );
  }
  return (
    <div className="jk-loader-layout" ref={ref}>
      <style>
        {`
  @keyframes ${animationName} {
    0% {
      opacity: 1;
    }
    ${Math.round((100 / N) * trace) / totalSteps}% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }`}
      </style>
      {children}
    </div>
  );
});

export const JukiLoadingLayout = PawsLoadingLayout;
