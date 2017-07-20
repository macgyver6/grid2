// "use strict";
const deepFreeze = require('deep-freeze');
const { TextBlock } = require('./TextBlock.js');

/** Class representing a FormEntity.
 * @extends TextBlock
 */
class QxQTextBlock extends TextBlock {
  /**
     * Create a QxQTextBlock.
     * @param {number} uuid - UUID of QxQTextBlock.
     * @param {number} width - Width (in grid units) of the QxQTextBlock.
     * @param {string} backgroundColor - Background color of the QxQTextBlock.
     * @param {string} content - content of the QxQTextBlock.
     * @param {number} prepend - Get the number of grid units prepended to rendered representations of the form entity.
     * @param {number} append - Get the number of grid units appended to rendered representations of the form entity.
     * @param {number} gridHeight - Grid height of the QxQTextBlock.
     */
  constructor(properties) {
    super(properties)
    this._gridHeight = properties.gridHeight || QxQTextBlock.DEFAULT_GRID_HEIGHT;

    deepFreeze(this);

  };


  /**
      * Set the number of grid units prepended to rendered representations of the QxQTextBlock.
      * @param {number} prepend 
      * @returns {TextInput}
      * @memberof TextInput
      */

  gridHeight() {
    return this._gridHeight;
  };

  /**
     * 
     * Clone the QXQTextBlock.
     * @param {Object} props 
     * @returns {TextBlock}
     * @memberof TextBlock
     */
    clone(props) {
        return new QxQTextBlock(props === undefined ? this.properties() : props);
    }

    /**
     * 
     * Returns public properties of a QxQTextBlock.
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
      gridHeight: this.gridHeight()
    };
  }
}

QxQTextBlock.DEFAULT_GRID_HEIGHT = 2;

if (this.constructor === QxQTextBlock) {
  deepFreeze(QxQTextBlock);
};

// var test = new QxQTextBlock({uuid: 1, width: 2, prepend: 4, append: 5, content: 'content', gridHeight: 8})
// console.log(test)

module.exports = { QxQTextBlock: QxQTextBlock }