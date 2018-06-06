/** Class represents a Validator */
class Validator {
  /**
   *
   * @param {string} type
   */
  constructor(type) {
    this._type = type;
  }
  // Getter
  type() {
    return this._type;
  }

}

const newValidator = new Validator('type');

// console.log(newValidator)

module.exports = { Validator };