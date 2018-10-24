import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect,Line,Shape, Text } from 'react-konva';
import * as d3 from 'd3';


const ProjectThermo = function( {project,showText,toggleTextShowing} ) {
  const { current_capital,capital_required,start_date,close_date } = project;
  const percentCompleted = (current_capital*100) / capital_required;
  const rectWidth = 22;
  const rectHeigth = 110;
  const rectStartingX = 45;
  const rectStartingY = 55;

  const filledRectHeigth = ( percentCompleted/100 ) * rectHeigth;
  const filledRectStartingX = rectStartingX + 1;
  const filledRectStartingY = ( rectHeigth+rectStartingY ) - ( filledRectHeigth+1 );

  const lineStartX = (percentCompleted>90) ? 33 : (20+rectWidth);
  const veticalLineStartX = 190;
  const veticalLineStartY = 45;

  const timeNow = new Date();
  const formattedCloseDate = new Date(close_date);
  const formattedStartDate = new Date(start_date);
  const oneDay = 24*60*60*1000;
  const daysToClose = Math.round(Math.abs((formattedCloseDate.getTime() - timeNow.getTime())/(oneDay)));

  const jsonVotes = JSON.parse(project.votes);

  const xTimeScale = d3.scaleTime()
                   .domain([formattedStartDate,formattedCloseDate])
                   .range([rectStartingX + rectWidth + 60, rectStartingX + 130]).clamp(true);
  const yVoteScale = d3.scaleLinear()
                   .domain([ 1,d3.max(Object.values(jsonVotes)) ])
                   .range([rectHeigth+rectStartingY, filledRectStartingY]).clamp(true);

  const daysToCloseLineX = xTimeScale(timeNow);
  const voteXScale = d3.scaleTime()
                    .domain([formattedStartDate,formattedCloseDate])
                    .range([rectStartingX+rectWidth,daysToCloseLineX]).clamp(true);
  const sortedVotesByDate = Object.keys(jsonVotes).sort((a,b)=>{
    const date1 = new Date(a);
    const date2 = new Date(b);
    if(date1 < date2) return -1;
    else if (date1 > date2) return 1;
    else return 0;
  });

  return (
    <Stage width={200} height={200}
      >
      <Layer>
        <Line
          points={[15,55,190,55]}
          stroke={'white'}
          strokeWidth={1}
          />
        <Line
          points={[veticalLineStartX,veticalLineStartY,190,55]}
          stroke={'white'}
          strokeWidth={1}
          />
        <Line
          points={[lineStartX,filledRectStartingY,190,filledRectStartingY]}
          stroke={'#00FFFF'}
          strokeWidth={1.5}
          />
        <Line
          points={[daysToCloseLineX,55,daysToCloseLineX,160]}
          stroke={'#00FFFF'}
          strokeWidth={1.5}
          />
        <Text
          x={rectStartingX - 45}
          y={90}
          text={ current_capital + '\n' + 'raised' }
          fontSize={17}
          fontFamily={'open sans condensed'}
          fill={'#00FFFF'}
          strokeWidth={1}
          visible={showText}
          />
        <Text
          x={15}
          y={10}
          text={ 'Capital required' + '\n' + '$' + capital_required }
          fontSize={17}
          fontFamily={'open sans condensed'}
          fill={'white'}
          strokeWidth={1}
          visible={showText}
          />
        <Text
          x={veticalLineStartX-35}
          y={10}
          text={ 'close date' + '\n' + '18-10-25' }
          fontSize={13}
          fontFamily={'open sans condensed'}
          fill={'white'}
          strokeWidth={1}
          visible={showText}
          />
        <Text
          x={daysToCloseLineX - 5}
          y={168}
          text={ `${daysToClose} days \n till close` }
          fontSize={12}
          fontFamily={'open sans condensed'}
          fill={'#00FFFF'}
          strokeWidth={1}
          visible={showText}
          />
        <Rect
          x={ rectStartingX }
          y={ rectStartingY }
          width={ rectWidth }
          height={ rectHeigth }
          cornerRadius={9}
          stroke={'white'}
          strokeWidth={1}
          shadowBlur={5}
          />
        <Rect
          x={ filledRectStartingX }
          y={ filledRectStartingY }
          width={ rectWidth-2 }
          height={ filledRectHeigth }
          cornerRadius={9}
          shadowBlur={5}
          fill="black"
          opacity={0.8}
          />
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(daysToCloseLineX, filledRectStartingY);
              context.lineTo(rectStartingX - 1, filledRectStartingY);
              context.lineTo(rectStartingX - 1, rectHeigth+rectStartingY);
              context.lineTo(rectStartingX+rectWidth, rectHeigth+rectStartingY);
              let sumVotes = 0;
              sortedVotesByDate.forEach(date=>{
                const formattedDate = new Date(date);
                const x = voteXScale(formattedDate);
                sumVotes += jsonVotes[date];
                const y = yVoteScale(sumVotes);
                context.lineTo(x,y);
              });
              // context.closePath();
              context.fillStrokeShape(shape);
            }}
            fill="#00FFFF"
            strokeWidth={4}
            opacity={0.5}
            />
          <Rect
            x={ 0 }
            y={ 0 }
            width={ 200 }
            height={ 200 }
            onMouseEnter={(e)=>{toggleTextShowing();}}
            onMouseLeave={(e)=>{toggleTextShowing();}}
            />
      </Layer>
    </Stage>
  );
};
export default ProjectThermo;
