import { usePageStore } from '../../../stores/page/usePageStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { T } from '../../atoms';
import { HomeIcon } from '../../server';

export function HomeLink() {
  
  const isLargeHugeScreen = usePageStore(store => store.viewPort.isLargeScreen || store.viewPort.isHugeScreen);
  const { Link } = useUIStore(store => store.components);
  
  return (
    <Link href="/" className="link jk-row" key="home">
      <HomeIcon size="small" />
      {isLargeHugeScreen && <>&nbsp;<T className="tt-se">home</T></>}
    </Link>
  );
}
