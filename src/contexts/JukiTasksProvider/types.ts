import { SubmissionRunStatusWebSocketResponseEventDTO } from '@juki-team/commons';

export type SocketSubmissions = { [key: string]: SubmissionRunStatusWebSocketResponseEventDTO };

export type SubmissionToCheck = {
  id: string,
  problem: { name: string },
  contest?: { name: string, problemIndex: string, isFrozenTime: boolean, isQuietTime: boolean },
};
