export const contestStateMap = {
  [[ true, false, false, false ].toString()]: { order: 0, label: 'past', color: 'gray-5' },
  [[ false, true, false, false ].toString()]: { order: 1, label: 'live', color: 'error' },
  [[ false, false, true, false ].toString()]: { order: 2, label: 'upcoming', color: 'success' },
  [[ false, false, false, true ].toString()]: { order: 3, label: 'endless', color: 'info' },
};
