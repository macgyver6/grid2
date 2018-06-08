const { Validator } = require('./Validator');

/** Class represents a Validator */
class CompositeCondition {
  /**
   *
   * @param {string} properties.type
   * @param {string} properties.operator
   * @param {array} properties.conditions
   */
  constructor(properties) {
    this._type = 'CompositeExpression';
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

const newCompositeCondition = new CompositeCondition('type', 'OR', [{ type: 'appliedValidator' }]);

// console.log(newCompositeCondition.operator())

module.exports = { CompositeCondition };
