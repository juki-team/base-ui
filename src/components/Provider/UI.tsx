import React, { createContext, CSSProperties, FC, PropsWithChildren, useCallback, useState } from 'react';
import { useOnline, usePageFocus, usePageVisibility, useViewPortSize } from '../../hooks';
import { NotificationProvider } from '../Notifications';

export type ViewPortSizeType = 'hg' | 'lg' | 'md' | 'sm';

export interface ImageCmpProps {
  src?: string,
  className?: string,
  alt: string,
  height: number,
  width: number,
  style?: CSSProperties,
}

const Image = ({ src, className, alt, style, width, height }: ImageCmpProps) => {
  return <img src={src} className={className} alt={alt} width={width} height={height} style={{ ...style, width, height }} />;
};

export interface UIComponentsContextInterface {
  Image: FC<ImageCmpProps>;
}

export interface UIRouterContextInterface {
  searchParams: URLSearchParams,
  appendSearchParam: (props: { name: string, value: string }) => void,
  deleteSearchParam: (props: { name: string, value?: string }) => void,
  setSearchParam: (props: { name: string, value: string | string[] }) => void,
}

export interface UIContextInterface {
  isOnline: boolean,
  isPageVisible: boolean,
  isPageFocus: boolean,
  viewPortSize: ViewPortSizeType,
  components: UIComponentsContextInterface,
  router: UIRouterContextInterface,
}

export const UIContext = createContext<UIContextInterface>({
  isOnline: true,
  isPageVisible: true,
  isPageFocus: true,
  viewPortSize: 'sm',
  components: { Image },
  router: {
    searchParams: new URLSearchParams(''),
    appendSearchParam: () => null,
    deleteSearchParam: () => null,
    setSearchParam: () => null,
  },
});

export interface JukiUIProvider {
  components?: Partial<UIComponentsContextInterface>,
  router?: UIRouterContextInterface,
}

const cloneURLSearchParams = (urlSearchParams: URLSearchParams) => {
  return new URLSearchParams(urlSearchParams.toString());
};

export const JukiUIProvider = ({ children, components, router }: PropsWithChildren<JukiUIProvider>) => {
  
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  const isOnline = useOnline();
  const viewPortSize = useViewPortSize();
  
  const [_searchParams, _setSearchParams] = useState<URLSearchParams>(new URLSearchParams(''));
  
  const setSearchParams = useCallback((newSearchParams: URLSearchParams) => {
    const newSearchParamsSorted = cloneURLSearchParams(newSearchParams);
    const searchParamsSorted = cloneURLSearchParams(_searchParams);
    newSearchParams.sort();
    searchParamsSorted.sort();
    if (newSearchParamsSorted.toString() !== searchParamsSorted.toString()) {
      _setSearchParams(newSearchParams);
    }
  }, [_searchParams]);
  
  const { Image: ImageCmp = Image } = components || { Image };
  
  const appendSearchParamFun = useCallback(({ name, value }: { name: string, value: string }) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    newSearchParams.append(name, value);
    setSearchParams(newSearchParams);
  }, [_searchParams, setSearchParams]);
  
  const deleteSearchParamFun = useCallback(({ name, value }: { name: string, value?: string }) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    const values = newSearchParams.getAll(name);
    newSearchParams.delete(name);
    if (value !== undefined) {
      for (const v of values) {
        if (v !== value) {
          newSearchParams.append(name, v);
        }
      }
    }
    setSearchParams(newSearchParams);
  }, [_searchParams, setSearchParams]);
  
  const setSearchParamFun = useCallback(({ name, value }: { name: string, value: string | string[] }) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    newSearchParams.delete(name);
    let values = [];
    if (typeof value === 'string') {
      values.push(value);
    } else {
      values = value;
    }
    for (const value of values) {
      newSearchParams.append(name, value);
    }
    setSearchParams(newSearchParams);
  }, [_searchParams, setSearchParams]);
  
  return (
    <UIContext.Provider
      value={{
        isOnline,
        isPageVisible,
        isPageFocus,
        viewPortSize,
        components: { Image: ImageCmp },
        router: router || {
          searchParams: _searchParams,
          appendSearchParam: appendSearchParamFun,
          deleteSearchParam: deleteSearchParamFun,
          setSearchParam: setSearchParamFun,
        },
      }}>
      < NotificationProvider>
        {children}
      </NotificationProvider>
    </UIContext.Provider>
  );
};
