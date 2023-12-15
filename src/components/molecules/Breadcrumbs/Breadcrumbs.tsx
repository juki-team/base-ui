import React, { Children, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { NavigateNextIcon, Popover, WidthResizer } from '../../atoms';

export const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: ReactNode[] }) => {
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
    return [ breadcrumbs, reducedSize ]
  }, [ breadcrumbs, reducedSize ]);
  
  return (
    <>
      <WidthResizer targetRef={refBreadcrumb} unOverflow={unOverflow} onOverflow={onOverflow} trigger={trigger} />
      <div
        className="jk-row nowrap left extend jk-breadcrumb pad-left-right"
        ref={refBreadcrumb}
        style={{ overflow: 'auto' }}
      >
        {/*<ArrowRightIcon />*/}
        {/*<div className="separator">|</div>*/}
        {Children.toArray(startBreadcrumbs.map((breadcrumb, index) => {
          return (
            <>
              {/*{!!index && <div className="separator">/</div>}*/}
              {!!index && <NavigateNextIcon className="cr-g5" />}
              <div>{breadcrumb}</div>
            </>
          );
        }))}
        {!!middleBreadcrumbs.length && (
          <>
            {/*<div className="separator">/</div>*/}
            <NavigateNextIcon className="cr-g5" />
            <Popover
              content={
                <div>
                  {Children.toArray(middleBreadcrumbs.map((breadcrumb, index) => {
                    return (
                      <>
                        <div>{breadcrumb}</div>
                      </>
                    );
                  }))}
                </div>
              }
              triggerOn="click"
              placement="bottomLeft"
            >
              <div className="link">...</div>
            </Popover>
          </>
        )}
        {Children.toArray(endBreadcrumbs.map((breadcrumb) => {
          return (
            <>
              <div className="separator">/</div>
              <div>{breadcrumb}</div>
            </>
          );
        }))}
      </div>
    </>
  );
};
