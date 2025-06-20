import { expect, within } from 'storybook/test';
import { PlayFunction } from 'storybook/internal/types';
import { waitFor } from 'storybook/test';

export const waitForLoadingToDisappear: PlayFunction = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(() => {
    expect(canvas.queryByText('loading user')).not.toBeInTheDocument();
  });
};
