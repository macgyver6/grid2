import React, { Component } from 'react';
import { inputStyle } from '../feStyles';
import showdown from 'showdown';

const tBInputStyle = {
  height: '60%',
  width: '80%',
  position: 'absolute',
  right: 16,
  bottom: 7,
};

const converter = new showdown.Converter({ simpleLineBreaks: true });
const text = '# hello, markdown!';

class TB_Fragment extends Component {
  render() {
    const html = converter.makeHtml(this.props.model.content);
    const createMarkup = () => ({ __html: html });

    return (
      <div
        style={{
          ...inputStyle(this.props.model),
          height: 'auto',
          minHeight: '20px',
          maxHeight: '',
          alignSelf: 'start',
          wordBreak: 'break-word',
        }}
        dangerouslySetInnerHTML={createMarkup()}
      />
    );
  }
}

export default TB_Fragment;
