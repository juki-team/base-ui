import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M9 12.5h1v-2h1q.425 0 .713-.288Q12 9.925 12 9.5v-1q0-.425-.287-.713Q11.425 7.5 11 7.5H9Zm1-3v-1h1v1Zm3 3h2q.425 0 .713-.288.287-.287.287-.712v-3q0-.425-.287-.713Q15.425 7.5 15 7.5h-2Zm1-1v-3h1v3Zm3 1h1v-2h1v-1h-1v-1h1v-1h-2ZM8 18q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2ZM8 4v12V4Z"
    fill={color}
  />
);

export const PictureAsPdfIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'picture-as-pdf');
};
