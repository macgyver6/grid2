import { _styles } from './_styles';

export const calcTotal = entity => {
  if ('prePromptWidth' in entity) {
    const resultingSum =
      parseFloat(entity.prePromptWidth) + entity.width + entity.postPromptWidth;

    return resultingSum;
  } else {
    return entity.width;
  }
};

export const widthSubWrapper = entity => {
  if ('prePromptWidth' in entity) {
    return entity.prePromptWidth + entity.width + entity.postPromptWidth;
  } else {
    return entity.width;
  }
};

export const entityWrapperStyle = entity => ({
  display: 'grid',
  gridColumn: `span ${calcTotal(entity)}`,
  gridTemplateColumns: `repeat(${calcTotal(entity)}, [col] 1fr)`,
  // gridGap: '8px',
  // draggable: 'true',
  margin: '8px 0px 0px 0px',
  // minHeight: '40px',
  zIndex: '1',
  // backgroundColor: 'white',
  cursor: 'move',
  // border: '1px blue dashed',
  borderRadius: '2px',
  position: 'relative',
  // height: 'auto',
  alignSelf: 'start',
  // backgroundColor: 'white'
});

export const entitySubWrapperStyle = entity => ({
  display: 'grid',
  gridColumn: `span ${widthSubWrapper(entity)}`,
  gridTemplateColumns: `repeat(${widthSubWrapper(entity)}, [col] 1fr)`,
  // gridGap: '8px',
  // draggable: 'true',
  // margin: '10px 0px 10px 0px',
  // minHeight: '40px',
  // zIndex: '40',
  // backgroundColor: 'white',
  cursor: 'move',
  border: entity.type === 'TextInput' ? '1px solid #BBBBBB' : null,  borderRadius: '2px',
  position: 'relative',
  // height: 'auto',
  alignSelf: 'start',
  backgroundColor: entity.type === 'TextInput' ? 'white' : null,   // border: entity.type === 'TextInput' ? '1px solid red' : null
  // boxShadow: '0 3px 4px rgba(116, 116, 116, 0.3)',
  // border: '1px solid #BBBBBB',
  // borderLeft: '2px #8939AD',
});

export const inputStyle = entity => ({
  cursor: 'move',
  // height: '20px',
  paddingTop: '2px',
  border: `1px solid ${_styles[`${entity.type}`].render.backgroundColor}`,
  borderRadius: '2px',
  // width: '100%',
  boxSizing: 'border-box',
  background: 'white',
  gridColumn: `span ${entity.width}`,
  //   gridColumnStart: `1`,
  //   gridColumnEnd: `${entity.width + 1}`,
  //   gridRowStart: 1,
});

export const entityStyle = width => ({
  cursor: 'move',
  borderRadius: '2px',
  position: 'relative',
  gridColumn: `span ${width}`,
  maxHeight: '32px',
  display: 'grid',
  // gridTemplateColumns: `repeat(${width}, [col] 1fr)`,
  //   gridRowStart: 1,
  // @hack
  // borderRadius: `
  // ${entity.prePromptWidth ? (entity.prePromptWidth > 0 ? '0px' : '2px') : '0px'}
  // ${entity.postPromptWidth ? (entity.postPromptWidth > 0 ? '0px' : '2px') : '0px'}
  // ${entity.postPromptWidth ? (entity.postPromptWidth > 0 ? '0px' : '2px') : '0px'}
  // ${entity.prePromptWidth ? (entity.prePromptWidth > 0 ? '0px' : '2px') : '0px'}`,
  // marginLeft: entity.prePromptWidth ? (entity.prePromptWidth > 0 ? '-8px' : '0px') : '0px',
  // marginRight: entity.postPromptWidth ? (entity.postPromptWidth > 0 ? '-8px' : '0px') : '0px',
});