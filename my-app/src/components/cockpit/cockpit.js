import React from "react";

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


const Cockpit = (props) => {

    let classes = [];

    if(props.persons.length <= 2){
      classes.push('red')
    }
    if(props.persons.length <= 1){
      classes.push('bold')
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is new aPP</p>
            <StyleButton
                alt={props.showPerson}
                // style={style}
                onClick={ props.clicked}>Switch Name</StyleButton>
        </div> 
    );
};

export default Cockpit;

