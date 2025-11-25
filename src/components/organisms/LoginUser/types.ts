export interface LoginUserProps {
  collapsed: boolean,
  isVertical?: boolean,
  isHorizontal?: boolean,
  onSeeMyProfile: ((nickname: string) => Promise<void>) | ((nickname: string) => void),
  profileSelected?: boolean,
}
