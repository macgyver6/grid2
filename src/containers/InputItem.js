import React, { Component } from 'react';

class InputItem extends Component {
  constructor(props) {
    super(props);
    this.change_handler = this.change_handler.bind(this);
    this.state = {
      checked: false,
    };
  }

  change_handler(event, props) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    console.log({
      [event.target.id]: value,
    });
    // this.setState({
    //   [event.target.id]: value,
    // });
    // return props.formmutate({
    //   [event.target.id]: value,
    // });
    this.props.collectSelected(this.props.input);
    this.props.checkHandler(this.props.index);
  }

  render(props) {
    const calcPadding = () =>
      this.props.input
        .autoNumberRule()
        .split(',')
        .filter(item => item === 'L+').length * 30;
    return (
      <li style={{ paddingLeft: `${calcPadding()}px` }}>
        <input
          type="checkbox"
          name="form-formFiles"
          id="checked"
          onChange={this.change_handler}
          // style={cbInputStyle}
          checked={this.props.checked}
        />
        {`${this.props.input.externalIdentifier()} - ${this.props.input.type()}`}
      </li>
    );
  }
}

export default InputItem;
