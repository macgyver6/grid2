const { Validator } = require('./Validator');

/** Class represents a Validator */
class DependecyExpression extends Validator {
  /**
   *
   * @param {string} typ()e
   * @param {string} properties.operator
   * @param {array} properties.conditions
   */
  constructor(properties) {
    super(properties);
    this._type = 'DependencyExpression';
    this._operator = properties.operator;
    this._conditions = properties.conditions;
  }

  operator() {
    return this._operator;
  }

  conditions() {
    return this._conditions;
  }

  properties() {
    return {
      type: this.type(),
      operator: this.operator(),
      conditions: this.conditions(),
    };
  }
}

const newDependecyExpression = new DependecyExpression('type', 'OR', [{ type: 'appliedValidator' }]);

// console.log(newDependecyExpression.operator())

module.exports = { DependecyExpression };
