import React from 'react';
// import { data } from '../../../util/token_data_util'
import {withFauxDOM} from 'react-faux-dom'

const CONTINENTS = [{title: "Antarctica"}, {title: "Asia"}, {title: "Africa"}, {title: "Australia"},
 {title:"Europe"}, {title: "North America"}, {title:"South America"}];

 const margin = {top: 20, right: 20, bottom: 30, left: 50};
 const width = 960 - margin.left - margin.right;
 const height = 500 - margin.top - margin.bottom;

class ProjectGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
    this.createNodes = this.createNodes.bind(this);
    this.simulation = this.simulation.bind(this);
    this.setUp = this.setUp.bind(this);
    // this.handleMousemove = this.handleMousemove.bind(this);
    // this.drawChart = this.drawChart.bind(this);
    this.createSVG = this.createSVG.bind(this);
  }

  componentDidMount(){
    this.props.fetchProjects().then(() => {
      this.setUp();
    })
  }

  setUp () {
    const nodesData = Object.keys(this.props.data).map(key => {
        return this.props.data[key]
      }).concat(CONTINENTS);

    const faux = this.props.connectFauxDOM('div', 'chart')
    const simulation = this.simulation(nodesData);
    const svg = this.createSVG(faux);
    const node = this.createNodes(svg, nodesData);

    // d3.select(faux)
    //   .append('div')
    //   .html('Hello World!')
    simulation.on('tick', () => this.tickActions(node));
    this.props.animateFauxDOM(800)
  }

  simulation (nodesData) {
    return d3.forceSimulation()
              .nodes(nodesData)
              .force("charge_force", d3.forceManyBody())
              .force("center_force", d3.forceCenter(width / 2, height / 2));
  }

  drawChart(){
    this.createNodes();
  }

  tickActions(node) {
    //update circle positions to reflect node updates on each tick of the simulation
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
  }


  createSVG(faux) {
    return d3.select(faux).append('svg')
      .classed('project-svg', true)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 700 500")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append('g');
  }

  createNodes(svg, nodesData) {
    return svg.attr("class", "nodes")
      .selectAll("circle")
      .data(nodesData)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "red");
  }

  render() {
    let data = '';
    if (this.props.data) {
      // debugger
      data = Object.keys(this.props.data).map(key => {
        const project = this.props.data[key];
        return <li key={project.id}>{project.title} {project.created_at}</li>;
      });
    }

    return (
      <div className='graph-container'>
        <div className="series content graph" id='project'>
          {this.props.chart}
        </div>
      </div>
    );
  }
}

ProjectGraph.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(ProjectGraph);
