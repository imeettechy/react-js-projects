import React, { Component, useState } from 'react';
import './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/cockpit/cockpit';

import WithClass from '../hoc/WithClass';

class App extends Component {

  constructor(props) {
    super(props);
    console.log("app js constructor");
  }
  state = {
    persons : [
      { id : 1, name : "meet" ,age: 28},
      { id : 2, name : "dhruv" ,age: 20},
      { id : 3, name : "rajvi" ,age: 26}
    ],
    otherState : "SOmethign else",
    showPerson : false,
    showCockpit : true,
    changeCounter : 0
  }

  static getDerivedStateFromProps(props,state){
    console.log("app js getderivedstatic fromprops", props);
    return state;
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
    this.setState((prevState, props) => {
      return {
        persons : persons,
        changeCounter : prevState.changeCounter + 1
      };
    });
  }

  toggelePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({
      showPerson : !doesShow
    });
  }

  componentDidMount(){
    console.log("app js componentdidmount");
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("app js shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("app js componentDidUpdate");
  }

  render(){
    console.log("app js render");
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
          <button
          onClick={ () => {
            this.setState({ showCockpit : false})
          }}>Remove Cockpit</button>
          {
            this.state.showCockpit ? 
            <Cockpit 
            title={this.props.appTitle}
              showPerson={this.state.showPerson}
              persons = {this.state.persons} 
              clicked = {this.toggelePersonHandler} />
              : null

          }
          
          {persons}
    
        </div>
    );
  }
}

export default App;
