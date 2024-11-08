import React, { Component, Fragment } from "react";
import classes from "./Person.module.css"
import Radium from "radium";
import styled from 'styled-components';

import Aux from "../../../hoc/Auxillary";

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

    

    render () {
        console.log("person rendering");

        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}>I'm {this.props.name}. I'm {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
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



// export default Radium(person);
export default Person;
