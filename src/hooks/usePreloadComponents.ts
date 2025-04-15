import { useEffect } from 'react';
import { preloadAtoms, preloadMolecules, preloadOrganisms, preloadTemplates } from '../components';
import {
  preloadAtomsIconsGoogle,
  preloadAtomsIconsSigns,
  preloadAtomsIconsSpecials,
  preloadAtomsImages,
} from '../components/atoms/server';

export const usePreloadComponents = () => {
  useEffect(() => {
    void preloadAtoms();
    void preloadMolecules();
    void preloadAtomsIconsGoogle();
    void preloadAtomsIconsSigns();
    void preloadAtomsIconsSpecials();
    void preloadAtomsImages();
    void preloadOrganisms();
    void preloadTemplates();
  }, []);
};
