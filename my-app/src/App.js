import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {

  state = {
    persons : [
      { name : "meet" ,age: 28},
      { name : "dhruv" ,age: 20},
      { name : "rajvi" ,age: 26}
    ],
    otherState : "SOmethign else"
  }

  switchNameHandler = (newName) => {
    // console.log("was clicked");
    // DONT DO THIS : this.state.persons[0].name = "Mete Thummar";
    this.setState({
      persons : [
        { name : newName ,age: 28},
        { name : "dhruv" ,age: 20},
        { name : "rajvi" ,age: 24}
  
      ]
    });
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons : [
        { name : "Meet" ,age: 28},
        { name : event.target.value ,age: 20},
        { name : "rajvi" ,age: 26}
  
      ]
    });
  }

  render(){

    const style = {
      backgroundColor : 'white',
      border : '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>New react App</h1>
        <p>This is new aPP</p>
        <button
          style={style}
        onClick={ () => this.switchNameHandler("Meet Thummar")}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} 
          click={this.switchNameHandler.bind(this, "Meetali")}
          changed={this.nameChangeHandler}
        > My Hobbies : Racing </Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
  
      </div>
    );
  }
}

// function App(props) {

//   const [ personsState, setPersonsState ] = useState({
//     persons : [
//           { name : "meet" ,age: 28},
//           { name : "dhruv" ,age: 20},
//           { name : "rajvi" ,age: 26}
//         ],
//     otherState : "SOmethign else"}
//   );

//   const switchNameHandler = () => {
//     // console.log("was clicked");
//     // DONT DO THIS : this.state.persons[0].name = "Mete Thummar";
//     setPersonsState({
//       persons : [
//         { name : "Meet Thummar" ,age: 28},
//         { name : "dhruv" ,age: 20},
//         { name : "rajvi" ,age: 24}
  
//       ]
//     });
//   }


//   return (
//     <div className="App">
//       <h1>New react App</h1>
//       <p>This is new aPP</p>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age} click={switchNameHandler}> My Hobbies : Racing </Person>
//       <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
  
//    </div>
//     // <div className="App">
//     //   <h1>New react App</h1>
//     //   <p>This is new aPP</p>
//     //   <button>Switch Name</button>
//     //   <Person name="Meet" age="27"/>
//     //   <Person name="Dhruve" age="22"> My Hobbies : Racing </Person>
//     //   <Person name="Rajvi" age="23"/>

//     // </div>
//   );
//   // return React.createElement('div', {App}, React.createElement('h1',null, 'New Native react app!!'));
// }

export default App;
