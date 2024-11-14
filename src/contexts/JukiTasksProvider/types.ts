import { SocketEventSubmissionStatusResponseDTO } from '@juki-team/commons';

export type SocketSubmissions = { [key: string]: SocketEventSubmissionStatusResponseDTO };

export type SubmissionToCheck = {
  id: string,
  problem: { name: string },
  contest?: { name: string, problemIndex: string },
};
