import type { ContentResponse } from '@juki-team/commons/types';
import { useEffect, useRef, useState } from 'react';
import { useFetcher } from '../../hooks/useFetcher';
import { NewVersionAvailableModal } from './NewVersionAvailableModal/NewVersionAvailableModal';
import type { NewVersionAvailableProps } from './types';

export function NewVersionAvailable({ apiVersionUrl }: NewVersionAvailableProps) {
  const { data } = useFetcher<ContentResponse<{ version: string }>>(apiVersionUrl, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    revalidateOnMount: true,
  });
  const version = (data?.success && data.content.version) || '';
  const previousVersionRef = useRef('');
  const [previousVersionForModal, setPreviousVersionForModal] = useState('0.0.0');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!version) return;
    if (previousVersionRef.current && previousVersionRef.current !== version) {
      setPreviousVersionForModal(previousVersionRef.current);
      setModal(true);
    }
    previousVersionRef.current = version;
  }, [version]);

  return (
    <NewVersionAvailableModal
      isOpen={modal}
      onClose={() => setModal(false)}
      previousVersion={previousVersionForModal}
      newVersion={version}
      reload={() => window?.location?.reload?.()}
    />
  );
}
