import { useCallback, useEffect, useRef, useState } from 'react';
import { UseTriggerWrapperProps } from '../components';
import { isTrigger } from '../helpers';
import { BoundingClientRectType } from '../types';
import { useKeyPress, useOutsideAlerterAnd } from './custom';

export const useTriggerWrapper = ({
  triggerOn,
  triggerOff,
  triggerOnDelayInMs: { hover: hoverOnDelayInMs = 0, click: clickOnDelayInMs = 0 },
  triggerOffDelayInMs: { hover: hoverOffDelayInMs = 0, click: clickOffDelayInMs = 0, escape: escapeOffDelayInMs = 0 },
  visible,
  onVisibleChange,
  withOutsideAlerter,
}: UseTriggerWrapperProps) => {
  
  const timerIds = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const closeEventRef = useRef(false);
  const outsideAlerterRef1 = useRef<any>(null);
  const outsideAlerterRef2 = useRef<any>(null);
  const outsideAlerterRef3 = useRef<any>(null);
  const outsideAlerterRef4 = useRef<any>(null);
  const [isOpen, _setIsOpen] = useState(false);
  const [onMouseEnterCounter, setOnMouseEnterCounter] = useState(0);
  const openRef = useRef(isOpen);
  useEffect(() => {
    if (visible !== undefined) {
      _setIsOpen(visible);
      openRef.current = JSON.parse(JSON.stringify(visible));
    }
  }, [visible]);
  
  const clearTimers = () => {
    while (timerIds.current.length) {
      clearTimeout(timerIds.current.pop()!);
    }
  };
  
  const toggleSchedule = useCallback((value: boolean, delayInMs: number) => {
    const hoverToggleId = setTimeout(() => {
      if (visible === undefined) {
        _setIsOpen(value);
        openRef.current = value;
      } else {
        onVisibleChange?.(value);
      }
    }, delayInMs);
    timerIds.current.push(hoverToggleId);
  }, [onVisibleChange, visible]);
  
  const setOnVisible = useCallback((delay: number) => {
    clearTimers();
    toggleSchedule(true, delay);
  }, [toggleSchedule]);
  
  const setOffVisible = useCallback((delay: number) => {
    setOnMouseEnterCounter(0);
    clearTimers();
    toggleSchedule(false, delay);
  }, [toggleSchedule]);
  
  useKeyPress((event: KeyboardEvent) => {
    if (isOpen && event.code === 'Escape' && isTrigger(triggerOff, 'escape')) {
      setOffVisible(escapeOffDelayInMs);
      event.preventDefault();
    }
  });
  
  useOutsideAlerterAnd(() => {
    if (withOutsideAlerter && isOpen && (isTrigger(triggerOff, 'click') || isTrigger(triggerOff, 'hover'))) {
      setOffVisible(clickOffDelayInMs);
      closeEventRef.current = true;
      setTimeout(() => {
        closeEventRef.current = false;
      }, 400);
    }
  }, outsideAlerterRef1, outsideAlerterRef2, outsideAlerterRef3, outsideAlerterRef4);
  
  const [childBoundingClientRect, _setChildBoundingClientRect] = useState<BoundingClientRectType>({
    bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0,
  });
  
  useEffect(() => {
    if (isTrigger(triggerOff, 'hover') && onMouseEnterCounter <= 0) {
      setOffVisible(hoverOffDelayInMs);
    }
  }, [hoverOffDelayInMs, onMouseEnterCounter, setOffVisible, triggerOff]);
  
  const setBoundingClientRect = (newValue: BoundingClientRectType) => {
    if (JSON.stringify(newValue) !== JSON.stringify(childBoundingClientRect) && newValue?.width && newValue?.height) {
      _setChildBoundingClientRect(newValue);
    }
  };
  
  const childProps = ({
    props: {
      onClick = undefined,
      onMouseEnter = undefined,
      onMouseLeave = undefined,
    } = {},
  }: any) => ({
    ref: (e: any) => {
      setBoundingClientRect(e?.getBoundingClientRect()?.toJSON()); // valid on target too
    },
    onMouseEnter: (e: any) => {
      if (isTrigger(triggerOn, 'hover')) {
        setOnVisible(hoverOnDelayInMs);
        setOnMouseEnterCounter(prevState => prevState + 1);
      }
      onMouseEnter?.(e);
    },
    onMouseLeave: (e: any) => {
      if (isTrigger(triggerOff, 'hover')) {
        setOnMouseEnterCounter(prevState => prevState - 1);
      }
      onMouseLeave?.(e);
    },
    onClick: (e: any) => {
      if (!closeEventRef.current && isTrigger(triggerOn, 'click')) {
        if (isOpen) {
          setOffVisible(clickOffDelayInMs);
        } else {
          setOnVisible(clickOnDelayInMs);
        }
      }
      closeEventRef.current = false;
      onClick?.(e);
    },
  });
  
  const onMouseEnter = useCallback(() => {
    if (isTrigger(triggerOn, 'hover')) {
      setOnMouseEnterCounter(prevState => prevState + 1);
    }
  }, [triggerOn]);
  
  const onMouseLeave = useCallback(() => {
    if (isTrigger(triggerOn, 'hover')) {
      setOnMouseEnterCounter(prevState => prevState - 1);
    }
  }, [triggerOn]);
  
  return {
    isOpen,
    outsideAlerterRef1,
    outsideAlerterRef2,
    outsideAlerterRef3,
    outsideAlerterRef4,
    childProps,
    childBoundingClientRect,
    onMouseEnterCounter,
    setOnMouseEnterCounter,
    onMouseEnter,
    onMouseLeave,
    setOffVisible,
    setOnVisible,
  };
};

type NotUndefined<T> = T extends undefined ? never : T;

type F<T> = ((prevState: NotUndefined<T>) => NotUndefined<T>);

export const useHandleState = <T, >(
  defaultState: NotUndefined<T>,
  initialState: NotUndefined<T> | undefined,
  onChange?: (value: NotUndefined<T>) => void,
): [NotUndefined<T>, (value: NotUndefined<T> | F<T>) => void] => {
  const [state, _setState] = useState<NotUndefined<T>>(initialState || defaultState);
  useEffect(() => {
    if (initialState !== undefined) {
      _setState(initialState);
    }
  }, [initialState]);
  
  const setState = useCallback((value: NotUndefined<T> | F<T>) => {
    if (initialState === undefined || !onChange) {
      _setState(value);
    } else {
      if (typeof value === 'function') {
        onChange?.((value as F<T>)?.(state));
      } else {
        onChange?.(value as NotUndefined<T>);
      }
    }
  }, [initialState, onChange, state]);
  
  return [state, setState];
};
