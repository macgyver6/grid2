const { Validator } = require('./Validator')

/** Class represents a Validator */
class DependecyExpression extends Validator {
  /**
   *
   * @param {string} type
   * @param {string} operator
   * @param {array} conditions
   */
  constructor(type, operator, conditions) {
    super(type);
    this._type = 'DependencyExpression';
    this._operator = operator;
    this._conditions = conditions;
  }

   operator() {
    return this._operator;
  }

  conditions() {
    return this._conditions;
  }
}

const newDependecyExpression = new DependecyExpression('type', 'OR', [{type: 'appliedValidator'}]);

// console.log(newDependecyExpression.operator())


module.exports = { DependecyExpression };