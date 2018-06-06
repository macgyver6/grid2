const { AppliedValidator } = require('./AppliedValidator')

/** Class represents a Validator */
class SubjectInputValidator extends AppliedValidator {
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
    this._type = 'SubjectInputValidator';
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

const newSubjectInputValidator = new SubjectInputValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId', 'name2', 'value');

// console.log(newSubjectInputValidator.type())


module.exports = { SubjectInputValidator };