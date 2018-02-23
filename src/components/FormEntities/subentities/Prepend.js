import React from 'react';
import { helpers } from '../../../helpers';
import { rearrangers } from '../../../rearrangers';

const Prepend = props => {
  let drop_handler = event => {
    rearrangers.drop_handler(event, props);
  };

  const prependStyle = {
    // minWidth: '20px',
    // minHeight: '100px',
    gridColumn: `span ${props.prepend}`,
    // border: '1px dashed black',
    // position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  };

  // const drop_handler = (event) => {
  //   console.log('Prepend drop')
  // }
  // const drop_handler = (event) => {
  //   helpers.dropPrepend_handler(event, props)
  // }

  let dragover_handler = event => {
    event.preventDefault();
  };

  // let dragEnterHandler
  // dragEnterHandler = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // @hack hard coded width
  //   if (props.model.width() >= 5) {
  //     event.target.style.backgroundColor = 'rgba(63, 191, 63, 0.8)'
  //   }
  // }

  return (
    <div
      style={prependStyle}
      id={`${props.model.UUID()}.prepend`}
      // onDrop={drop_handler}
      // onDragOver ={dragover_handler}
    >
      {/* onDragEnter={dragEnterHandler} */}
    </div>
  );
};

export default Prepend;
