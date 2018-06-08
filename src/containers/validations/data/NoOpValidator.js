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
      type: this.properties.type,
      customFailureMessage: this.properties.customFailureMessage,
      validState: this.properties.validState,
      strong: this.properties.strong,
      nullIsValid: this.properties.nullIsValid,
      inputIndex: this.properties.inputIndex,
      externalId: this.properties.externalId,
      name: this.properties.name,
      value: this.properties.value,
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
