import React, { Component, useState } from 'react';
import './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/cockpit/cockpit';

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

  deleteNameHandler = (personIndex) => {
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

    let persons = null;
    if(this.state.showPerson) {
      persons = (
          <Persons 
          persons = {this.state.persons}
          clicked = {this.deleteNameHandler}
          changed = {this.nameChangeHandler} />
      );
    }

    return (
        <div className="App">
          <Cockpit 
          title={this.props.appTitle}
            showPerson={this.state.showPerson}
            persons = {this.state.persons} 
            clicked = {this.toggelePersonHandler} />
          {persons}
    
        </div>
    );
  }
}

export default App;
