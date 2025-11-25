import { useEffect, useState } from 'react';
import { preImportAtoms } from '../components/atoms/_lazy_';
import { preImportMolecules } from '../components/molecules/_lazy_';
import { preImportOrganisms } from '../components/organisms/_layz_';

export const usePreloadComponents = (timeout = 0) => {
  
  const [ preloaders, setPreloaders ] = useState({
    atoms: false,
    molecules: false,
    organisms: false,
    // templates: false,
  });
  
  useEffect(() => {
    const cb = async () => {
      await preImportAtoms();
      setPreloaders(state => ({ ...state, atoms: true }));
      await preImportMolecules();
      setPreloaders(state => ({ ...state, molecules: true }));
      await preImportOrganisms();
      setPreloaders(state => ({ ...state, organisms: true }));
      // preloadTemplates().then(() => {
      //   setPreloaders(state => ({ ...state, templates: true }));
      // });
    };
    const ref = setTimeout(cb, timeout);
    return () => {
      clearTimeout(ref);
    };
  }, [ timeout ]);
  
  return preloaders;
};
