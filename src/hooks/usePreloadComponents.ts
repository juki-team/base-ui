import { useEffect, useState } from 'react';
import { preloadAtoms, preloadMolecules, preloadOrganisms, preloadTemplates } from '../components';

export const usePreloadComponents = () => {
  
  const [ preloaders, setPreloaders ] = useState({
    atoms: false,
    molecules: false,
    organisms: false,
    templates: false,
  });
  
  useEffect(() => {
    preloadAtoms().then(() => {
      setPreloaders(state => ({ ...state, atoms: true }));
    });
    preloadMolecules().then(() => {
      setPreloaders(state => ({ ...state, molecules: true }));
    });
    preloadOrganisms().then(() => {
      setPreloaders(state => ({ ...state, organisms: true }));
    });
    preloadTemplates().then(() => {
      setPreloaders(state => ({ ...state, templates: true }));
    });
  }, []);
  
  return preloaders;
};
