// 1.) Send each small state change to function as an array

masterActionValidation([formReducer({ type: 'increment' }), formReducer({ type: 'remove', path: [0, 0, 3] })]);
/**
 * {Array} resultingState
 * [
 * {type: add, properties: {} location: [0, 1]},
 * {type: delete, location: [0, 2]}
 * ]
 */

const masterActionValidation = resultingState => {
  // const result = flatten(resultingState)
  const result = resultingState.reduce(function(accumulator, singleStateChange) {
    return { ...accumulator, ...singleStateChange };
  });

  if (validateImport(result).length === 0) {
    props.masterAction(
      Object.assign({}, state, {
        form: result,
      })
    );
  }
};

const arr = [{ value: 1, name: 'Adam', level: 1 }, { value: 1, name: 'Joe' }, { value: 3 }];
console.log({ ...arr[0], ...arr[1], ...arr[2] });
const result1 = arr.reduce(function(accumulator, item) {
  return { ...accumulator, ...item };
});
console.log(result1);
