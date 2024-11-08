import React, { PureComponent } from "react";

import Person from "./Person/Person";

class Persons extends PureComponent {

    // static getDerivedStateFromProps(props, state) {
    //     console.log("persons getDerivedStateFromProps");
    // }

    // componentWillReceiveProps(props){
    //     console.log("persons js componentWillReceiveProps", props);
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("persons js shouldComponentUpdate")
    //     if(nextProps.persons !== this.props.persons
    //         || nextProps.changed !== this.props.changed
    //         || nextProps.clicked !== this.props.clicked
    //     ) {
    //         return true
    //     } else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProp, prevState){
        console.log("persons js getSnapshotBeforeUpdate");
        return { msg : "snapshot" };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("persons js componentDidUpdate");
        console.log("snapshot" , snapshot);
    }

    componentWillUnmount() {
        console.log("persons js componentWillUnmount");
    }

    render () {
        console.log("persons rendering");
        return this.props.persons.map((per,ind) => {
            return <Person 
                click={() => this.props.clicked(ind)}
                name={per.name} 
                age={per.age} 
                key={per.id}
                changed={(event) => this.props.changed(event, per.id)}/>
          })
    }
}

// const Persons = (props) => {
    

    
// };

export default Persons;