import { useEffect, useState } from 'react';
import { preloadAtoms, preloadMolecules, preloadOrganisms, preloadTemplates } from '../components';
import {
  preloadAtomsIconsGoogle,
  preloadAtomsIconsSigns,
  preloadAtomsIconsSpecials,
  preloadAtomsImages,
} from '../components/atoms/server';

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
    preloadAtomsIconsGoogle().then(() => {
      setPreloaders(state => ({ ...state, atomsIconsGoogle: true }));
    });
    preloadAtomsIconsSigns().then(() => {
      setPreloaders(state => ({ ...state, atomsIconsSigns: true }));
    });
    preloadAtomsIconsSpecials().then(() => {
      setPreloaders(state => ({ ...state, atomsIconsSpecials: true }));
    });
    preloadAtomsImages().then(() => {
      setPreloaders(state => ({ ...state, atomsImages: true }));
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
