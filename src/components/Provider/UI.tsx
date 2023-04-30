import React, {
  createContext,
  CSSProperties,
  FC,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { UrlObject } from 'url';
import { useOnline, usePageFocus, usePageVisibility, useViewPortSize } from '../../hooks';
import { NotificationProvider } from '../Notifications';

export type ViewPortSizeType = 'hg' | 'lg' | 'md' | 'sm' | '';

export interface ImageCmpProps {
  src?: string,
  className?: string,
  alt: string,
  height: number,
  width: number,
  style?: CSSProperties,
}

const Image = ({ src, className, alt, style, width, height }: ImageCmpProps) => {
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      width={width}
      height={height}
      style={{ ...style, width, height }}
    />
  );
};

type Url = string | UrlObject;

export interface LinkCmpProps {
  href: Url,
  target?: HTMLAttributeAnchorTarget,
  rel?: string,
  as?: Url,
  replace?: boolean,
  locale?: string | false,
  className?: string,
  style?: CSSProperties,
}

const Link = ({
  href,
  replace,
  locale,
  as,
  children,
  className,
  style,
  target,
  rel,
}: PropsWithChildren<LinkCmpProps>) => {
  
  let url = '';
  if (typeof href === 'string') {
    url = href;
  } else {
    url = href.href || '';
  }
  
  return (
    <a href={url} className={className} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
};

export interface UIComponentsContextInterface {
  Image: FC<ImageCmpProps>;
  Link: FC<PropsWithChildren<LinkCmpProps>>;
}

export type NextHistoryStateType = {
  url: string,
  as: string,
  options: { shallow?: boolean, locale?: string | false, scroll?: boolean, unstable_skipClientCache?: boolean },
}

export type BeforePopStateCallbackType = (state: NextHistoryStateType) => boolean;

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
  viewPortSize: '',
  components: { Image, Link },
  router: {
    searchParams: new URLSearchParams(''),
    appendSearchParam: () => null,
    deleteSearchParam: () => null,
    setSearchParam: () => null,
  },
});

export interface JukiUIProviderProps {
  components?: Partial<UIComponentsContextInterface>,
  router?: UIRouterContextInterface,
}

const cloneURLSearchParams = (urlSearchParams: URLSearchParams) => {
  return new URLSearchParams(urlSearchParams.toString());
};

export const JukiUIProvider = ({ children, components, router }: PropsWithChildren<JukiUIProviderProps>) => {
  
  const isPageVisible = usePageVisibility();
  const isPageFocus = usePageFocus();
  const isOnline = useOnline();
  const viewPortSize = useViewPortSize();
  
  const [ _searchParams, _setSearchParams ] = useState<URLSearchParams>(new URLSearchParams(''));
  
  const setSearchParams = useCallback((newSearchParams: URLSearchParams) => {
    const newSearchParamsSorted = cloneURLSearchParams(newSearchParams);
    const searchParamsSorted = cloneURLSearchParams(_searchParams);
    newSearchParams.sort();
    searchParamsSorted.sort();
    if (newSearchParamsSorted.toString() !== searchParamsSorted.toString()) {
      _setSearchParams(newSearchParams);
    }
  }, [ _searchParams ]);
  
  const { Image: ImageCmp = Image, Link: LinkCmp = Link } = components || { Image, Link };
  
  const appendSearchParam = useCallback(({ name, value }: { name: string, value: string }) => {
    const newSearchParams = cloneURLSearchParams(_searchParams);
    newSearchParams.append(name, value);
    setSearchParams(newSearchParams);
  }, [ _searchParams, setSearchParams ]);
  
  const deleteSearchParam = useCallback(({ name, value }: { name: string, value?: string }) => {
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
  }, [ _searchParams, setSearchParams ]);
  
  const setSearchParam = useCallback(({ name, value }: { name: string, value: string | string[] }) => {
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
  }, [ _searchParams, setSearchParams ]);
  
  return (
    <UIContext.Provider
      value={{
        isOnline,
        isPageVisible,
        isPageFocus,
        viewPortSize,
        components: { Image: ImageCmp, Link: LinkCmp },
        router: router || {
          searchParams: _searchParams,
          appendSearchParam,
          deleteSearchParam,
          setSearchParam,
        },
      }}
    >
      < NotificationProvider>
        {children}
      </NotificationProvider>
    </UIContext.Provider>
  );
};
