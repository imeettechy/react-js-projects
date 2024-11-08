import React from "react";

import Person from "./Person/Person";

const Persons = (props) => (
    props.persons.map((per,ind) => {
        return <Person 
            click={() => props.clicked(ind)}
            name={per.name} 
            age={per.age} 
            key={per.id}
            changed={(event) => props.changed(event, per.id)}/>
      })
);

export default Persons;