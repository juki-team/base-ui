import { usePageStore } from '../../../stores/page/usePageStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { T } from '../../atoms';
import { HomeIcon } from '../../server';

export function HomeLink() {
  
  const viewPortSize = usePageStore(store => store.viewPort.size);
  const { Link } = useUIStore(store => store.components);
  
  return (
    <Link href="/" className="link jk-row" key="home">
      <HomeIcon size="small" />
      {viewPortSize === 'lg' || viewPortSize === 'hg' && <>&nbsp;<T className="tt-se">home</T></>}
    </Link>
  );
}
