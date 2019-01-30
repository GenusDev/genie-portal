import React from 'react';

export function CloseButton (props){
  return <div className="black-close-modal-button close-modal-button"
    onClick={props.closeModal}>&times;</div>
}


export function Title (props){
  return (
    <div className="ft-modal-header-cont">
      <div className="ft-modal-header bylaws-header">
        {props.nameOfProject}
      </div>
    </div>)
}


export class SummaryAndPlan extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      summary: this.props.summary
    };

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  // TODO figure out how to submit div text based on which key is pressed (Enter)
  // TODO create indication of text being edited by highlighting outline of div and flashing save in small text in same color

  handleKeyPress(event){
    const { editProject, closeModal } = this.props;
    // event.preventDefault();
    if(event.charCode === 13){
      const project = this.state;
      editProject(project)();
      closeModal();
    }
  }

  render(){
    const { isInvestor, bus_plan_link,  } = this.props
    return (
      <div className="project-description">

        <div className="project-text">
          <textarea onKeyPress={this.handleKeyPress}
            onChange={(event)=> this.setState({summary: event.target.value})}
            disabled={isInvestor}
            className="project-summary"
            value={this.state.summary}/>
        </div>

        <div className="bus-plan-download">
          <a  target="_blank"
            rel="noopener noreferrer"
            href={ `${bus_plan_link}` }>
            <i className="fas fa-file-contract">
              <span>business plan</span>
            </i>
          </a>
        </div>

      </div>
    )

  }
}


export function IframeFor3dModel (props) {
  const componentToRender= !props.projectClicked.model_id ? <div></div> :
      <div className="iframe">
        <iframe id="iframe" src={ `${props.model_link}` }
                frameBorder="0"
                allowvr="yes"
                allow="vr; accelerometer; magnetometer; gyroscope;"
                allowFullScreen mozallowfullscreen="true"
                webkitallowfullscreen="true" >
        </iframe>
      </div>

  return componentToRender
}
