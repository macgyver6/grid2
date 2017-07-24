const deepFreeze = require('deep-freeze');
const { FormEntity } = require('./FormEntity.js');

/** Class representing a FormEntity.
 * @extends FormEntity
 */
class ImageBlock extends FormEntity {
  /**
     * Create a ImageBlock.
     * @param {number} uuid - UUID of text block.
     * @param {number} width - Width (in grid units) of the text block.
     * @param {string} alt - Background color of the text block.
     * @param {string} title - content of the text block.
     * @param {string} url - content of the text block.
     * @param {number} prepend - Get the number of grid units prepended to rendered representations of the form entity.
     * @param {number} append - Get the number of grid units appended to rendered representations of the form entity.
     */
  constructor(properties) {
    super(properties)
    this._alt = properties.alt;
    this._title = properties.title;
    this._url = properties.url;

    if (this.constructor === ImageBlock) {
      deepFreeze(this);
    };

  };

  /**
     * 
     * Clone the image block.
     * @param {Object} props 
     * @returns {ImageBlock}
     * @memberof ImageBlock
     */
  clone(props) {
    return new ImageBlock(props === undefined ? this.properties() : props);
  }

  /**
   * 
   * Returns public properties of a ImageBlock.
   * @returns {Object}
   */
  properties() {
    return {
      uuid: this.UUID(),
      width: this.width(),
      prepend: this.prepend(),
      append: this.append(),
      backgroundColor: this.alt(),
      title: this.title(),
      url: this.url(),
    };
  }

  /**
 * 
 *Get the alt text of the image block.
 * @return {ImageBlock}
 * @memberof ImageBlock
 */
  alt() {
    return this._alt;
  };

  /**
 * 
 *Get the title of the image block.
 * @return {ImageBlock}
 * @memberof ImageBlock
 */
  title() {
    return this._title;
  };

  /**
 * 
 *Get the url of the image block.
 * @return {ImageBlock}
 * @memberof ImageBlock
 */
  url() {
    return this._url;
  };
};

if (this.constructor === ImageBlock) {
  deepFreeze(ImageBlock);
};

// let x = new ImageBlock({uuid: 1, width: 2, alt: 'alt', title: 'title', url: 'url'})
// console.log(x.url())

module.exports = { ImageBlock: ImageBlock };