const { Validator } = require('./Validator');

/** Class represents a Validator */
class AppliedValidator extends Validator {
  /**
   *
   * @param {string} properties.type
   * @param {Object} properties.customFailureMessage
   * @param {boolean} properties.validState
   * @param {boolean} properties.strong
   * @param {boolean} properties.nullIsValid
   * @param {string} properties.inputIndex
   * @param {string} properties.externalId
   */
  constructor(properties) {
    super(properties);
    this._type = properties.type;
    this._customFailureMessage = properties.customFailureMessage;
    this._validState = properties.validState;
    this._strong = properties.strong;
    this._nullIsValid = properties.nullIsValid;
    this._inputIndex = properties.inputIndex;
    this._externalId = properties.externalId;
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

  properties() {
    return {
      uuid: this.type(),
      type: this.properties.type,
      customFailureMessage: this.properties.customFailureMessage,
      validState: this.properties.validState,
      strong: this.properties.strong,
      nullIsValid: this.properties.nullIsValid,
      inputIndex: this.properties.inputIndex,
      externalId: this.properties.externalId,
    };
  }
}

// const newAppliedValidator = new AppliedValidator(
//   'type',
//   'customFailureMessage',
//   'validState',
//   'strong',
//   'nullIsValid',
//   'inputIndex',
//   'externalId'
// );

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
// console.log(newAppliedValidator.type())

module.exports = { AppliedValidator };
