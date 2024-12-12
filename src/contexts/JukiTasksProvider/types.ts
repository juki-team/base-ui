import { SubmissionRunStatusMessageWebSocketResponseEventDTO } from '@juki-team/commons';

export type SocketSubmissions = { [key: string]: SubmissionRunStatusMessageWebSocketResponseEventDTO };

export type SubmissionToCheck = {
  id: string,
  problem: { name: string },
  contest?: { name: string, problemIndex: string },
};
