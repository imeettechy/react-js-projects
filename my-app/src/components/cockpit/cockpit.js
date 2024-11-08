import React, { useEffect, useReducer, useRef, useContext } from "react";

import styled from 'styled-components';

import AuthContext from "../../context/auth-context";

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

    const authContext = React.useContext(AuthContext);

    const toggleBtnRef = useRef(null);

    // mutliple useEffects works
    useEffect(() => {
        console.log("cockpit js useEffect");
        // setTimeout(() => {
        //     alert("set data to cloud");
        // }, 1000);
        toggleBtnRef.current.click();


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
                ref = {toggleBtnRef}
                altbtn={props.showPerson}
                // style={style}
                onClick={ props.clicked}>Switch Name</StyleButton>

            <AuthContext.Consumer>
               {(context) => <StyleButton onClick={context.login}>Log In</StyleButton>
               } 
            </AuthContext.Consumer>
        </div> 
    );
};

export default React.memo(Cockpit);

