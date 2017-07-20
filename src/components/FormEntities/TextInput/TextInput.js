import React from 'react';

const TextInput = (props) => {

    let formEntities = 
    props.form.map((element, i) => {
      console.log(element)
       return <div key={i}>
        {element.name}:  <input type={element.type} value={element.defaultContent} />
      </div>;
    })
  return <div>{ formEntities }</div>
}

export default TextInput;