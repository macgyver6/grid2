import React, { Component } from 'react';

class InputItem extends Component {
  constructor(props) {
    super(props);
    this.change_handler = this.change_handler.bind(this);
    this.state = {
      checked: false,
    };
  }

  change_handler(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    console.log({
      [event.target.id]: value,
    });
    this.setState({
      [event.target.id]: value,
    });
    // return props.formmutate({
    //   [event.target.id]: value,
    // });
  }

  render(props) {
    return (
      <li>
        <input
          type="checkbox"
          name="form-formFiles"
          id="checked"
          onChange={this.change_handler}
          // style={cbInputStyle}
          checked={this.state.checked}
        />
        {`${this.props.input.promptNumber()} - ${this.props.input.type()}`}
      </li>
    );
  }
}

export default InputItem;
