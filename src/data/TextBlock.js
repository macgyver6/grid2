const deepFreeze = require('deep-freeze');
const { FormEntity } = require('./FormEntity.js');

/** Class representing a FormEntity.
 * @extends FormEntity
 */
class TextBlock extends FormEntity {
  /**
   * Create a TextBlock.
   * Create a FormEntity.
   * @param {Object} properties - Properties of FormEntity
   * @property {number} properties.uuid - UUID of form entity.
   * @property {number} properties.width - Width (in grid units) of the form entity.
   * @property {number} properties.prepend - Get the number of grid units prepended to rendered representations of the form entity.
   * @property {number} properties.append - Get the number of grid units appended to rendered representations of the form entity.
   * @param {string} backgroundColor - Background color of the text block.
   * @param {string} content - Content of the text block.
   */
  constructor(properties) {
    super(properties);

    this._content = properties.content;
    this._backgroundColor =
      properties.backgroundColor ||
      TextBlock.BACKGROUND_COLOR.DEFAULT_BACKGROUND_COLOR;

    if (this.constructor === TextBlock) {
      deepFreeze(this);
    }
  }

  /**
   *
   *Get the background color of the text block.
   * @return {TextBlock}
   * @memberof TextBlock
   */
  backgroundColor() {
    return this._backgroundColor;
  }

  /**
   *
   *Get the content of the text block.
   * @return {TextBlock}
   * @memberof TextBlock
   */
  content() {
    return this._content;
  }

  /**
   *
   * Clone the form input.
   * @param {Object} props
   * @returns {TextBlock}
   * @memberof TextBlock
   */
  clone(props) {
    return new TextBlock(props === undefined ? this.properties() : props);
  }

  /**
   *
   * Returns public properties of a text input.
   * @returns {Object}
   */
  properties() {
    return {
      uuid: this.UUID(),
      width: this.width(),
      prepend: this.prepend(),
      append: this.append(),
      backgroundColor: this.backgroundColor(),
      content: this.content(),
    };
  }
}

TextBlock.BACKGROUND_COLOR = {
  DEFAULT_BACKGROUND_COLOR: 0,
  BLUE: 1,
  GREEN: 2,
  RED: 3,
};

if (this.constructor === TextBlock) {
  deepFreeze(TextBlock);
}

// var test = new TextBlock({uuid: 1, width: 2, content: 'this is content', prepend: 12, append: 13})
// console.log(test.properties())

module.exports = { TextBlock: TextBlock };
