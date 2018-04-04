import React from 'react';
import { address } from '../address';

export const FormProperty = props => {
  const dragOverFile_handler = event => {
    event.preventDefault();
  };

  const saveFileToLocal = (file, name) => {
    var fileReader = new FileReader();
    const existing = localStorage.getItem('FILE');
    fileReader.readAsDataURL(file);
    fileReader.onload = evt => {
      var result = evt.target.result;
      if (existing === null) {
        try {
          console.log([{ [name]: result }]);
          localStorage.setItem('FILE', JSON.stringify([{ [name]: result }]));
        } catch (e) {
          console.log('Storage failed: ' + e);
        }
      } else {
        // console.log(JSON.parse(existing).concat([{ [name]: result }]))
        // console.log(existing)
        localStorage.setItem(
          'FILE',
          JSON.stringify(JSON.parse(existing).concat([{ [name]: result }]))
        );
      }
    };
  };

  const handleFiles = files => {
    const item = files.getAsFile();

    // Create XHR, Blob and FileReader objects
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/pdf/download?id=');
    xhr.responseType = 'blob';
    xhr.onload = () => {
      console.log(files); // response as a blob
      if (xhr.status && xhr.status === 200) {
        saveFileToLocal(xhr.response, item.name);
      }
    };

    xhr.send();
  };

  const dropFile_handler = event => {
    console.log('Drop');
    event.preventDefault();
    // If dropped items aren't files, reject them
    var dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      const f = [];
      for (var i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind === 'file') {
          f.push(handleFiles(dt.items[i]));
        }
      }
    }
  };
  const stringOfFiles = localStorage.getItem('FILE');
  const fileNames = stringOfFiles
    ? JSON.parse(stringOfFiles).map(file => {
        return Object.keys(file)[0];
      })
    : null;
  const change_handler = event => {
    // console.log(event.target.value);
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
  return (
    <div
      style={formPropertiesStyle}
      onDragOver={dragOverFile_handler}
      onDrop={dropFile_handler}
    >
      <h1>Form Properties</h1>
      <h2>File Uploaded</h2>
      <ul>{fileNames.map(file => <li>{file}</li>)}</ul>
    </div>
  );
};
