export const valUtility = {
  findAll: (e, testFn) => {
    let result = testFn.call({}, e) ? [e] : [];
    if (!e.children) {
      return result;
    }
    return result.concat(
      e
        .children()
        .map(e => valUtility.flatten(valUtility.findAll(e, testFn)))
        .reduce((a, b) => [...a, ...b], [])
    );
  },

  /**
   * flatten the given array or array-like such that any members
   * which are themselves array-likes will be inserted into thes
   * resulting array at the position of their parent's occurrence.
   *
   * Ex: [1, [2, 3], 4, [5, [6]]] => [1, 2, 3, 4, 5, 6]
   *
   * @param {Array} arr array to flatter, not undefined
   * @returns {Array} valUtility.flattened array
   */
  flatten: arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? valUtility.flatten(b) : b), []),
  total: entity => entity.prepend() + entity.width() + entity.append(),
};
