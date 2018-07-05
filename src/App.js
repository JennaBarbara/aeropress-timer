import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      mode: "info",
      primetime:20,
      pourtime: 60,
      fliptime:10,
      plunge:20,
      currenttime: 20
    }
    this.Start = this.Start.bind(this);
  }
  componentDidMount() {
  var myVar = setInterval(
    () => this.tick(),
    1000
   );
  }
  tick() {
  if(this.state.currenttime>0){
    this.setState({
      currenttime: this.state.currenttime-1
    });
  }
  else clearInterval(this.myVar);
  }
  Start() {
    this.setState({mode:"prime"});
  }
  render() {
    if(this.state.mode=="info"){
      return this.renderInfo();
    }
    if(this.state.mode=="prime"){
      return this.renderPrime();
    }
  }

  renderPrime() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Aeropress Timer</h1>
          <p className="App-intro">
           For the inverted brewing method
          </p>
        </header>
        <div  className="App-infotext">
        <p>
        <b>Prime</b>
        </p>
        <p>
         Pour enough water to cover your grinds (about 34g) and stir until the timer is up.
        </p>
        <p>{this.state.currenttime}</p>
        </div>
        </div>
    );
  }


  renderInfo() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Aeropress Timer</h1>
          <p className="App-intro">
           For the inverted brewing method
          </p>
        </header>
        <div  className="App-infotext">
        <p>
         Before you start, prepare 17g of fine ground coffee and 270g of near-boiling water. Wet your paper filter to remove any "papery" flavour.
         Insert the plunger into the Aeropress and place it on a stable surface filter-side up. Add the coffee grounds into the Aeropress well.
        </p>
        <button onClick={this.Start} className="App-button">Start</button>
        <button className="App-button">Edit</button>
        <p>
        <b>Prime</b>
        </p>
        <p>
         Pour enough water to cover your grinds (about 34g) and stir until the timer is up.
        </p>
        <p>
        <b>Pour</b>
        </p>
        <p>
         Pour in the remaining water and let sit until the timer is up.
        </p>
        <p>
        <b>Flip</b>
        </p>
        <p>
        Screw in the fliter to your Aeropress and place your cup on top. Carefully flip the entire arrangement.
        </p>
        <p>
        <b>Plunge</b>
        </p>
        <p>
         Firmly press down the plunger. You should take up the time remaining time on the timer before you hear the gentle "hiss" sound and you know your coffee is ready.
        </p>
        <p>
        <b>Done</b>
        </p>
        <p>
        Your coffee is done, have a nice rest of your day.
        </p>
       </div>
      </div>
    );
  }
}


export default App;
