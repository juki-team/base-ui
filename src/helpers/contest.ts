export const contestStateMap = {
  [[ true, false, false, false ].toString()]: { order: 0, label: 'past', bc: 'bc-g5' },
  [[ false, true, false, false ].toString()]: { order: 1, label: 'live', bc: 'bc-er' },
  [[ false, false, true, false ].toString()]: { order: 2, label: 'upcoming', bc: 'bc-ss' },
  [[ false, false, false, true ].toString()]: { order: 3, label: 'endless', bc: 'bc-io' },
};
