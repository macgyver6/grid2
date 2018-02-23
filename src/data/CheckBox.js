const deepFreeze = require('deep-freeze');
const { FormInput } = require('./FormInput.js');

/**
 * Class representing a CheckBox.
 * @extends FormInput
 */
class CheckBox extends FormInput {
  /**
   * Create a CheckBox.
   * Create a FormEntity.
   * @param {Object} properties - Properties of FormEntity
   * @property {number} properties.uuid - UUID of form entity.
   * @property {number} properties.width - Width (in grid units) of the form entity.
   * @property {string} properties.prePrompt - Prompt prefix that should appear before rendered representations of this input.
   * @property {number} properties.prePromptWidth - Width of leading prompts in grid units.
   * @property {string} properties.postPrompt - Prompt suffix that should appear before rendered representations of this input.
   * @property {number} properties.postPromptWidth - Width of trailing prompts in grid units.
   * @property {string} properties.name - Name of the input.
   * @property {string} properties.sasCodeLabel - SAS "code label" for the input.
   * @property {string} properties.type - Type of the input.
   * @property {array} properties.tabOrder - The tab order of the input.
   * @property {number} properties.inputWidth - The width of the input control within this input entity.
   * @property {string} properties.promptNumber - The text corresponding to the question number and separator, which prefixes a prompt when auto-numbering has been enabled.
   * @property {number} properties.prepend - Get the number of grid units prepended to rendered representations of the form entity.
   * @property {number} properties.append - Get the number of grid units appended to rendered representations of the form entity.
   * @property {string} properties.autoNumber - The expression used to determine how to automatically number inputs after this one in a form hierarchy.
   * @property {boolean} properties.defaultState - Default state of the CheckBox.
   */
  constructor(properties) {
    super(properties);

    this._defaultState = properties.defaultState;

    deepFreeze(this);
  }

  /**
   *
   * Clone the text area.
   * @param {Object} props
   * @returns {CheckBox}
   * @memberof CheckBox
   */
  clone(props) {
    return new CheckBox(props === undefined ? this.properties() : props);
  }

  /**
   *
   * Get the defaultState.
   * @returns {CheckBox}
   * @memberof CheckBox
   */
  defaultState() {
    return this._defaultState;
  }

  /**
   *
   * Returns public properties of a form input.
   * @returns {Object}
   */
  properties() {
    return {
      uuid: this.UUID(),
      width: this.width(),
      prepend: this.prepend(),
      append: this.append(),
      prePrompt: this.prePrompt(),
      prePromptWidth: this.prePromptWidth(),
      postPrompt: this.postPrompt(),
      postPromptWidth: this.postPromptWidth(),
      name: this.name(),
      sasCodeLabel: this.sasCodeLabel(),
      type: this.type(),
      tabOrder: this.tabOrder(),
      inputWidth: this.inputWidth(),
      promptNumber: this.promptNumber(),
      autoNumber: this.autoNumber(),
      defaultState: this.defaultState(),
    };
  }
}

deepFreeze(CheckBox);

// let x = new CheckBox({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true});

// console.log(x.mutate({uuid: 234}))

module.exports = { CheckBox: CheckBox };
