import React, { Component, Fragment } from "react";
import classes from "./Person.module.css"
import Radium from "radium";
import styled from 'styled-components';

import Aux from "../../../hoc/Auxillary";

import AuthContext from "../../../context/auth-context";

import PropTypes from "prop-types";

const StyleDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width : 500px) {
        width: 450px;
    }
`;

const style = {
    '@media (min-width: 500px)' : {
        width : '450px'
    }
};

class Person extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render () {
        console.log("person rendering");

        return (
        <div className={classes.Person}>
            {this.context.authenticated ? <p>Authenticated</p> : <p>Please Log In!!</p>}
            
            <p onClick={this.props.click}>I'm {this.props.name}. I'm {this.props.age} years old.</p>
            <p>{this.props.children}</p>
            <input type="text" ref={this.inputElementRef} onChange={this.props.changed} value={this.props.name}/>
        </div>
        );

        // return (
        //     <Aux className={classes.Person}>
        //         <p onClick={this.props.click}>I'm {this.props.name}. I'm {this.props.age} years old.</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name}/>
        //     </Aux>
        // );

        // return (
        //     <Fragment className={classes.Person}>
        //         <p onClick={this.props.click}>I'm {this.props.name}. I'm {this.props.age} years old.</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name}/>
        //     </Fragment>
        // );
    }
}

// const Person = (props) => {

    // const style = {
    //     '@media (min-width: 500px)' : {
    //         width : '450px'
    //     }
    // };

//     console.log("person rendering");

//     return (
//     // <div className="Person" style={style}>
//     // <StyleDiv>
    
//     // </StyleDiv>
//         )
// }

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

// export default Radium(person);
export default Person;
