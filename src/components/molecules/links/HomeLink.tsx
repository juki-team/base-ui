import { useJukiUI } from '../../../hooks/useJukiUI';
import { T } from '../../atoms';
import { HomeIcon } from '../../server';

export const HomeLink = () => {
  const { components: { Link } } = useJukiUI();
  return (
    <Link href="/" className="link jk-row" key="home">
      <HomeIcon size="small" />&nbsp;<T className="tt-se">home</T>
    </Link>
  );
};
