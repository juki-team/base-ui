import { useEffect, useState } from 'react';
import { preloadAtoms } from '../components/atoms/index';
import { preloadMolecules } from '../components/molecules/index';
import { preloadOrganisms } from '../components/organisms/index';
import { preloadTemplates } from '../components/templates/index';

export const usePreloadComponents = () => {
  
  const [ preloaders, setPreloaders ] = useState({
    atoms: false,
    atomsIconsGoogle: false,
    atomsIconsSigns: false,
    atomsIconsSpecials: false,
    atomsImages: false,
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
