const deepFreeze = require('deep-freeze');
const { FormEntity } = require('./FormEntity.js');

/** Class representing a FormInput. */
class FormInput extends FormEntity {
  /**
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
   * @property {autoNumber} properties.autoNumber - The expression used to determine how to automatically number inputs after this one in a form hierarchy.
   */
  constructor(properties) {
    super(properties)

    this._prePrompt = properties.prePrompt;
    this._prePromptWidth = properties.prePromptWidth || FormInput.DEFAULT_PROMPT_PRE_WIDTH;
    this._postPrompt = properties.postPrompt;
    this._postPromptWidth = properties.postPromptWidth || FormInput.DEFAULT_PROMPT_POST_WIDTH;
    this._name = properties.name;
    this._sasCodeLabel = properties.sasCodeLabel;
    this._type = properties.type;
    this._tabOrder = properties.tabOrder;
    this._inputWidth = properties.inputWidth;
    this._promptNumber = properties.promptNumber;
    this._autoNumber = typeof(properties.autoNumber) === 'string' ? FormInput.AutoNumberRuleToken[properties.autoNumber]
    : properties.autoNumber;

    if (this.constructor === FormInput) {
      deepFreeze(this);
    };

  };

  /**
     * Get the prompt prefix that should appear before rendered representations of this input.
     * @return {string}
     * @memberof FormInput
     */
  prePrompt() {
    return this._prePrompt;
  };

  /**
     * Get the width of the prompt prefix that should appear before rendered representations of the input.
     * @return {number}
     * @memberof FormInput
     */
  prePromptWidth() {
    return this._prePromptWidth;
  };

  /**
     * Get the prompt suffix that should appear before rendered representations of this input.
     * @return {string}
     * @memberof FormInput
     */
  postPrompt() {
    return this._postPrompt;
  };

  /**
     * Get the width of the prompt suffix that should appear before rendered representations of the input.
     * @return {number}
     * @memberof FormInput
     */
  postPromptWidth() {
    return this._postPromptWidth;
  };

  /**
     * Get the name of the input.
     * @return {string}
     * @memberof FormInput
     */
  name() {
    return this._name;
  };

  /**
     * Get the SAS "code label" for the input.
     * @return {string}
     * @memberof FormInput
     */
  sasCodeLabel() {
    return this._sasCodeLabel;
  };

  /**
   * Get the type for the input.
   * @return {string}
   * @memberof FormInput
   */
  type() {
    return this._type;
  };

  /**
   * Get the tab order for the input.
   * @return {array}
   * @memberof FormInput
   */
  tabOrder() {
    return this._tabOrder;
  };

  /**
   * Get the width for the input.
   * @return {number}
   * @memberof FormInput
   */
  inputWidth() {
    return this._inputWidth;
  };

  /**
   * Get the text corresponding to the question number and separator, which prefixes a prompt when auto-numbering has been enabled.
   * @return {string}
   * @memberof FormInput
   */
  promptNumber() {
    return this._promptNumber;
  };

  /**
   * The expression used to determine how to automatically number inputs after this one in a form hierarchy.
   * @return {string}
   * @memberof FormInput
   */
  autoNumber() {
    return this._autoNumber;
  };

  /**
     *
     * Clone the form input.
     * @param {Object} props
     * @returns {FormInput}
     * @memberof FormInput
     */
  clone(props) {
    return new FormInput(props === undefined ? this.properties() : props);
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
      postPrompt: this.postPromptWidth(),
      postPromptWidth: this.postPromptWidth(),
      name: this.name(),
      sasCodeLabel: this.sasCodeLabel(),
      type: this.type(),
      tabOrder: this.tabOrder(),
      inputWidth: this.inputWidth(),
      promptNumber: this.promptNumber(),
      autoNumber: this.autoNumber(),
    };
  }
};

FormInput.DEFAULT_PROMPT_PRE_WIDTH = 2;
FormInput.DEFAULT_PROMPT_POST_WIDTH = 2;
// These are dummy options, need to replace with real options
FormInput.AutoNumberRuleToken =
  {
    SEQUENTIAL: 0,
    UNORDERED: 1,
    ORDERED: 2
  }

if (this.constructor === FormInput) {
  deepFreeze(FormInput);
};

// let x = new FormInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4});

// console.log(x)

module.exports = { FormInput: FormInput };