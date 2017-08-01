import React, {Component} from 'react';
import { utility } from '../../utility'

class TextInputComponent extends Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value)
    console.log(this)
    this.props.removeformentity([0, 0])
    this.props.addformentity(
      utility.resurrectEntity(this.props.model.mutate({ defaultContent: event.target.value })
      ), [0, 0])
  }

  render() {
    return (
      <div>
        {this.props.model.name()}
        <input className="form-control" type={this.props.model.type()}
          value={this.props.model.defaultContent()} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

export default TextInputComponent;