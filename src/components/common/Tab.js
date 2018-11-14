import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const StyledTab = styled('div')(props => ({
  textAlign: 'center',
  cursor: 'move',
  width: '140px',
  marginLeft: '4px',
  backgroundColor: props.isOver ? 'grey' : 'white',
  display: 'inline-block',
  fontWeight: props.active ? '900' : '100',
  borderTop: props.active ? '3px solid #06f' : '3px solid white',
  boxShadow: props.active
    ? '0 -3px 3px -3px grey, 3px 0px 3px -3px grey, -3px 0px 3px -3px grey'
    : null,
  '&:hover': !props.active
    ? {
        borderColor: '#b8d2fb',
        transitionDuration: '0.175s',
      }
    : null,
}));

const Legend = styled('p')({
  fontSize: '.8rem',
});

const Tab = props => (
  <StyledTab
    id={props.uuid}
    onMouseDown={props.mouseDownHandler}
    draggable={props.draggable}
    // onDragStart={dragStartHandler}
    onDragOver={props.dragOverHandler}
    onDrop={() => props.dropHandler(props.uuid)}
    onDragEnd={props.dragEndHandler}
    active={props.active}
    isOver={props.isOver}
  >
    <Legend id={props.uuid}>{props.legend}</Legend>
  </StyledTab>
);

Tab.propTypes = {
  id: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onMouseDown: PropTypes.func,
  draggable: PropTypes.bool,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  active: PropTypes.bool,
  isOver: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default Tab;
