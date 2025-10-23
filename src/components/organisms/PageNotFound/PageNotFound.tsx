import { useUIStore } from '../../../stores/ui/useUIStore';
import { Button, T } from '../../atoms';
import { HomeIcon } from '../../server';
import type { PageNotFoundProps } from './types';

export function PageNotFound({ children, style }: PageNotFoundProps) {
  
  const { Link, Image } = useUIStore(store => store.components);
  
  return (
    <div className="jk-col gap extend center nowrap" style={style}>
      <div className="jk-row pn-re" style={{ height: '40%', width: '80%' }}>
        <Image
          alt="Juki surprised image"
          className="image-border"
          fill
          src="https://images.juki.pub/assets/juki-image-surprised.png"
        />
      </div>
      {children || (
        <>
          <h3><T className="tt-se ta-cr">page not found</T></h3>
          <p className="ta-cr">
            <T className="tt-se">the page does not exist or you do not have permissions to view it</T>
          </p>
          <Link href="/public">
            <Button size="small" icon={<HomeIcon />}><T>go to home page</T></Button>
          </Link>
        </>
      )}
    </div>
  );
}
