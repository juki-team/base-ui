import { ClientId, getParamsOfClientId, UserPresenceData } from '@juki-team/commons';
import { useEffect, useState } from 'react';
import { watchOrganizationPresence } from '../../stores/websocket/topicChannels';

export interface OrganizationPresenceMember {
  /** verified by Ably */
  clientId: ClientId;
  /** verified by Ably (part of the clientId) */
  sessionId: string;
  uiId: string;
  connectionId: string;
  /** sent by the client, informative */
  href: string;
  timestamp: number;
}

/**
 * Live presence of the clients (tabs) of the logged users of a organization.
 * Only for its user administrators: the API grants the channel, for anyone else the list stays empty.
 * The user of each member must be resolved by its `sessionId` through the API, never by the member data.
 */
export const useOrganizationPresence = (organizationKey: string | null | undefined) => {
  const [members, setMembers] = useState<OrganizationPresenceMember[]>([]);

  useEffect(() => {
    if (!organizationKey) {
      setMembers([]);
      return;
    }
    return watchOrganizationPresence(organizationKey, (presenceMembers) => {
      setMembers(
        presenceMembers.map((member) => {
          const { sessionId, uiId } = getParamsOfClientId(member.clientId as ClientId);
          const data = (member.data ?? {}) as Partial<UserPresenceData>;
          return {
            clientId: member.clientId as ClientId,
            sessionId,
            uiId,
            connectionId: member.connectionId,
            href: typeof data.href === 'string' ? data.href : '',
            timestamp: member.timestamp,
          };
        }),
      );
    });
  }, [organizationKey]);

  return members;
};
