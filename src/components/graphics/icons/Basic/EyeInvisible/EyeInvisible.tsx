import React, { memo } from 'react';
import { arcS, M, Segment } from '../../../utils';
import { RootIconProps } from '../../types';

const Eye = memo(({ width, color }: RootIconProps) => (
  <>
    <path
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      d={[M({ x: 4, y: 12 }), arcS({ x: 5, y: 12 }, { x: 20, y: 12 }, 0.35)].join(' ')}
    />
    <Segment start={{ x: 12, y: 15 }} end={{ x: 12, y: 19.1 }} options={{ width }} fill={color} />
    
    <Segment start={{ x: 12 + 2.5, y: 14.5 }} end={{ x: 12 + 4, y: 18.4 }} options={{ width }} fill={color} />
    <Segment start={{ x: 12 + 4.8, y: 13.5 }} end={{ x: 12 + 7.5, y: 16.4 }} options={{ width }} fill={color} />
    
    <Segment start={{ x: 12 - 2.5, y: 14.5 }} end={{ x: 12 - 4, y: 18.4 }} options={{ width }} fill={color} />
    <Segment start={{ x: 12 - 4.8, y: 13.5 }} end={{ x: 12 - 7.5, y: 16.4 }} options={{ width }} fill={color} />
  </>
));

// const Eye = memo(({ width, color }: RootIconProps) => (
//   <>
//     <path
//       fill="none"
//       stroke={color}
//       strokeWidth={width}
//       strokeLinecap="round"
//       d={[M({ x: 5, y: 12 }), arcS({ x: 5, y: 12 }, { x: 19, y: 12 }, 0.35)].join(' ')}
//     />
//     <Segment start={{ x: 12, y: 15 }} end={{ x: 12, y: 19.1 }} options={{ width }} fill={color} />
//
//     <Segment start={{ x: 12 + 2.2, y: 14.5 }} end={{ x: 12 + 4, y: 18.2 }} options={{ width }} fill={color} />
//     <Segment start={{ x: 12 + 4.6, y: 13.5 }} end={{ x: 12 + 7.2, y: 16.1 }} options={{ width }} fill={color} />
//
//     <Segment start={{ x: 12 - 2.2, y: 14.5 }} end={{ x: 12 - 4, y: 18.2 }} options={{ width }} fill={color} />
//     <Segment start={{ x: 12 - 4.6, y: 13.5 }} end={{ x: 12 - 7.2, y: 16.1 }} options={{ width }} fill={color} />
//   </>
// ));

//   return (
//     <>
//       <g
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           // d={[M({ x: 6, y: 12 }), arcS({ x: 6, y: 12 }, { x: 18, y: 12 }), arcS({ x: 18, y: 12 }, { x: 6, y: 12 }), 'Z'].join(' ')} />
//           strokeLinecap="round"
//           d={[M({ x: 6, y: 12 }), arcS({ x: 6, y: 12 }, { x: 18, y: 12 }, 0.4)].join(' ')} />
//         {/*<CirclePath center={{ x: 12, y: 12 }} radio={1.6} />*/}
//       </g>
//       {/*<Segment start={{ x: 17, y: 7 }} end={{ x: 7, y: 17 }} options={{ width: 2 }} />*/}
//       <Segment start={{ x: 12, y: 15.5 }} end={{ x: 12, y: 19.3 }} options={{ width: 2 }} />
//       {/*<Segment start={{ x: 12, y: 14 }} end={{ x: 16, y: 18 }} options={{ width: 2}} />*/}
//
//       <Segment start={{ x: 12 + 2, y: 15 }} end={{ x: 12 + 4, y: 18.3 }} options={{ width: 2 }} />
//       <Segment start={{ x: 12 + 4, y: 13.5 }} end={{ x: 12 + 7, y: 16.2 }} options={{ width: 2 }} />
//
//       <Segment start={{ x: 12 - 2, y: 15 }} end={{ x: 12 - 4, y: 18.3 }} options={{ width: 2 }} />
//       <Segment start={{ x: 12 - 4, y: 13.5 }} end={{ x: 12 - 7, y: 16.2 }} options={{ width: 2 }} />
//     </>
//   );
//
//   return (
//     <>
//       <g
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           // d={[M({ x: 6, y: 12 }), arcS({ x: 6, y: 12 }, { x: 18, y: 12 }), arcS({ x: 18, y: 12 }, { x: 6, y: 12 }), 'Z'].join(' ')} />
//           strokeLinecap="round"
//           d={[M({ x: 6, y: 12 }), arcS({ x: 6, y: 12 }, { x: 18, y: 12 }, 0.5)].join(' ')} />
//         {/*<CirclePath center={{ x: 12, y: 12 }} radio={1.6} />*/}
//       </g>
//       {/*<Segment start={{ x: 17, y: 7 }} end={{ x: 7, y: 17 }} options={{ width: 2 }} />*/}
//       <Segment start={{ x: 12, y: 16 }} end={{ x: 12, y: 19.3 }} options={{ width: 1.8 }} />
//       {/*<Segment start={{ x: 12, y: 14 }} end={{ x: 16, y: 18 }} options={{ width: 1.8 }} />*/}
//
//       <Segment start={{ x: 12 + 2.5, y: 16 }} end={{ x: 12 + 4, y: 18.5 }} options={{ width: 1.8 }} />
//       <Segment start={{ x: 12 + 4, y: 13.5 }} end={{ x: 12 + 7, y: 16.2 }} options={{ width: 1.8 }} />
//
//       <Segment start={{ x: 12 - 2.5, y: 16 }} end={{ x: 12 - 4, y: 18.5 }} options={{ width: 1.8 }} />
//       <Segment start={{ x: 12 - 4, y: 13.5 }} end={{ x: 12 - 7, y: 16.2 }} options={{ width: 1.8 }} />
//     </>
//   );
// });

export default Eye;
