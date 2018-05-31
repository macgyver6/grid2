export const calcTotal = entity => {
  if (typeof entity.prePromptWidth === 'function') {
    const resultingSum =
      entity.prepend() +
      parseFloat(entity.prePromptWidth()) +
      entity.width() +
      entity.postPromptWidth() +
      parseFloat(entity.append());
    return resultingSum;
  } else {
    return entity.prepend() + entity.width() + entity.append();
  }
};

export const calcTotalAdd = entity => {
  if (typeof entity.prePromptWidth === 'function') {
    // console.log('has prompts: ', entity.type());
    return entity.prePromptWidth() + entity.width() + entity.postPromptWidth();
  } else {
    // console.log('no prompts: ', entity.type());
    return entity.width();
  }
};

export const entityWrapperStyle = entity => ({
  display: 'grid',
  gridColumn: `span ${calcTotal(entity)}`,
  gridTemplateColumns: 'repeat(' + `${calcTotal(entity)}` + ', [col] 1fr)',
  gridGap: '8px',
  draggable: 'true',
  margin: '10px 0px 10px 0px',
  minHeight: '40px',
  // zIndex: '40',
  cursor: 'move',
  border: '1px blue dashed',
  borderRadius: '2px',
  position: 'relative',
});

export const inputStyle = entity => ({
  position: 'absolute',
  right: 16,
  bottom: 7,
  height: '20px',
  width: '82%',
});

export const entityStyle = entity => ({
  // //     margin: helpers.marginCalc(props),
  position: 'relative',
  gridColumn: `span ${entity.width()}`,
  maxHeight: '40px',
  cursor: 'move',
  // gridGap: '8px',
  // border: '1px solid red',
  padding: '4px',
  borderRadius: `
  ${entity.prePromptWidth ? (entity.prePromptWidth() > 0 ? '0px' : '2px') : '0px'}
  ${entity.postPromptWidth ? (entity.postPromptWidth() > 0 ? '0px' : '2px') : '0px'}
  ${entity.postPromptWidth ? (entity.postPromptWidth() > 0 ? '0px' : '2px') : '0px'}
  ${entity.prePromptWidth ? (entity.prePromptWidth() > 0 ? '0px' : '2px') : '0px'}`,
  marginLeft: entity.prePromptWidth ? (entity.prePromptWidth() > 0 ? '-8px' : '0px') : '0px',
  marginRight: entity.postPromptWidth ? (entity.postPromptWidth() > 0 ? '-8px' : '0px') : '0px',
});
// defaultEntity2: {
//   "backgroundColor": "lightgreen",
//   "minHeight": "100px",
//   "maxHeight": "100px",
//   "zIndex": "40"
// }
