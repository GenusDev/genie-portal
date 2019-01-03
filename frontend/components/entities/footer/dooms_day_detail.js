import React from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;

class DoomsDayDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {lineChartData: []};
    this.startGraph = this.startGraph.bind(this);
  }

  startGraph(){
    const graphBase = d3.select("#doomsday-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", width)
      .attr("height", height);
    return graphBase;
  }

  //not necessary if no interactions with the doomsday clock
  componentDidMount(){
    const graph = this.startGraph();
   // {project: 'Genus', date: new Date('01-25-2015'), dateExp: new Date('09-25-2015')},
   // {project: 'coolGym', date: new Date('02-25-2015'), dateExp: new Date('10-25-2015')}
  // todos - data passed in need to be organic - passed as props, do derive state from props
  // todos - function that takes the end date of one project and maps a line from that going down,               on the same day
  // CREATE XAXIS

  var data1 = [
      {project: 'hammIn', date: new Date('02-15-2015')},
      {project: 'hammIn', date: new Date('11-15-2015')}
    ];

  var data2 = [
      {project: 'Genus', date: new Date('02-20-2015')},
      {project: 'Genus', date: new Date('11-20-2015')}
    ];

  var data3 = [
      {project: 'coolGym', date: new Date('03-01-2015')},
      {project: 'coolGym', date: new Date('12-01-2015')}
    ];


    let nonActiveTokens = 5;
    let lastProject = new Date('03-01-2015');
    let addedTime = (9 * 30) + (nonActiveTokens*6);
    let sleepDate = new Date(lastProject.getTime() + addedTime * 86400000);
    let timeRangeMin = new Date(sleepDate.getTime() - (90 * 86400000)) ; // 4 month range

    console.log(timeRangeMin, sleepDate);

     var data4 = [
      {project: 'votes',   date: new Date('12-01-2015')},
      {project: 'votes',   date: new Date(sleepDate)}
    ];


    //needs to be derived from other data
    // vertical line creations, need to be done in a function
    var data5 = [
      {project: 'hammIn',  date: new Date('11-15-2015')},
      {project: 'Genus',   date: new Date('11-15-2015')}
    ];

    var data6 = [
      {project: 'Genus',  date: new Date('11-20-2015')},
      {project: 'coolGym',   date: new Date('11-20-2015')}
    ];
    var data7 = [
      {project: 'coolGym',  date: new Date('12-01-2015')},
      {project: 'votes',   date: new Date('12-01-2015')}
    ];

    var data8 = [
      {project: 'votes' ,  date: new Date(sleepDate)},
      {project: 'x-axis',  date: new Date(sleepDate)}
    ];

    //draw x-axis

    var data9 = [
      {project: 'x-axis', date: new Date(timeRangeMin)},
      {project: 'x-axis', date: new Date(sleepDate)}
    ];

    // create scales
    const xScale = d3.scaleTime()
                    .domain([timeRangeMin, sleepDate])
                    .range([0,width]);

    const yScale = d3.scaleBand()
    .domain(['hammIn', 'Genus', 'coolGym', 'votes', 'x-axis'])
    .range([50, 300]);
    console.log(yScale('x-axis'))

  // create and use line generator for high and low temperature
  const lineGenerator = d3.line()
      .x(d => xScale(d.date));

  const lineChartData = [
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale(d.project))(data1)
    },
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale(d.project))(data2)
    },
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale(d.project))(data3)
    },
    {
      fill: '#f48f42',
      path: lineGenerator.y(d => yScale('votes'))(data4)
    },
     {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale(d.project))(data5)
    },
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale(d.project))(data6)
    },
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale(d.project))(data7)
    },
    {
      fill: '#f48f42',
      path: lineGenerator.y(d => yScale(d.project))(data8)
    },
    {
      fill: '#003366',
      path: lineGenerator.y(d => yScale(d.project))(data9)
    }
  ];
  this.setState({lineChartData});
  lineChartData.map(d => {
    graph.append(<path d={d.path} fill={d.fill}/>)
  })
}

  render(){
    {console.log("state", this.state.lineChartData)}
    return (

      <div id='doomsday-graph'>
      </div>
    );
  }
}

export default DoomsDayDetail;
