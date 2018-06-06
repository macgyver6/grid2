const { AppliedValidator } = require('./AppliedValidator')

/** Class represents a Validator */
class RangeValidator extends AppliedValidator {
  /**
   *
   * @param {string} type
   * @param {string} customFailureMessage
   * @param {boolean} validState
   * @param {boolean} strong
   * @param {boolean} nullIsValid
   * @param {string} inputIndex
   * @param {string} externalId
   * @param {boolean} maxInclusive
   * @param {boolean} minInclusive
   * @param {number} min
   * @param {string} externalId
   * @param {string} externalId
   */
  constructor(type, customFailureMessage, validState, strong, nullIsValid, inputIndex, externalId, maxInclusive, minInclusive, min, max) {
    super(type);
    this._type = 'RangeValidator';
    this._customFailureMessage = customFailureMessage;
    this._validState = validState;
    this._strong = strong;
    this._nullIsValid = nullIsValid;
    this._inputIndex = inputIndex;
    this._externalId = externalId;
    this._min = min;
    this._max = max;
    this._minInclusive = minInclusive;
    this._maxInclusive = maxInclusive;
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
}

const newRangeValidator = new RangeValidator('type', 'customFailureMessage', 'validState', 'strong', 'nullIsValid', 'inputIndex', 'externalId', 'maxInclusive', 'minInclusive', 'min', 'max');

// const volume = (shape) => {
//  return shape.height() + shape.width() + (shape.length ? shape.length() : 0)
// }

// console.log(volume(rectangle))
// console.log(newRangeValidator.type())


module.exports = { RangeValidator };