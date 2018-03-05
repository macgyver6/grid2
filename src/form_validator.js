/**
 * Flatten the given array or array-like such that any members
 * which are themselves array-likes will be inserted into the
 * resulting array at the position of their parent's occurrence.
 *
 * Ex: [1, [2, 3], 4, [5, [6]]] => [1, 2, 3, 4, 5, 6]
 *
 * @param {Array} arr array to flatter, not undefined
 * @returns {Array} flattened array
 */
let flatten = arr =>
  arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const validator = {
  findAll: (e, testFn) => {
    let result = testFn.call({}, e) ? [e] : [];
    if (!e.children) {
      return result;
    }
    return result.concat(
      e
        .children()
        .map(e => flatten(validator.findAll(e, testFn)))
        .reduce((a, b) => [...a, ...b], [])
    );
  },
  // drop: form => {
  //   console.log('ttt: ', validateLogic.negativePrependPostpend(form));
  //   // 1. form must start with 1 top level form section
  //   if (form.children().length < 1) {
  //     return 'must have top level form section';
  //     // 2. entities must have > 0 prepend and append
  //   } else if (validateLogic.largerThanParent(form, form)) {
  //     console.log('child width cannot exceed parent width');
  //     return 'child width cannot exceed parent width';
  //     // 3. if the child total() is larger than the width of the section
  //   } else if (validateLogic.negativePrependPostpend(form)) {
  //     return 'prepend and append must >= 0';
  //   } // if no issues with the form, return undefined
  //   else {
  //     return undefined;
  //   }
  // },
};
