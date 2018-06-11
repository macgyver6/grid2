const { AppliedValidator } = require('./AppliedValidator');

/** Class represents a Validator */
class PatternValidator extends AppliedValidator {
  /**
   *
   * @param {string} properties.type
   * @param {string} properties.customFailureMessage
   * @param {boolean} properties.validState
   * @param {boolean} properties.strong
   * @param {boolean} properties.nullIsValid
   * @param {string} properties.inputIndex
   * @param {string} properties.externalId
   * @param {string} properties.name
   * @param {string} properties.value
   */
  constructor(properties) {
    console.log(properties);
    super(properties);
    this._type = 'PatternValidator';
    this._customFailureMessage = properties.customFailureMessage;
    this._validState = properties.validState;
    this._strong = properties.strong;
    this._nullIsValid = properties.nullIsValid;
    this._inputIndex = properties.inputIndex;
    this._externalId = properties.externalId;
    this._name = properties.name;
    this._value = properties.value;
  }

  name() {
    return this._name;
  }

  value() {
    return this._value;
  }

  properties() {
    return {
      type: this.type(),
      customFailureMessage: this.customFailureMessage(),
      validState: this.validState(),
      strong: this.strong(),
      nullIsValid: this.nullIsValid(),
      inputIndex: this.inputIndex(),
      externalId: this.externalId(),
      name: this.name(),
      value: this.value(),
    };
  }
}

// const newPatternValidator = new PatternValidator(
//   'PatternValidator',
//   'customFailureMessage',
//   'validState',
//   'strong',
//   'nullIsValid',
//   'inputIndex',
//   'externalId',
//   'name2',
//   'value'
// );

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
// console.log(newPatternValidator.name());
// console.log(new PatternValidator({ type: 'Pattern' }));

module.exports = { PatternValidator };
