import { useEffect, useState } from 'react';
import { preImportAtoms } from '../components/atoms/_lazy_';
import { preImportMolecules } from '../components/molecules/_lazy_';
import { preImportOrganisms } from '../components/organisms/_layz_';

export const usePreloadComponents = () => {
  
  const [ preloaders, setPreloaders ] = useState({
    atoms: false,
    molecules: false,
    organisms: false,
    // templates: false,
  });
  
  useEffect(() => {
    preImportAtoms().then(() => {
      setPreloaders(state => ({ ...state, atoms: true }));
    });
    preImportMolecules().then(() => {
      setPreloaders(state => ({ ...state, molecules: true }));
    });
    preImportOrganisms().then(() => {
      setPreloaders(state => ({ ...state, organisms: true }));
    });
    // preloadTemplates().then(() => {
    //   setPreloaders(state => ({ ...state, templates: true }));
    // });
  }, []);
  
  return preloaders;
};
