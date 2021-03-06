const deepFreeze = require('deep-freeze');
const { FormInput } = require('./FormInput.js');

/**
 * Class representing a EchoInput.
 * @extends FormInput
 */
class EchoInput extends FormInput {
  /**
     * Create a EchoInput.
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
    * @property {autoNumberRule} properties.autoNumberRule - The expression used to determine how to automatically number inputs after this one in a form hierarchy.
    *@property {string} properties.externalIdentifier - Known as external identifier to the user - the field ID used to access a local or remote field.
    @property {number} properties.length - Max length for input. Default is 60, and if NO_MAX is passed in, no max length will be applied to this field.
    @property {string} properties.sourceInput - Form input that serves as the source for the echo input.
     */
  constructor(properties) {
    super(properties);

    this._sourceInput = properties.sourceInput;
    this._autoTab = properties.autoTab;
    this._externalIdentifier = properties.externalIdentifier;
    this._editeable = properties.editeable;
    this._defaultContent = properties.defaultContent;

    deepFreeze(this);
  }

  /**
   *
   * Defines if the resulting value from input field is editeable.
   * @returns {boolean}
   * @memberof EchoInput
   */
  editeable() {
    return this._editeable;
  }

  /**
   *
   * Form input which serves as the source for the echo input.
   * @returns {string}
   * @memberof EchoInput
   */
  sourceInput() {
    return this._sourceInput;
  }

  defaultContent() {
    return this._defaultContent;
  }

  /**
   *
   * Clone the text input.
   * @param {Object} props
   * @returns {EchoInput}
   * @memberof EchoInput
   */
  clone(props) {
    return new EchoInput(props === undefined ? this.properties() : props);
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
      sasCodeLabel: this.sasCodeLabel(),
      type: this.type(),
      tabOrder: this.tabOrder(),
      inputWidth: this.inputWidth(),
      promptNumber: this.promptNumber(),
      defaultContent: this.defaultContent(),
      autoNumberRule: this.autoNumberRule(),
      sourceInput: this.sourceInput(),
      externalIdentifier: this.externalIdentifier(),
      editeable: this.editeable(),
      validations: this.validations(),
    };
  }
}

deepFreeze(EchoInput);

// let x = new EchoInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88,  append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, sourceInput: 'sourceInput' });

// console.log(x)

module.exports = { EchoInput: EchoInput };
