import { type DependencyList, useEffect } from 'react';

export function useDebounceEffect(fn: () => void, waitTime: number, deps: DependencyList) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps is a passthrough dependency list provided by the caller
  }, deps);
}
