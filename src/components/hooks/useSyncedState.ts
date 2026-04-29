import { type Dispatch, type SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

const useDeepCompare = <T>(value: T): string => {
  return useMemo(() => {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }, [value]);
};

export const useSyncedState = <T>(externalValue: T, deps?: (string | number | boolean)[]): [T, Dispatch<SetStateAction<T>>] => {
  const [internalState, setInternalState] = useState<T>(externalValue);
  const externalValueStr = useDeepCompare(externalValue);
  const lastSyncedValueRef = useRef<string>(externalValueStr);

  // biome-ignore lint/correctness/useExhaustiveDependencies: sync is gated by externalValueStr (deep-compared); externalValue itself is read but only when the string changes
  useEffect(() => {
    if (externalValueStr !== lastSyncedValueRef.current) {
      setInternalState(externalValue);
      lastSyncedValueRef.current = externalValueStr;
    }
  }, [externalValueStr, ...(deps || [])]);

  return [internalState, setInternalState];
};
