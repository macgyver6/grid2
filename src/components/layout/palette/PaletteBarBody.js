import React from 'react'
import { PaletteBarBodyStyle } from '../auxillary/styles/PaletteBar'

import PaletteEntity from './PaletteEntity'

class PaletteBarBody extends React.Component {
  render() {
    return (
      <div style={PaletteBarBodyStyle}>
        <PaletteEntity
          backgroundColor="#001f3f"
          title="Form Section"
          type="formSection" />
        <PaletteEntity
          backgroundColor="#FF4136"
          title="Text Input"
          type="textInput" />
        <PaletteEntity
          backgroundColor="#3D9970"
          title="Text Area Input"
          type="textAreaInput" />
        <PaletteEntity
          backgroundColor="#111111"
          title="Select Input"
          type="selectInput" />
        <PaletteEntity
          backgroundColor="#FF851B"
          title="CheckBox Input"
          type="checkBoxInput" />
        <PaletteEntity
          backgroundColor="#0074D9"
          title="Date Time Input"
          type="dateTimeInput" />
        <PaletteEntity
          backgroundColor="#B10DC9"
          title="Image Block"
          type="imageBlock" />
        <PaletteEntity
          backgroundColor="#2ECC40"
          title="Text Block"
          type="textBlock" />
        <PaletteEntity
          backgroundColor="#85144b"
          title="Post/Pre Prompt"
          type="postPrePrompt" />
      </div>
    );
  }
};

module.exports = PaletteBarBody;