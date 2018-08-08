import React, { Component } from 'react';

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
     this.setState({
       currenttime: this.state.currenttime-1
     });
   }
   else{
      clearInterval(this.timerInterval);
   }

   }
  render() {
    return( <div  className="App-infotext">
    <p>
    <b>{this.props.Content[this.props.Mode-1][0]}</b>
    </p>
    <p>
     {this.props.Content[this.props.Mode-1][1]}
    </p>
    <button onClick={this.props.Cancel} className="App-button">Cancel</button>
    {(this.state.currenttime>0)? <p className="App-timer">{this.state.currenttime}</p>: null}
    {(this.state.currenttime===0)? <button onClick={this.props.nextMode} className="App-button">Next</button> : null}
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
         <button onClick={this.props.editMode} className="App-button">Edit</button>
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
class Edit extends Component {
  render() {
  return(
    <form className="App-infotext" onSubmit={this.props.editTime}>
    <label>{this.props.Content[0][0]} time (in seconds): </label>
    <input type="number" name="0" min="0" value={this.props.newTime[0]} onChange={this.props.handleChange} className="App-input" /><br/>
    <label>{this.props.Content[1][0]} time (in seconds): </label>
    <input type="number" name="1" min="0" value={this.props.newTime[1]}  onChange={this.props.handleChange} className="App-input" /><br/>
    <label>{this.props.Content[3][0]} time (in seconds): </label>
    <input type="number" name="3" min="0" value={this.props.newTime[3]}  onChange={this.props.handleChange} className="App-input" /><br/><br/>
    <button onClick={this.props.cancelEdit} type="button" className="App-button">Cancel</button>
    <button type="submit" value="Save" className="App-button">Save</button>

    </form>

  )
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
           "Pour in the remaining water (about 236g) and let sit until the timer is up.",
           60],
          ["Flip",
           "Screw in the fliter to your Aeropress and place your cup on top. Carefully flip the entire arrangement.", 0
           ],
          ["Plunge",
           "Firmly press down the plunger. You should take up the time remaining time on the timer before you hear the gentle hiss sound and you know your coffee is ready.",
           20],
          ["Done",
          "Your coffee is done, have a nice rest of your day.",0]
      ],
      newTime : [ 20, 60,0, 20],
      mode: 0
   }
  this.nextMode = this.nextMode.bind(this);
  this.editMode = this.editMode.bind(this);
  this.editTime = this.editTime.bind(this);
  this.cancelEdit = this.cancelEdit.bind(this);
  this.Cancel = this.Cancel.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("handleChange");
    var changeHandler = Object.assign({}, this.state.newTime);
    changeHandler[[event.target.name]] = event.target.value;
    this.setState({newTime : changeHandler});
  }
 editMode() {
   var edit = "edit";
   this.setState({mode:edit});
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
     else if(this.state.mode > 0){
       return this.renderPrime( );
     }
     else if(this.state.mode==="edit"){
       return this.renderEdit();
     }
   }
  editTime() {
    console.log("editTime");
    var newContent = Object.assign({}, this.state.content);
    newContent[0][2] = this.state.newTime[0];
    newContent[1][2] = this.state.newTime[1];
//    newContent[2][2] = this.state.newTime[2];
    newContent[3][2] = this.state.newTime[3];
   var newMode = 0;

    this.setState({ content : newContent, mode : newMode });
  }
  cancelEdit() {
    console.log("cancelEdit");
    var revertTime = Object.assign({}, this.state.newTime);
    revertTime[0] = this.state.content[0][2];
    revertTime[1] = this.state.content[1][2];
  //  revertTime[2] = this.state.content[2][2];
    revertTime[3] = this.state.content[3][2];
   var newMode = 0;

    this.setState({ newTime : revertTime, mode : newMode });
  }

  pageHeader() {
    return(
      <header className="App-header">
        <h1 className="App-title">Aeropress Timer</h1>
        <p className="App-intro">For the inverted brewing method</p>
      </header> )
    }

   renderInfo( ) {
   return(
     <div className="App">
       {this.pageHeader()}
       <Info editMode={this.editMode} nextMode={this.nextMode} Content = {this.state.content}></Info>
      </div>
     );
   }
   renderPrime() {
        return(
          <div className="App">
            {this.pageHeader()}
            <Step Cancel = {this.Cancel} nextMode={this.nextMode} Mode ={this.state.mode} Content = {this.state.content}></Step>
           </div>
          );
        }
  renderEdit() {
      return(
      <div className="App">
        {this.pageHeader()}
        <Edit editTime = {this.editTime} handleChange={this.handleChange} cancelEdit = {this.cancelEdit} newTime = {this.state.newTime} Content = {this.state.content}></Edit>
        </div>
      );

    }

}

export default App;
