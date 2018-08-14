import { defaultPropsFE, initFE } from '../../constants/defaultPropsFE';

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
  // draggable: 'true',
  // margin: '10px 0px 10px 0px',
  // minHeight: '40px',
  // zIndex: '40',
  // backgroundColor: 'white',
  cursor: 'move',
  // border: '1px blue dashed',
  borderRadius: '2px',
  position: 'relative',
  // height: 'auto',
  alignSelf: 'start',
  // border: '1px solid #BBBBBB',
});

export const entitySubWrapperStyle = entity => ({
  display: 'grid',
  gridColumn: `span ${(typeof entity.prePromptWidth === 'function' ? entity.prePromptWidth() : 0) +
    entity.width() +
    (typeof entity.postPromptWidth === 'function' ? entity.postPromptWidth() : 0)}`,
  gridTemplateColumns:
    'repeat(' +
    `${(typeof entity.prePromptWidth === 'function' ? entity.prePromptWidth() : 0) +
      entity.width() +
      (typeof entity.postPromptWidth === 'function' ? entity.postPromptWidth() : 0)}` +
    ', [col] 1fr)',
  gridGap: '8px',
  // draggable: 'true',
  // margin: '10px 0px 10px 0px',
  // minHeight: '40px',
  // zIndex: '40',
  // backgroundColor: 'white',
  cursor: 'move',
  // border: '1px blue dashed',
  borderRadius: '2px',
  position: 'relative',
  // height: 'auto',
  alignSelf: 'start',
  // boxShadow: '0 3px 4px rgba(116, 116, 116, 0.3)',
  // border: '1px solid #BBBBBB',
  // borderLeft: '2px #8939AD',
});

export const inputStyle = entity => ({
  cursor: 'move',
  // height: '20px',
  paddingTop: '2px',
  border: `1px solid ${initFE[`${entity.type()}`].render.backgroundColor}`,
  borderRadius: '2px',
  width: '100%',
  boxSizing: 'border-box',
  background: 'white',
});

export const entityStyle = entity => ({
  cursor: 'move',
  borderRadius: '2px',
  position: 'relative',
  gridColumn: `span ${entity.width()}`,
  maxHeight: '32px',
  // @hack
  // borderRadius: `
  // ${entity.prePromptWidth ? (entity.prePromptWidth() > 0 ? '0px' : '2px') : '0px'}
  // ${entity.postPromptWidth ? (entity.postPromptWidth() > 0 ? '0px' : '2px') : '0px'}
  // ${entity.postPromptWidth ? (entity.postPromptWidth() > 0 ? '0px' : '2px') : '0px'}
  // ${entity.prePromptWidth ? (entity.prePromptWidth() > 0 ? '0px' : '2px') : '0px'}`,
  // marginLeft: entity.prePromptWidth ? (entity.prePromptWidth() > 0 ? '-8px' : '0px') : '0px',
  // marginRight: entity.postPromptWidth ? (entity.postPromptWidth() > 0 ? '-8px' : '0px') : '0px',
});
// defaultEntity2: {
//   "backgroundColor": "lightgreen",
//   "minHeight": "100px",
//   "maxHeight": "100px",
//   "zIndex": "40"
// }
