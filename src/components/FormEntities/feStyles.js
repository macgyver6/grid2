export const calcTotal = entity => {
  if (typeof entity.prePromptWidth === 'function') {
    const resultingSum =
      entity.prepend() +
      parseFloat(entity.prePromptWidth()) +
      entity.width() +
      entity.postPromptWidth() +
      parseFloat(entity.append());
    console.log(typeof entity.prepend());
    return resultingSum;
  } else {
    console.log('no prompts: ', entity.type());
    return entity.prepend() + entity.width() + entity.append();
  }
};

export const calcTotalAdd = entity => {
  if (typeof entity.prePromptWidth === 'function') {
    console.log('has prompts: ', entity.type());
    return entity.prePromptWidth() + entity.width() + entity.postPromptWidth();
  } else {
    console.log('no prompts: ', entity.type());
    return entity.width();
  }
};

export const styleDefaultEntity = entity => {
  console.log(calcTotal(entity));
  return {
    display: 'grid',
    gridColumn: `span ${calcTotal(entity)}`,
    gridTemplateColumns: 'repeat(' + `${calcTotal(entity)}` + ', [col] 1fr)',
    gridGap: '8px',
    draggable: 'true',
    margin: '10px 0px 10px 0px',
    minHeight: '40px',
    zIndex: '40',
    cursor: 'move',
    border: '1px blue dashed',
    borderRadius: '2px',
    position: 'relative',
  };
};

// defaultEntity2: {
//   "backgroundColor": "lightgreen",
//   "minHeight": "100px",
//   "maxHeight": "100px",
//   "zIndex": "40"
// }
