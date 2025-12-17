import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGrid } from './';

const meta: Meta<typeof DataGrid> = {
  component: DataGrid,
  args: {},
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ height: 500, width: 500 }}>
      <DataGrid
        {...args}
        firstRowAsHeaders
        styles={[
          {},
          { bgcolor: '#1F4E7A', color: '#FFFFFF', font: { bold: true } }, // 0
          { font: { bold: true } }, // 1
          { bgcolor: '#B4EFCF' }, // 2
          { bgcolor: '#F7BCBC' }, // 3
          { color: '#CBCBCB' }, // 4
          { align: 'right' }, // 5
        ]}
        freeze="C4"
        autofilter={{ ref: 'A1:F7', filters: [] }}
        rows={{
          ...new Array(100).fill(1).map((_, i) => ({
            cells: {
              0: { text: i },
              1: { text: 'Tesla', style: i % 7 },
              2: { text: 'Volvo' },
              3: { text: 'Toyota' },
              4: { text: 'Ford' },
              5: { text: i % 3 },
              6: { text: i },
              7: { text: new Date(2025, 0, 1).getTime() },
            },
          })),
          0: {
            cells: {
              0: { text: 'head' },
              1: { text: 'Tesla' },
              2: { text: 'Volvo' },
              3: { text: 'Toyota' },
              4: { text: 'Ford' },
              5: { text: 'A' },
              6: { text: 'B' },
              7: { text: 'C' },
            },
          },
          // [ '2019', 10, 11, 12, 13, 14, 15, 16 ],
          // [ '2020', 20, 11, 14, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // [ '2021', 30, 15, 12, 13, 14, 15, 16 ],
          // ]
        }}
      />
    </div>
  ),
};
