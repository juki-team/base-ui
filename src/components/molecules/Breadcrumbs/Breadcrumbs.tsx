import { Children, Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { TriggerAction } from '../../../enums';
import { Popover } from '../../atoms';
import { useWidthResizer } from '../../hooks';
import { NavigateNextIcon } from '../../server';
import { HomeLink } from '../links/HomeLink';
import { BreadcrumbsProps } from './types';

export const Breadcrumbs = ({ breadcrumbs: initialBreadcrumbs, withoutHomeLink }: BreadcrumbsProps) => {
  
  const breadcrumbs = useMemo(() => {
    const result = [ ...initialBreadcrumbs ];
    if (!withoutHomeLink) {
      result.unshift(<HomeLink key="home" />);
    }
    return result;
  }, [ initialBreadcrumbs, withoutHomeLink ]);
  
  const breadcrumbsLength = breadcrumbs.length;
  const [ reducedSize, setReducedSize ] = useState(0);
  
  const truncated = !!reducedSize;
  const startLimit = 1;
  const startBreadcrumbs = truncated ? breadcrumbs.slice(0, startLimit) : breadcrumbs;
  const middleBreadcrumbs = truncated ? breadcrumbs.slice(startLimit, startLimit + reducedSize) : [];
  const endBreadcrumbs = truncated ? breadcrumbs.slice(-(breadcrumbsLength - reducedSize - startLimit)) : [];
  const refBreadcrumb = useRef(null);
  const onOverflow = useCallback(() => setReducedSize(prevState => Math.min(prevState + 1, breadcrumbsLength)), [ breadcrumbsLength ]);
  const unOverflow = useCallback(() => setReducedSize(prevState => Math.max(prevState - 1, 0)), []);
  
  const trigger = useMemo(() => {
    return [ breadcrumbs, reducedSize ];
  }, [ breadcrumbs, reducedSize ]);
  
  useWidthResizer({ targetRef: refBreadcrumb, unOverflow, onOverflow, trigger });
  
  return (
    <div
      className="jk-row nowrap left extend jk-breadcrumb"
      ref={refBreadcrumb}
      style={{ overflow: 'auto' }}
    >
      {/*<ArrowRightIcon />*/}
      {/*<div className="separator">|</div>*/}
      {Children.toArray(startBreadcrumbs.map((breadcrumb, index) => (
        <Fragment key={index}>
          {/*{!!index && <div className="separator">/</div>}*/}
          {!!index && <NavigateNextIcon className="cr-g5" />}
          <div className="jk-br-ie">{breadcrumb}</div>
        </Fragment>
      )))}
      {!!middleBreadcrumbs.length && (
        <>
          {/*<div className="separator">/</div>*/}
          <NavigateNextIcon className="cr-g5" />
          <Popover
            popoverClassName="bc-we jk-br-ie elevation-1"
            content={
              <div className="jk-pg-xsm">
                {Children.toArray(middleBreadcrumbs.map((breadcrumb, index) => (
                  <div key={index}>{breadcrumb}</div>
                )))}
              </div>
            }
            triggerOn={TriggerAction.CLICK}
            placement="bottom"
          >
            <div className="link">...</div>
          </Popover>
        </>
      )}
      {Children.toArray(endBreadcrumbs.map((breadcrumb, index) => (
        <Fragment key={index}>
          {/*<div className="separator">/</div>*/}
          <NavigateNextIcon className="cr-g5" />
          <div className="jk-br-ie">{breadcrumb}</div>
        </Fragment>
      )))}
    </div>
  );
};
