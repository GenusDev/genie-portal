import React from 'react';
import * as d3 from 'd3';

class DoomsdayClock extends React.Component{
  constructor(props){
    super(props);

    this.defineScale = this.defineScale.bind(this);
    this.createLine = this.createLine.bind(this);
    this.startGraph = this.startGraph.bind(this);
  }

  componentDidMount(){
    //init d3 data here
    lineChartData = {
   // {project: 'Genus', date: new Date('01-25-2015'), dateExp: new Date('09-25-2015')},
   // {project: 'coolGym', date: new Date('02-25-2015'), dateExp: new Date('10-25-2015')}
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
    // var lastProject = d3.max(data1, d => d.date);
    let lastProject = new Date('03-01-2015');
    let addedTime = (9 * 30) + (nonActiveTokens*6);
    // let sleepDate = new Date(lastProject);
    let sleepDate = new Date(lastProject.getTime() + addedTime * 86400000);
    let timeRangeMin = new Date(sleepDate.getTime() - (90 * 86400000)) ; // 4 month range

    console.log(timeRangeMin, sleepDate);

     var data4 = [
      {project: 'votes',   date: new Date('12-01-2015')},
      {project: 'votes',   date: new Date(sleepDate)}
    ];
  // create scales

    const xScale = d3.scaleTime()
                    .domain([timeRangeMin, sleepDate])
                    .range([0,width]);

    var extentDate = d3.extent(data, d => d.date);
    //make y-scale
    // const yScale = d3.scaleLinear().
    //                 .domain(extentDate)
    //                 .range([height,0]);

    // const yScale = d3.scaleThreshold()
    // .domain([0, 1])
    // .range(["red", "white", "green"]);

    const yScale = d3.scaleBand()
    .domain(['hammIn', 'Genus', 'coolGym', 'votes'])
    .range([50, height]);
    // console.log(yScale('hammIn'))
    console.log(xScale(sleepDate))
  // const xScale = d3.scaleTime().range([0, width])
  // const yScale = d3.scaleLinear().range([height, 0])

  // set domains on the scales
  // const timeDomain = d3.extent(data, d => d.date);
  // const tempMax = d3.max(data, d => d.high);
  // xScale.domain(timeDomain);
  // yScale.domain([0, tempMax]);

  // create and use line generator for high and low temperature
  const lineGenerator = d3.line()
      .x(d => xScale(d.date));
      // .y(d => yScale('hammIn'));

  return [
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale('hammIn'))(data1)
    },
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale('Genus'))(data2)
    },
    {
      fill: '#5DBCD2',
      path: lineGenerator.y(d => yScale('coolGym'))(data3)
    },
    {
      fill: '#f48f42',
      path: lineGenerator.y(d => yScale('votes'))(data4)
    }
  ]
}

  }

  // defineScale(startX, endX, startY, endY) {
  //   return d3.scaleLinear().domain([startX, endX]).range([startY, endY]);
  // }

  createLine(xScale, yScale) {
    return d3.line().x(d=>{ return xScale(d.x); }).y(d=>{ return yScale(d.y); });
  }

  startGraph() {
    const graphBase = d3.select("#doomsday-graph").append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", this.w)
      .attr("height", this.h);
    graphBase.append("rect")
      .attr("width", "95%")
      .attr("height", "100%")
      .attr("fill", "black");
    return graphBase;
  }

  render(){
    // sleepdate = (last project start + 9mon * 30) + (nonactiveTokens * 6)
    // Xscale = sleepdate - 2 months - probably wrong, speak to matt
    // Yscale = number of projects active at that time
    // votes coming from the right that add to the DoomsdayClock
    // down curve means when they die
    // make space between each project 30 pixel
    // need that 30 days til close line

    var width = 500;
    var height = 600;
    nonActiveTokens: 10000; // xscale
    var data = [
      {date: new Date('01-01-2015'), dateExp: new Date('09-01-2015')},
      {date: new Date('01-25-2015'), dateExp: new Date('09-25-2015')},
      {date: new Date('02-25-2015'), dateExp: new Date('10-25-2015')}
    ];

    // var min = d3.min(data, d => d.date);
    // let sleepDate = new Date(max + (9 * 30) + (nonActiveTokens * 6))
    var lastProject = d3.max(data, d => d.date);
    let sleepDate = new Date(lastProject.setTime( (lastProject.getTime() + (9*30) * 86400000) + ((nonActiveTokens * 6)) ));
    let timeRangeMin = new Date(sleepDate.setTime( (sleepDate.getTime() - (3*30) * 86400000);

    //make x-scale
    var xScale = d3.scaleTime()
                    .domain([timeRangeMin, sleepDate])
                    .range([0,width]);

    var extentDate = d3.extent(data, d => d.date);
    //make y-scale
    // definitely a discrete domain
    // range - continous range
    var yScale = d3.scaleLinear().
                    .domain(extentDate)
                    .range([height,0]);

    //make line connect
    const lineGenerator = d3.line().x(d => xScale(d.date))

    return(
      <div className='doomsday-graph'></div>
    )
  }
}
