import React from 'react';
import { address } from '../address';

export const FormProperty = props => {
  const dragOverFile_handler = event => {
    event.preventDefault();
  };

  const saveToLocal = (name, readFile) => {
    localStorage.setItem(name, readFile);
  };

  const dropFile_handler = event => {
    event.preventDefault();
    var files = event.dataTransfer.files[0];
    var name = event.dataTransfer.files[0].name;
    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = function(readEvent) {
      console.log(name);
      saveToLocal(name, readEvent.target.result);
    };
  };

  const change_handler = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value,
    });
  };

  const formPropertiesStyle = {
    height: '900px',
    border: '2px solid',
  };

  const imageyolo = localStorage.getItem('FILE');
  return (
    <div
      style={formPropertiesStyle}
      onDragOver={dragOverFile_handler}
      onDrop={dropFile_handler}
    >
      <h1>Form Properties</h1>
      <h2>File Uploaded</h2>
      <img src={localStorage.getItem('Files')} />
      {/* <ul>{fileNames.map(file => <li>{file}</li>)}</ul> */}
    </div>
  );
};
