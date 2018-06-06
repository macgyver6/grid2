const { Validator } = require('./Validator')

/** Class represents a Validator */
class CompositeCondition {
  /**
   *
   * @param {string} type
   * @param {string} operator
   * @param {array} conditions
   */
  constructor(type, operator, conditions) {
    this._type = 'CompositeExpression';
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

const newCompositeCondition = new CompositeCondition('type', 'OR', [{type: 'appliedValidator'}]);

// console.log(newCompositeCondition.operator())


module.exports = { CompositeCondition };