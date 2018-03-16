import React from 'react';
import { address } from '../../address';

const FormComponent = props => {
  const divStyle = {
    // margin: '20px',
    position: 'relative',
    gridTemplateColumns: `repeat(24, [col] 1fr)`,
    gridTemplateRows: `[row] auto`,
    gridGap: '8px',
    zIndex: '10',
    minHeight: '800px',
  };

  const bgrndGrd = {
    padding: '0px',
    margin: '0px',
    fontSize: '12px',
    color: 'grey',
    textAlign: 'center',
    backgroundColor: 'rgba(75,156,211, 0.18)',
    zIndex: '15',
    height: '100vh',
  };

  const bgColumns = [];

  for (var i = 0; i < 24; i++) {
    bgColumns.push(
      <div id={`${i}.bgrndGrd`} key={i} style={bgrndGrd}>
        {i + 1}
      </div>
    );
  }
  return (
    <div
      className="wrapper"
      id={`form`}
      style={divStyle}
      // onDrop={drop_handler}
      // onDrag={drag_handler}
      // onDragOver={dragover_handler}
    >
      {/* {  console.log(props.form.children())} */}
      <div className="grid">
        {/* loop through and render all children entities of top level section */}
        {/* instead of looping through the first form section's children, and rendering those, the top level form sections should be rendered, which then would render their own children */}
        {// props.form.children()[props.activeTab]((element, i) => {

        // props.form.children()[props.activeTab].children().map((element, i) => {
        React.createElement(
          address.lookupComponent(props.form.children()[props.activeTab]),
          {
            // key: i,
            model: props.form.children()[props.activeTab],
            form: props.form,
            remove: props.remove,
            add: props.add,
            mutate: props.mutate,
          }
        )
        // })
        }
      </div>
      <div className="grid grid_background">{bgColumns}</div>
    </div>
  );
};

export default FormComponent;
