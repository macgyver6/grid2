import React from 'react'
// import EditorHeader from './EditorHeader'
// import EditorTabs from './EditorTabs'
// import EditorView from './EditorView'

class EditorBox extends React.Component {
  render() {
    const style = {
      width: ((window.screen.availWidth * 0.98) * 0.195),
      height: (window.screen.availHeight * 0.876),
      border: '5px solid black',
      display: 'inline-block',
    };

    // let validators = _.filter(this.props.validators, (v) => v.custom_messages);

    return (
      <div style={style}>
{/* 
        <EditorHeader
          editorViewId={this.props.editorViewId}
          handleApplicationAction={this.props.handleApplicationAction} />

        <EditorView
          formId={0}
          editorViewId={this.props.editorViewId}
          attributesViewId={this.props.attributesViewId}
          attributes={this.props.attributes}
          validators={validators}
          composite={this.props.composite}
          handleApplicationAction={this.props.handleApplicationAction} /> */}

      </div>
    );
  }
};

export default EditorBox;
