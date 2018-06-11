import React from 'react';
import { address } from '../address';

class DropToSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.drop_handler = this.drop_handler.bind(this);
    this.dragover_handler = this.dragover_handler.bind(this);
  }

  drop_handler(event) {
    // console.log(event.dataTransfer.getData('address'));
    const data = JSON.parse(event.dataTransfer.getData('address'));
    const draggedEntity = address.byPath(this.props.form, data.address);
    const path = data.address;
    this.setState({
      selected: path,
    });
  }

  dragover_handler(event) {
    event.preventDefault();
  }

  render() {
    const appendStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: '80px',
      width: '80%',
      padding: '16px',
      backgroundColor: 'orange',
    };

    return (
      <div style={appendStyle} onDrop={this.drop_handler} onDragOver={this.dragover_handler}>
        {this.state.selected ? (
          <div>
            <h3>Dependency config on this input: </h3>

            <p>
              {address.byPath(this.props.form, this.state.selected).type()}{' '}
              {address.byPath(this.props.form, this.state.selected).UUID()}
            </p>
          </div>
        ) : (
          'None'
        )}
      </div>
    );
  }
}

export default DropToSelect;
