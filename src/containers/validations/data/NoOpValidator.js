const { AppliedValidator } = require('./AppliedValidator');

/** Class represents a Validator */
class NoOpValidator extends AppliedValidator {
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
    super(properties);
    this._type = 'NoOpValidator';
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

// const newNoOpValidator = new NoOpValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId');

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
console.log(newNoOpValidator.customFailureMessage());

module.exports = { NoOpValidator };
