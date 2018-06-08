/** Class represents a Validator */
class Validator {
  /**
   *
   * @param {string} properties.type
   */
  constructor(properties) {
    console.log(properties);
    this._type = properties.type;
  }
  // Getter
  type() {
    return this._type;
  }

  /**
   *
   * Returns public properties of a Validator.
   * @return {object}
   * @memberof Validator
   */
  properties() {
    return {
      type: this._type(),
    };
  }
}

const newValidator = new Validator('type');

// console.log(newValidator)

module.exports = { Validator };
