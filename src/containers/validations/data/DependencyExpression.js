const { Validator } = require('./Validator');

/** Class represents a Validator */
class DependecyExpression extends Validator {
  /**
   *
   * @param {string} properties.type
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
      type: this.properties.type,
      operator: this.properties.operator,
      conditions: this.properties.conditions,
    };
  }
}

const newDependecyExpression = new DependecyExpression('type', 'OR', [{ type: 'appliedValidator' }]);

// console.log(newDependecyExpression.operator())

module.exports = { DependecyExpression };
