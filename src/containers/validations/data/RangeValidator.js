const { AppliedValidator } = require('./AppliedValidator');

/** Class represents a Validator */
class RangeValidator extends AppliedValidator {
  /**
   *
   * @param {string} properties.type
   * @param {string} properties.customFailureMessage
   * @param {boolean} properties.validState
   * @param {boolean} properties.strong
   * @param {boolean} properties.nullIsValid
   * @param {string} properties.inputIndex
   * @param {string} properties.externalId
   * @param {boolean} properties.maxInclusive
   * @param {boolean} properties.minInclusive
   * @param {number} properties.min
   * @param {string} properties.externalId
   * @param {string} properties.externalId
   */
  constructor(properties) {
    super(properties);
    this._type = 'RangeValidator';
    this._customFailureMessage = properties.customFailureMessage;
    this._validState = properties.validState;
    this._strong = properties.strong;
    this._nullIsValid = properties.nullIsValid;
    this._inputIndex = properties.inputIndex;
    this._externalId = properties.externalId;
    this._min = properties.min;
    this._max = properties.max;
    this._minInclusive = properties.minInclusive;
    this._maxInclusive = properties.maxInclusive;
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

  maxInclusive() {
    return this._maxInclusive;
  }

  minInclusive() {
    return this._minInclusive;
  }

  min() {
    return this._min;
  }

  max() {
    return this._max;
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
      min: this.properties.min,
      max: this.properties.max,
      minInclusive: this.properties.minInclusive,
      maxInclusive: this.properties.maxInclusive,
    };
  }
}

const newRangeValidator = new RangeValidator(
  'type',
  'customFailureMessage',
  'validState',
  'strong',
  'nullIsValid',
  'inputIndex',
  'externalId',
  'maxInclusive',
  'minInclusive',
  'min',
  'max'
);

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
// console.log(newRangeValidator.type())

module.exports = { RangeValidator };
