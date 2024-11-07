import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';
import styled from 'styled-components';

const StyleButton = styled.button`
  background-color : ${props => props.alt  ? 'red' : 'green'};
  color : white;
  border : 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color : ${props => props.alt  ? 'salmon' : 'lightgreen'};
    color : black;
  }
`;

class App extends Component {

  state = {
    persons : [
      { id : 1, name : "meet" ,age: 28},
      { id : 2, name : "dhruv" ,age: 20},
      { id : 3, name : "rajvi" ,age: 26}
    ],
    otherState : "SOmethign else",
    showPerson : false
  }

  // switchNameHandler = (newName) => {
  //   // console.log("was clicked");
  //   // DONT DO THIS : this.state.persons[0].name = "Mete Thummar";
  //   this.setState({
  //     persons : [
  //       { name : newName ,age: 28},
  //       { name : "dhruv" ,age: 20},
  //       { name : "rajvi" ,age: 24}
  
  //     ]
  //   });
  // }

  deleteNameHandler = (personIndex) => {
    // const persons = this.state.persons; // this won't make copy of array so make copy of object
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons : persons});
  }

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id == id;
    });

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({
      persons : persons
    });
  }

  toggelePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({
      showPerson : !doesShow
    });
  }

  render(){

    // const style = {
    //   backgroundColor : 'green',
    //   color : 'white',
    //   border : '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover' : {
    //     backgroundColor : 'lightgreen',
    //     color : 'black'
    //   }
    // };

    let persons = null;
    if(this.state.showPerson) {
      persons = (
        <div>
          {
            this.state.persons.map((per,ind) => {
              return <Person 
              click={() => this.deleteNameHandler(ind)}
              name={per.name} 
              age={per.age} 
              key={per.id}
              changed={(event) => this.nameChangeHandler(event, per.id)}/>
            })
          }
      </div>
      );

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor : 'salmon',
      //   color : 'black'
      // }

    }

    let classes = [];

    if(this.state.persons.length <= 2){
      classes.push('red')
    }
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    return (
      // <StyleRoot>
        <div className="App">
          <h1>New react App</h1>
          <p className={classes.join(' ')}>This is new aPP</p>
          <StyleButton
            alt={this.state.showPerson}
            // style={style}
            onClick={ this.toggelePersonHandler}>Switch Name</StyleButton>
            
          {persons}
    
        </div>
      // </StyleRoot>
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

// export default Radium(App);
export default App;
