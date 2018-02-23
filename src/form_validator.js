import { validateLogic } from './form_validator_logic';

export const validator = {
  drop: form => {
    // const form2 = Object.assign({}, form);
    // console.log('ppp234: ', validateLogic.largerThanParent(form, form));
    // // console.log(validateLogic.largerThanParent(form, form));
    // console.log('ttt: ', validateLogic.negativePrependPostpend(form));
    // // 1. form must start with 1 top level form section
    // if (form.children().length < 1) {
    //   return 'must have top level form section';
    //   // 2. entities must have > 0 prepend and append
    // } else if (validateLogic.negativePrependPostpend(form)) {
    //   return 'prepend and append must >= 0';
    //   // 3. if the child total() is larger than the width of the section
    // } else {
    //  else if (validateLogic.largerThanParent(form, form)) {
    //   console.log('child width cannot exceed parent width');
    //   return 'child width cannot exceed parent width';
    // }
    return undefined;
    // }
  },
};
