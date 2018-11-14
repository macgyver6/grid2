import React, { Component } from 'react';

class DeleteBtn extends Component {
  constructor(props) {
    super();
    this.dropHandler = this.dropHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
  }
  dropHandler(event) {
    const droppedEntity = event.dataTransfer.getData('hash');
    const sectionUUID = event.dataTransfer.getData('sectionUUID');

    this.props.deleteEntity(droppedEntity, sectionUUID);

    /** handle case where the activeTab is deleted */
    // if (data.address[0] === 0) {
    //   this.props.changetab(0);
    // } else {
    //   this.props.changetab(data.address[0] - 1);
    // }
  }

  dragOverHandler(event) {
    event.preventDefault();
  }

  render() {
    const deleteBtnStyle = {
      Remove: {
        paddingTop: '0px',
        paddingBottom: '12px',
        margin: '8px',
        textAlign: 'center',
        height: '42px',
        border: '1px solid #ff5f56',
        borderRadius: '2px',
      },
    };

    return (
      <div
        style={deleteBtnStyle}
        onDrop={this.dropHandler}
        onDragOver={this.dragOverHandler}
      >
        <h1>
          <i className="far fa-trash-alt" style={{ color: 'red' }} />
        </h1>
      </div>
    );
  }
}

export default DeleteBtn;
