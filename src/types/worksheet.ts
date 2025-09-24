import { WorksheetUserSubmissionsResponseDTO } from '@juki-team/commons';
import { KeyedMutator } from 'swr';

export type UserResultsType = {
  data?: WorksheetUserSubmissionsResponseDTO,
  isLoading?: boolean,
  validating?: boolean,
  mutate?: KeyedMutator<any>,
}
