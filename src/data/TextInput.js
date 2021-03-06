const deepFreeze = require('deep-freeze');
const { FormInput } = require('./FormInput.js');
const { _dataDefined } = require('../containers/_validations');

/**
 * Class representing a TextInput.
 * @extends FormInput
 */
class TextInput extends FormInput {
  /**
     * Create a TextInput.
     * @param {Object} properties - Properties of FormInput
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
    * @property {autoNumber} properties.autoNumber - The expression used to determine how to automatically number inputs after this one in a form hierarchy.
    @property {number} properties.length - Max length for input. Default is 60, and if NO_MAX is passed in, no max length will be applied to this field.
    @property {boolean} properties.autoTab - Whether the input is defined as permitting auto tab to the next field during data collection.
    @property {string} properties.defaultContent - The default contents of representations of this input item.
    @property {boolean} properties.doubleEntry - The default contents of representations of this input item.
    @property {string} properties.externalIdentifier - Known as external identifier to the user - the field ID used to access a local or remote field.
     * @property {string} properties.QxQ - Field to provide additional information that may assist the user in filling out the form. This is rendered in a "tool tip", or if a TextBlock Entity property "QxQ" is true, the currently selected entity's QxQ information will be rendered in this field.
     */
  constructor(properties) {
    super(properties);
    console.log(properties);
    this._length = properties.length;
    this._defaultContent = properties.defaultContent || TextInput.DEFAULT_CONTENT;
    this._autoTab = properties.autoTab;
    this._doubleEntry = properties.doubleEntry;
    this._externalIdentifier = properties.externalIdentifier;
    this._inputType = properties.inputType;

    if (this.constructor === TextInput) {
      deepFreeze(this);
    }
  }

  /**
   *
   *
   * Known as external identifier to the user - the field ID used to access a local or remote field.
   * @returns {string}
   * @memberof TextInput
   */
  externalIdentifier() {
    return this._externalIdentifier;
  }

  /**
   *
   *
   * Get whether the input is defined as permitting auto tab to the next field during data collection.
   * @returns {boolean}
   * @memberof TextInput
   */
  autoTab() {
    return this._autoTab;
  }

  /**
   *
   * Get the default content for the text input.
   * @returns {string}
   * @memberof TextInput
   */
  defaultContent() {
    return this._defaultContent;
  }

  /**
   *
   * Get the max length for the text input.
   * @returns {number}
   * @memberof TextInput
   */
  length() {
    return this._length;
  }

  /**
   *
   * Get whether the input is defined as requiring confirmation of the entered value at the time of collection.
   * @returns {boolean}
   * @memberof TextInput
   */
  doubleEntry() {
    return this._doubleEntry;
  }

  /**
   *
   * Clone the text input.
   * @param {Object} props
   * @returns {TextInput}
   * @memberof TextInput
   */

  clone(props) {
    return new TextInput(props === undefined ? this.properties() : props);
  }

  /**
   *
   * Get inputType on the form input.
   * @param {Object} props
   * @returns {FormInput}
   * @memberof FormInput
   */
  inputType() {
    return this._inputType;
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
      prePrompt: this.prePrompt(),
      prePromptWidth: this.prePromptWidth(),
      postPrompt: this.postPrompt(),
      postPromptWidth: this.postPromptWidth(),
      name: this.name(),
      QxQ: this.QxQ(),
      sasCodeLabel: this.sasCodeLabel(),
      type: this.type(),
      tabOrder: this.tabOrder(),
      inputWidth: this.inputWidth(),
      promptNumber: this.promptNumber(),
      autoNumber: this.autoNumber(),
      length: this.length(),
      defaultContent: this.defaultContent(),
      autoTab: this.autoTab(),
      doubleEntry: this.doubleEntry(),
      validations: this.validations(),
      autoNumberRule: this.autoNumberRule(),
      externalIdentifier: this.externalIdentifier(),
      inputType: this.inputType(),
    };
  }
}

TextInput.LENGTH = {
  DEFAULT: 80,
  NO_MAX: 0,
};

TextInput.DEFAULT_CONTENT = '';

deepFreeze(TextInput);

// let x = new TextInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'This is default content'});

// console.log(x)

module.exports = { TextInput: TextInput };
