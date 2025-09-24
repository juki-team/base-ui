import { useJukiUI } from '../../../hooks';
import { Button, T } from '../../atoms';
import { HomeIcon, JukiSurprisedImage } from '../../server';
import { PageNotFoundProps } from './types';

export function PageNotFound({ children, style }: PageNotFoundProps) {
  
  const { components: { Link } } = useJukiUI();
  
  return (
    <div className="jk-col extend" style={style}>
      <div className="jk-col gap center">
        <div className="image-404"><JukiSurprisedImage /></div>
        {children || (
          <>
            <h3><T className="tt-se">page not found</T></h3>
            <p className="ta-cr">
              <T className="tt-se">the page does not exist or you do not have permissions to view it</T>
            </p>
            <Link href="/">
              <Button size="small" icon={<HomeIcon />}><T>go to home page</T></Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
