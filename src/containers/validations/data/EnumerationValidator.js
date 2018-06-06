const { AppliedValidator } = require('./AppliedValidator')

/** Class represents a Validator */
class EnumerationValidator extends AppliedValidator {
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
    super(type, customFailureMessage, validState, strong, nullIsValid, inputIndex, externalId);
    this._type = 'EnumerationValidator';
    this._customFailureMessage = customFailureMessage;
    this._validState = validState;
    this._strong = strong;
    this._nullIsValid = nullIsValid;
    this._inputIndex = inputIndex;
    this._externalId = externalId;
    this._name = name;
    this._value = value;
  }

  name() {
    return this._name;
  }

  value() {
    return this.value;
  }
}

const newEnumerationValidator = new EnumerationValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId', 'name2', 'value');

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
console.log(newEnumerationValidator.name())


module.exports = { EnumerationValidator };