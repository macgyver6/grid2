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
   * @param {Object} properties.properties
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
    this._properties = properties.properties;
  }

  name() {
    return this._name;
  }

  getProperties() {
    return this._properties;
  }

  type() {
    return this._type;
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
      properties: this.getProperties(),
    };
  }
}

// const newSubjectInputValidator = new SubjectInputValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId', 'name2', 'value');

// console.log(newSubjectInputValidator.type())

module.exports = { SubjectInputValidator };
