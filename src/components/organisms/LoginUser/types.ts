export interface LoginUserProps {
  collapsed: boolean,
  isVertical?: boolean,
  isHorizontal?: boolean,
  onSeeMyProfile: (() => Promise<void>) | (() => void),
  profileSelected?: boolean,
}
