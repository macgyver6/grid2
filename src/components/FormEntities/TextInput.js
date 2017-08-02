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
    let result = utility.findNode(this.props.model, this.props.form)
    console.log(result)
    this.props.removeformentity(result)
    this.props.addformentity(
      utility.resurrectEntity(this.props.model.mutate({ defaultContent: event.target.value })
      ), result)
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