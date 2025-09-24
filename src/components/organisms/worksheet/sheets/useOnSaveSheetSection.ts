import { RefObject, useEffect } from 'react';
import { useStableRef } from '../../../hooks';

export const useOnSaveSheetSection = (sectionRef: RefObject<HTMLDivElement | null>, edit: boolean, onSave: () => void) => {
  
  const onSaveRef = useStableRef(onSave);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (edit && sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        onSaveRef.current();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ edit ]);
};
