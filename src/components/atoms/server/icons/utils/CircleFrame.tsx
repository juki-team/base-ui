interface CircleFrameProps {
  strokeWidth?: number,
  cx?: number,
  cy?: number,
  sizeBox?: number,
  filled?: boolean,
}

export const CircleFrame = ({
                              sizeBox = 24,
                              cx = sizeBox / 2,
                              cy = sizeBox / 2,
                              strokeWidth = 2,
                              filled,
                            }: CircleFrameProps) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={sizeBox / 2 - strokeWidth / 2}
      fill={filled ? 'currentColor' : 'none'}
      strokeWidth={strokeWidth}
      stroke="currentColor"
    />
  );
};
