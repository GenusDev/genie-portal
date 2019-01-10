import { connect } from 'react-redux';
import ProjectForm from './project_form';
import {
  createProject,
  clearProjectErrors
} from '../../../../actions/project_actions';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    projects: state.entities.projects,
    errors: state.errors.project,
    crowdsaleInstance: state.network.crowdsaleInstance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project)),
    clearProjectErrors: () => dispatch(clearProjectErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);