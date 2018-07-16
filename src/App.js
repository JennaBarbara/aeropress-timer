import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class Step extends Component {

  constructor(props) {
  super(props);
  this.state = {
    currentMode: this.props.Mode,
    currenttime: this.props.Content[this.props.Mode-1][2]
  }
  this.tick = this.tick.bind(this);
}
   componentDidUpdate() {
     if(this.state.currentMode !== this.props.Mode){
       this.setState({currentMode:this.props.Mode,
                      currenttime: this.props.Content[this.props.Mode-1][2]});
       this.startTimer();
     }
   }

   componentDidMount() {
     this.startTimer();
  }
  startTimer(){
    this.timerInterval = setInterval(this.tick, 1000 );
  }
  tick(){
   if(this.state.currenttime>0){
     console.log("this.state.currenttime");
     this.setState({
       currenttime: this.state.currenttime-1
     });
   }
   else{
      clearInterval(this.timerInterval);
      console.log("clearInterval");
   }

   }
  render() {
    return( <div  className="App-infotext">
    <p>
    <b>{this.state.currenttime}</b>
    </p>
    <p>
    <b>{this.props.Content[this.props.Mode-1][0]}</b>
    </p>
    <p>
     {this.props.Content[this.props.Mode-1][1]}
    </p>
    {(this.state.currenttime==0)? <button onClick={this.props.nextMode} className="App-button">Next</button> : null}
    <button onClick={this.props.Cancel} className="App-button">Cancel</button>
    </div>
  );

  }
}

class Info extends Component {

  render() {
  return(   <div  className="App-infotext">
         <p>
          Before you start, prepare 17g of fine ground coffee and 270g of near-boiling water. Wet your paper filter to remove any "papery" flavour.
          Insert the plunger into the Aeropress and place it on a stable surface filter-side up. Add the coffee grounds into the Aeropress well.
         </p>
         <button onClick={this.props.nextMode} className="App-button">Start</button>
         <button className="App-button">Edit</button>
         <p>
         <b>{this.props.Content[0][0]}</b>
         </p>
         <p>
          {this.props.Content[0][1]}
         </p>
         <p>
         <b>{this.props.Content[1][0]}</b>
         </p>
         <p>
          {this.props.Content[1][1]}
         </p>
         <p>
         <b>{this.props.Content[2][0]}</b>
         </p>
         <p>
         {this.props.Content[2][1]}
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
   );

 }
}

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    content : [
          ["Prime",
           "Pour enough water to cover your grinds (about 34g) and stir until the timer is up.",
           20],
          ["Pour",
           "Pour in the remaining water and let sit until the timer is up.",
           60],
          ["Flip",
           "Screw in the fliter to your Aeropress and place your cup on top. Carefully flip the entire arrangement.",
           10],
          ["Plunge",
           "Firmly press down the plunger. You should take up the time remaining time on the timer before you hear the gentle hiss sound and you know your coffee is ready.",
           20],
          ["Done",
          "Your coffee is done, have a nice rest of your day."]
      ],
    mode: 0
   }
  this.nextMode = this.nextMode.bind(this);
  this.Cancel = this.Cancel.bind(this);
  }

  nextMode() {

    var next;
    if(this.state.mode === 5){
      next = 0;
    }
    else{
     next = this.state.mode+1;
    }
    this.setState({mode:next});
  }
  Cancel() {
    this.setState({mode:0});
  }
   render() {

     if(this.state.mode===0){
       return this.renderInfo( );
     }
     if(this.state.mode > 0){
       return this.renderPrime( );
     }
   }


   renderInfo( ) {
   return(
     <div className="App">
       <header className="App-header">
         <h1 className="App-title">Aeropress Timer</h1>
         <p className="App-intro">
          For the inverted brewing method
         </p>
       </header>
       <Info nextMode={this.nextMode} Content = {this.state.content}></Info>
      </div>
     );
   }
   renderPrime() {
        return(
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Aeropress Timer</h1>
              <p className="App-intro">
               Prime
              </p>
            </header>
            <Step Cancel = {this.Cancel} nextMode={this.nextMode} Mode ={this.state.mode} Content = {this.state.content}></Step>
           </div>
          );
        }

}

export default App;
