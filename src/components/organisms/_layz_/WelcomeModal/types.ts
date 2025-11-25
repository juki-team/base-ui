export interface WelcomeModalProps {
  onSeeMyProfile: ((nickname: string) => Promise<void>) | ((nickname: string) => void),
}
