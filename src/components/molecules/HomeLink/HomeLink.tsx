import { T } from '../../atoms';
import { useJukiUI } from '../../hooks/useJukiUI';
import { HomeIcon } from '../../server';

export function HomeLink() {
  const { components: { Link } } = useJukiUI();
  return (
    <Link href="/" className="link jk-row" key="home">
      <HomeIcon size="small" />&nbsp;<T className="tt-se">home</T>
    </Link>
  );
}
