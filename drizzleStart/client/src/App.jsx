import React, { Component } from 'react';
import ReadString from "./readString"
import SetString from "./setString"
import './App.css';

class App extends Component {

  state = {
    loading: true,
    drizzleState: null
  };

  componentDidMount(){
    const {drizzle} = this.props;

    this.unsubscribe = drizzle.store.subscribe(()=> {
      const drizzleState = drizzle.store.getState();
      if(drizzleState.drizzleStatus.initialized) {
        this.setState({loading:false, drizzleState })
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }


  render() {
    if(this.state.loading)return "Loading Drizzle.."
    return( <div className="App">
        <ReadString
        drizzle={this.props.drizzle}
        drizzleState = {this.props.drizzleState}
        />
        <SetString
        drizzle={this.props.drizzle}
        drizzleState = {this.state.drizzleState}
        />
    </div>)
  }
}

export default App;
