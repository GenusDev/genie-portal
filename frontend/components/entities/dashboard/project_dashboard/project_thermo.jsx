import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line, Text } from 'react-konva';

const ProjectThermo = function( {project} ) {
  debugger
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Line
          points={[35,27,157,27]}
          stroke={'white'}
          strokeWidth={2}
          />
        <Rect
          x={20}
          y={20}
          width={20}
          height={110}
          cornerRadius={9}
          fill={'black'}
          stroke={'white'}
          strokeWidth={1}
          shadowBlur={5}
          />
        <Rect
          x={21}
          y={20}
          width={18}
          height={109}
          cornerRadius={9}
          fill={'#223562'}
          shadowBlur={5}
          />
      </Layer>
    </Stage>
  );
};

// class ProjectThermo extends React.Component {
//
//   render() {
//     return (
//       <Stage width={200} height={200}>
//         <Layer>
//           <Line
//             points={[35,27,157,27]}
//             stroke={'white'}
//             strokeWidth={2}
//             />
//           <Rect
//             x={20}
//             y={20}
//             width={20}
//             height={110}
//             cornerRadius={9}
//             fill={'black'}
//             stroke={'white'}
//             strokeWidth={1}
//             shadowBlur={5}
//             />
//           <Rect
//             x={21}
//             y={20}
//             width={18}
//             height={109}
//             cornerRadius={9}
//             fill={'#223562'}
//             shadowBlur={5}
//             />
//         </Layer>
//       </Stage>
//     );
//   }
// }
// fill={'#223562'}
// fillLinearGradientEndPointX={20}
// fillLinearGradientEndPointY={65}
// fillLinearGradientColorStops={[0, 'black', 1, '#223562']}
export default ProjectThermo;
