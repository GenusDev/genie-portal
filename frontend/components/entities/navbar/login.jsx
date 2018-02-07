import React from 'react';
import SessionFormContainer from '../../session/session_form_container';

class Login extends React.Component {

  render() {
    return (
      <div className="navbar-container">
        <div className= "navbar-left">
          <img className="gen-logo" src="https://res.cloudinary.com/genus-development/image/upload/v1506647349/GDCoin-01_evbflq.png" />
          <div className="genus-dev-dash">
            <div className="gen-dev">GENUS DEVELOPMENT</div>
            <div className="gen-dash">GENIE DASHBOARD</div>
          </div>
        </div>
        <div className="navbar-right nav-sign-in">
          <SessionFormContainer type="Log In"/>
          <SessionFormContainer type="Sign Up"/>
        </div>
      </div>
    );
  }
}

export default Login;
