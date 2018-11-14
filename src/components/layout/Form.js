import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { address } from '../../lib/address';
// import { saveProperty, dragMovement } from "../../redux-modules/dnd/actions";
import { setGridWidth } from '../../redux-modules/actions';
import { utility } from '../../lib/utility';
import FormEntityContainer from '../FormEntityContainer';

const divStyle = {
  // margin: '20px',
  position: 'relative',
  gridTemplateColumns: `repeat(24, [col] 1fr)`,
  gridTemplateRows: `[row] auto`,
  // gridGap: '8px',
  backgroundColor: '#06f',
  zIndex: '0',
  minHeight: '80vh',
  paddingTop: '6px',
  // padding: '2px ',
  // filter: 'drop-shadow(0 0 0.2rem grey)'

  // boxShadow: `3px 3px 3px 3px grey`
};


const bgrndGrd = {
  padding: '6px 0px 60px 0px',
  // margin: '0px',
  fontSize: '12px',
  color: '#222629',
  fontWeight: '900',
  textAlign: 'center',
  backgroundColor: 'white',
  zIndex: '-1',
  minHeight: '60vh',
  // margin: '4px',
  // boxSizing: 'border-box',
  // boxShadow: 'inset 0px 0px 0px 2px green'
  // border: '1px dashed #06f',
};
const bgColumns = [];
for (var i = 0; i < 24; i++) {
  bgColumns.push(
    <div id={`${i + 1}.bgrndGrd`} className="noselect" key={i} style={{

      ...bgrndGrd,
      // gridColumn: `span 1`,
      // backgroundColor: !(i % 2) ?  '#06f' : 'white',

    }}
      >
      {i + 1}
    </div>
  );
}
class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.gridWidth = React.createRef();
  }

  componentDidMount() {
    this.props.setGridWidth(
      utility.round(this.gridWidth.current.offsetWidth / 24, 1)
    );
  }

  render() {
    return (
      <div id={`form`} style={divStyle}>
        <div className="grid">
          {/* loop through and render all children entities of top level section */}
          {/* instead of looping through the first form section's children, and rendering those, the top level form sections should be rendered, which then would render their own children */}
          {this.props.activeTab.children.map(child =>
            React.createElement(FormEntityContainer, {
              key: `${child}.fromRoot`,
              id: child,
              sectionUUID: 0,
            })
          )}
        </div>
        <div className="grid grid_background" ref={this.gridWidth}>
          {bgColumns}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: 1,
  activeTab: state.form.byId[state.app.activeTab],
});

FormComponent = connect(
  mapStateToProps,
  { setGridWidth }
)(FormComponent);

export default FormComponent;
