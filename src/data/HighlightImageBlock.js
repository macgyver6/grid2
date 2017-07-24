const deepFreeze = require('deep-freeze');
const { ImageBlock } = require('./ImageBlock.js');

/** Class representing a FormEntity.
 * @extends ImageBlock
 */
class HighlightImageBlock extends ImageBlock {
  /**
     * Create a HighlightImageBlock.
     * @param {number} uuid - UUID of text block.
     * @param {number} width - Width (in grid units) of the text block.
     * @param {number} prepend - Get the number of grid units prepended to rendered representations of the form entity.
     * @param {number} append - Get the number of grid units appended to rendered representations of the form entity.
     * @param {string} alt - Background color of the text block.
     * @param {string} title - content of the text block.
     * @param {string} url - content of the text block.
     * @param {Object} activationInputs - Get the mappings between highlight regions and the UUIDs of the form entities responsible for activating them.
     * @param {Object} highlightRegions - Get the highlight regions of the image block, keyed by the name of the region.
     */
  constructor(properties) {
    super(properties)
    this._activationInputs = properties.activationInputs;
    this._highlightRegions = properties.highlightRegions;

    if (this.constructor === HighlightImageBlock) {
      deepFreeze(this);
    };

  };

  /**
     * 
     * Clone the HighlightImageBlock.
     * @param {Object} props 
     * @returns {HighlightImageBlock}
     * @memberof HighlightImageBlock
     */
  clone(props) {
    return new HighlightImageBlock(props === undefined ? this.properties() : props);
  }

  /**
   * 
   * Returns public properties of a HighlightImageBlock.
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
      activationInputs: this.activationInputs(),
      highlightRegions: this.highlightRegions()
    };
  }

   /**
 * 
 *Get the activation inputs of the highlight image block.
 * @return {HighlightImageBlock}
 * @memberof HighlightImageBlock
 */
  activationInputs() {
    return this._activationInputs;
  };

   /**
 * 
 *Get the highlight regions of the highlight image block.
 * @return {HighlightImageBlock}
 * @memberof HighlightImageBlock
 */
  highlightRegions() {
    return this._highlightRegions;
  };

};

// HighlightImageBlock.DEFAULT_PROMPT_PRE_WIDTH = 0;
// HighlightImageBlock.DEFAULT_PROMPT_POST_WIDTH = 0;

if (this.constructor === HighlightImageBlock) {
  deepFreeze(HighlightImageBlock);
};

// let x = new HighlightImageBlock({uuid: 1, width: 2, alt: 'alt', title: 'title', url: 'url', activationInputs: {test1: 1, test2: 2, test3: 3}, highlightRegions: {test1: 1, test2: 2, test3: 3}})

module.exports = { HighlightImageBlock: HighlightImageBlock };