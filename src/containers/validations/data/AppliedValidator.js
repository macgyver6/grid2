const { Validator } = require('./Validator')

/** Class represents a Validator */
class AppliedValidator extends Validator {
  /**
   *
   * @param {string} type
   * @param {string} customFailureMessage
   * @param {boolean} validState
   * @param {boolean} strong
   * @param {boolean} nullIsValid
   * @param {string} inputIndex
   * @param {string} externalId
   */
  constructor(type, customFailureMessage, validState, strong, nullIsValid, inputIndex, externalId) {
    super(type);
    this._type = type;
    this._customFailureMessage = customFailureMessage;
    this._validState = validState;
    this._strong = strong;
    this._nullIsValid = nullIsValid;
    this._inputIndex = inputIndex;
    this._externalId = externalId;
  }

   customFailureMessage() {
    return this._customFailureMessage;
  }

  validState() {
    return this._validState;
  }

  strong() {
    return this._strong;
  }

  nullIsValid() {
    return this._nullIsValid;
  }

  inputIndex() {
    return this._inputIndex;
  }

  externalId() {
    return this._externalId;
  }
}

const newAppliedValidator = new AppliedValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId');

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
// console.log(newAppliedValidator.type())


module.exports = { AppliedValidator };