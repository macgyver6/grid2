import React from 'react';

const TextInput = (props) => {

    let formEntities = 
    props.form.map((element, i) => {
       return <div key={i}>
        Name:  <input type={element.type} value={element.defaultContent} />
      </div>;
    })
  return <div>{ formEntities }</div>
}

export default TextInput;