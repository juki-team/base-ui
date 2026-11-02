import { Annotation, EditorState, type Extension, StateEffect } from '@codemirror/state';
import { EditorView, type ViewUpdate } from '@codemirror/view';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDefaultExtensions } from './getDefaultExtensions';
import { getScheduler, TimeoutLatch } from './timeoutLatch';
import { EditorStateCache, ReactCodeMirrorProps } from './types';
import { getStatistics } from './utils';

export const ExternalChange = Annotation.define<boolean>();
const TYPING_TIMOUT = 200; // ms

export interface UseCodeMirror extends ReactCodeMirrorProps {
  container?: HTMLDivElement | null;
}

const emptyExtensions: Extension[] = [];

export function useCodeMirror(props: UseCodeMirror) {
  const {
    value,
    selection,
    onChange,
    onStatistics,
    onCreateEditor,
    onUpdate,
    extensions = emptyExtensions,
    autoFocus,
    theme = 'light',
    height = null,
    minHeight = null,
    maxHeight = null,
    width = null,
    minWidth = null,
    maxWidth = null,
    placeholder: placeholderStr = '',
    editable = true,
    readOnly = false,
    indentWithTab: defaultIndentWithTab = true,
    basicSetup: defaultBasicSetup = true,
    root,
    initialState,
    documentKey,
    stateCache,
  } = props;
  const [ container, setContainer ] = useState<HTMLDivElement | null>();
  const [ view, setView ] = useState<EditorView>();
  const [ state, setState ] = useState<EditorState>();
  const typingLatch = useState<{ current: TimeoutLatch | null }>(() => ({ current: null }))[0];
  const pendingUpdate = useState<{ current: (() => void) | null }>(() => ({ current: null }))[0];
  // key of the document the view currently holds (not necessarily the latest prop until the swap effect runs)
  const documentKeyRef = useRef(documentKey);
  const stateCacheRef = useRef<EditorStateCache | undefined>(stateCache);
  stateCacheRef.current = stateCache;

  const cacheCurrentDocument = (currentView: EditorView, withScroll: boolean) => {
    const key = documentKeyRef.current;
    if (key === undefined || !stateCacheRef.current) {
      return;
    }
    let scroll = stateCacheRef.current.get(key)?.scroll ?? null;
    if (withScroll) {
      try {
        scroll = currentView.scrollSnapshot();
      } catch {
        // the DOM may already be detached (unmount): keep the last known scroll
      }
    }
    stateCacheRef.current.set(key, { state: currentView.state, scroll });
  };
  const defaultThemeOption = EditorView.theme({
    '&': {
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
    },
    '& .cm-scroller': {
      height: '100% !important',
    },
  });
  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (
      vu.docChanged &&
      typeof onChange === 'function' &&
      // Fix echoing of the remote changes:
      // If transaction is market as remote we don't have to call `onChange` handler again
      !vu.transactions.some((tr) => tr.annotation(ExternalChange))
    ) {
      if (typingLatch.current) {
        typingLatch.current.reset();
      } else {
        typingLatch.current = new TimeoutLatch(() => {
          if (pendingUpdate.current) {
            const forceUpdate = pendingUpdate.current;
            pendingUpdate.current = null;
            forceUpdate();
          }
          typingLatch.current = null;
        }, TYPING_TIMOUT);
        getScheduler().add(typingLatch.current);
      }
      
      const doc = vu.state.doc;
      const value = doc.toString();
      onChange(value, vu);
    }
    if (vu.docChanged || vu.selectionSet) {
      cacheCurrentDocument(vu.view, false); // keep the cache fresh so remounts restore the latest state
    }
    onStatistics && onStatistics(getStatistics(vu));
  });
  
  const defaultExtensions = getDefaultExtensions({
    theme,
    editable,
    readOnly,
    placeholder: placeholderStr,
    indentWithTab: defaultIndentWithTab,
    basicSetup: defaultBasicSetup,
  });
  
  let getExtensions = [ updateListener, defaultThemeOption, ...defaultExtensions ];
  
  if (onUpdate && typeof onUpdate === 'function') {
    getExtensions.push(EditorView.updateListener.of(onUpdate));
  }
  getExtensions = getExtensions.concat(extensions);
  const getExtensionsRef = useRef(getExtensions);
  getExtensionsRef.current = getExtensions;

  useLayoutEffect(() => {
    if (container && !state) {
      const config = {
        doc: value,
        selection,
        extensions: getExtensions,
      };
      // restore the document state (undo history, selection) from the cache when we have it: this is
      // what keeps the editor intact when the component remounts (e.g. toggling fullscreen)
      const cached = documentKey !== undefined ? stateCacheRef.current?.get(documentKey) : undefined;
      const stateCurrent = cached
        ? cached.state
        : initialState
          ? EditorState.fromJSON(initialState.json, config, initialState.fields)
          : EditorState.create(config);
      setState(stateCurrent);
      if (!view) {
        const viewCurrent = new EditorView({
          state: stateCurrent,
          parent: container,
          root,
        });
        if (cached) {
          // the cached state carries the extensions (listeners, theme...) of the previous instance
          viewCurrent.dispatch({
            effects: [ StateEffect.reconfigure.of(getExtensions), ...(cached.scroll ? [ cached.scroll ] : []) ],
          });
        }
        setView(viewCurrent);
        onCreateEditor && onCreateEditor(viewCurrent, stateCurrent);
      }
    }
    return () => {
      if (view) {
        setState(undefined);
        setView(undefined);
      }
    };
  }, [ container, state ]);

  // Swap documents: keep the outgoing one in the cache and load the incoming one (cached or fresh).
  useEffect(() => {
    const previousKey = documentKeyRef.current;
    if (!view || previousKey === documentKey) {
      documentKeyRef.current = documentKey;
      return;
    }
    const renames = stateCacheRef.current?.renames;
    if (previousKey !== undefined && documentKey !== undefined && renames?.get(previousKey) === documentKey) {
      renames.delete(previousKey);
      documentKeyRef.current = documentKey;
      cacheCurrentDocument(view, false);
      return;
    }
    // an external update pending for the previous document must not land on the new one
    if (typingLatch.current) {
      typingLatch.current.cancel();
      typingLatch.current = null;
    }
    pendingUpdate.current = null;
    cacheCurrentDocument(view, true);
    documentKeyRef.current = documentKey;
    const cached = documentKey !== undefined ? stateCacheRef.current?.get(documentKey) : undefined;
    if (cached) {
      view.setState(cached.state);
      view.dispatch({
        effects: [ StateEffect.reconfigure.of(getExtensionsRef.current), ...(cached.scroll ? [ cached.scroll ] : []) ],
      });
    } else {
      view.setState(EditorState.create({ doc: value ?? '', extensions: getExtensionsRef.current }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ documentKey, view ]);
  
  useEffect(() => {
    if (props.container) {
      setContainer(props.container);
    }
  }, [ props.container ]);
  
  useEffect(
    () => () => {
      if (view) {
        cacheCurrentDocument(view, true);
        view.destroy();
        setView(undefined);
      }
      if (typingLatch.current) {
        typingLatch.current.cancel();
        typingLatch.current = null;
      }
    },
    [ view ],
  );
  
  useEffect(() => {
    if (autoFocus && view) {
      view.focus();
    }
  }, [ autoFocus, view ]);
  
  useEffect(() => {
    if (view) {
      view.dispatch({ effects: StateEffect.reconfigure.of(getExtensions) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    theme,
    extensions,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    placeholderStr,
    editable,
    readOnly,
    defaultIndentWithTab,
    defaultBasicSetup,
    onChange,
    onUpdate,
  ]);
  
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    const currentValue = view ? view.state.doc.toString() : '';
    if (view && value !== currentValue) {
      const isTyping = typingLatch.current && !typingLatch.current.isDone;
      
      const forceUpdate = () => {
        if (view && value !== view.state.doc.toString()) {
          view.dispatch({
            changes: { from: 0, to: view.state.doc.toString().length, insert: value || '' },
            annotations: [ ExternalChange.of(true) ],
          });
        }
      };
      
      if (!isTyping) {
        forceUpdate();
      } else {
        pendingUpdate.current = forceUpdate;
      }
    }
  }, [ value, view ]);
  
  return { state, setState, view, setView, container, setContainer };
}
