import React, { useEffect } from "react";

import styled from 'styled-components';

const StyleButton = styled.button`
  background-color : ${props => props.altbtn  ? 'red' : 'green'};
  color : white;
  border : 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color : ${props => props.altbtn  ? 'salmon' : 'lightgreen'};
    color : black;
  }
`;


const Cockpit = (props) => {

    // mutliple useEffects works
    useEffect(() => {
        console.log("cockpit js useEffect");
        // setTimeout(() => {
        //     alert("set data to cloud");
        // }, 1000);

        return () => {
            console.log("cockpit useeffect cleanup work");
        }
    }, [])

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
                altbtn={props.showPerson}
                // style={style}
                onClick={ props.clicked}>Switch Name</StyleButton>
        </div> 
    );
};

export default React.memo(Cockpit);

