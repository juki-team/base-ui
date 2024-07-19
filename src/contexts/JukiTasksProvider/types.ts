import { SocketEventSubmissionResponseDTO } from '@juki-team/commons';

export type SocketSubmissions = { [key: string]: SocketEventSubmissionResponseDTO };

export type SubmissionToCheck = {
  id: string,
  problem: { name: string },
  contest?: { name: string, problemIndex: string },
};
