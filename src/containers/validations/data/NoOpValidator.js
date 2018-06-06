const { AppliedValidator } = require('./AppliedValidator')

/** Class represents a Validator */
class NoOpValidator extends AppliedValidator {
  /**
   *
   * @param {string} type
   * @param {string} customFailureMessage
   * @param {boolean} validState
   * @param {boolean} strong
   * @param {boolean} nullIsValid
   * @param {string} inputIndex
   * @param {string} externalId
   * @param {string} name
   * @param {string} value
   */
  constructor(type, customFailureMessage, validState, strong, nullIsValid, inputIndex, externalId, name, value) {
    super(type, customFailureMessage, validState, strong, nullIsValid, inputIndex, externalId, name, value);
    this._type = 'NoOpValidator';
  }
}

const newNoOpValidator = new NoOpValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId');

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
console.log(newNoOpValidator.customFailureMessage())


module.exports = { NoOpValidator };