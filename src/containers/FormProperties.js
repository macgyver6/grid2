import React from 'react';
import { connect } from 'react-redux';
import { address } from '../address';
import * as actions from '../actions/index';
import AutoId from './autoId';
import { getExternalIdentifier, assignAllNamesBatch } from './autoName';
import { utility } from '../utility';
import { FormInput } from '../data/FormInput';

let FormProperty = props => {
  const dragOverFile_handler = event => {
    event.preventDefault();
  };

  const saveToLocal = (name, readFile) => {
    localStorage.setItem(name, readFile);
    props.dtLocalFilesSaved(Date.now());
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
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    return props.formmutate({
      [event.target.id]: value,
    });
  };

  const autoId_change_handler = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    const result = props.formmutate({
      autoId: {
        ...props.model.autoId(),
        [event.target.id]: value,
      },
    });

    if (event.target.name === 'form-prefix' || event.target.name === 'form-separator') {
      const arrAllInputs = utility.findAll(props.model, e => e instanceof FormInput).sort(function(a, b) {
        return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
      });
      props.batchActions(assignAllNamesBatch(arrAllInputs, props.props.model.form));
    }
    return result;
  };

  const formPropertiesStyle = {
    height: '900px',
  };

  let localFiles = [];
  for (var i = 0; i < localStorage.length; i++) {
    let _key = localStorage.key(i);
    localFiles.push({
      name: [_key],
      file: localStorage.getItem(localStorage.key(i)),
    });
  }

  const cbInputStyle = { height: '25px', width: '25px', margin: '8px' };
  console.log(props.model);
  return (
    <div style={formPropertiesStyle} onDragOver={dragOverFile_handler} onDrop={dropFile_handler}>
      <h1>Form Properties</h1>
      <h2>Accept Form Attached Files</h2>
      <p>
        <input
          type="checkbox"
          name="form-formFiles"
          id="allowEventAttachedFile"
          onChange={change_handler}
          style={cbInputStyle}
          checked={props.model.allowEventAttachedFile()}
        />
      </p>
      <h2>Files Uploaded</h2>
      <ul>{localFiles.map(file => <li>{file.name}</li>)}</ul>
      <h2>Auto Number</h2>
      <p>
        <input
          type="checkbox"
          name="form-autoId"
          id="enable"
          onChange={autoId_change_handler}
          style={cbInputStyle}
          checked={props.model.autoId().enable}
        />
      </p>
      {props.model.autoId().enable ? <AutoId autoId_change_handler={autoId_change_handler} /> : null}
    </div>
  );
};

const mapStateToProps = props => ({ props });
FormProperty = connect(mapStateToProps, actions)(FormProperty);

export default FormProperty;
