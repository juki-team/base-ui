import { ContentResponseType } from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { useFetcher, useJukiRouter } from '../../../../hooks';
import { NewVersionAvailableModal } from './NewVersionAvailableModal';

export const NewVersionAvailableTrigger = ({ apiVersionUrl }: { apiVersionUrl: string }) => {
  
  const { reloadRoute } = useJukiRouter();
  const { data } = useFetcher<ContentResponseType<{ version: string }>>(
    apiVersionUrl,
    { revalidateOnFocus: true, revalidateOnReconnect: true, revalidateIfStale: true, revalidateOnMount: true },
  );
  const version = (data?.success && data.content.version) || '';
  const [ versions, setVersions ] = useState<string[]>([]);
  useEffect(() => {
    setVersions(prevState => [ version, ...prevState ]);
  }, [ version ]);
  const [ modal, setModal ] = useState(false);
  useEffect(() => {
    if (versions.length >= 2 && versions[0] && versions[1] && versions[0] !== versions[1]) {
      setModal(true);
    }
  }, [ versions ]);
  
  return (
    <NewVersionAvailableModal
      isOpen={modal}
      onClose={() => setModal(false)}
      previousVersion={versions[1]}
      newVersion={version}
      reload={reloadRoute}
    />
  );
};
