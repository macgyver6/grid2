const { AppliedValidator } = require('./AppliedValidator');

/** Class represents a Validator */
class SubjectInputValidator extends AppliedValidator {
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
    this._type = 'SubjectInputValidator';
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

// const newSubjectInputValidator = new SubjectInputValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId', 'name2', 'value');

// console.log(newSubjectInputValidator.type())

module.exports = { SubjectInputValidator };
