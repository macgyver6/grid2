const { Validator } = require('./Validator');

/** Class represents a Validator */
class DependencyExpression extends Validator {
  /**
   *
   * @param {string} properties.type
   * @param {string} properties.operator
   * @param {array} properties.conditions
   */
  constructor(properties) {
    super(properties);
    console.log(properties);
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

// const newDependencyExpression = new DependencyExpression('type', 'OR', [{ type: 'appliedValidator' }]);

// console.log(newDependencyExpression.operator());

module.exports = { DependencyExpression };
