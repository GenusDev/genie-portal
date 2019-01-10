import React from 'react';

<<<<<<< HEAD
const VotesViewCapitalRaisedRect = ({x, y, height, fill, opacity}) => (
	<rect 
		x={x} y={y} 
		width="100%" height={height} 
		fill={fill} opacity={opacity}></rect>
=======
const VotesViewCapitalRaisedRect = ({x, y, height, fill, setHoveredState, capitalRaised, capital, hovered}) => (
  <React.Fragment>
    <rect x={x} y={y} width="100%" height={height} fill={fill} opacity="0.5"
      onMouseOver={setHoveredState} onMouseLeave={setHoveredState}> </rect>

    { hovered && capital ? (
      <text x="90%" y="70%" className="votes-view-capital-raised-text-right">
        {`$ ${Number(capital/1000.0).toLocaleString()} k`}
        <tspan dy="1.4em" dx="-3.5em">
          capital raised
        </tspan>
      </text>
    ) :
    hovered && capitalRaised &&
     (
       <React.Fragment>
        <text x="95%" y="20%" className="votes-view-capital-raised-text-right">
          <tspan>
            capital being raised
          </tspan>
        </text>
        <text x="5%" y="20%" className="votes-view-capital-raised-text">
          <tspan>
            {`$ ${Number(capitalRaised/1000.0).toLocaleString()} k`}
          </tspan>
        </text>
    </React.Fragment>
      )

    }

  </React.Fragment>
>>>>>>> 2cdb73eada1919a92da315a9be6ff0ac0697ded9
);

export default VotesViewCapitalRaisedRect;
