const { _dataDefined } = require('../containers/_validations');
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
   * @property {string} properties.QxQ - Field to provide additional information that may assist the user in filling out the form. This is rendered in a "tool tip", or if a TextBlock Entity property "QxQ" is true, the currently selected entity's QxQ information will be rendered in this field.
   * @property {inputType} properties.inputType - The type of input to be expected.
   * @property {maxLength} properties.maxLength - The length of input to be expected.
   * @property {autoNumberRule} properties.autoNumberRule
 - The rule by which the externalIdentifier is defined.
   */
  constructor(properties) {
    super(properties);
    console.log(0 ? true : false);
    this._prePrompt = properties.prePrompt;
    this._prePromptWidth = properties.prePromptWidth;
    // || FormInput.DEFAULT_PROMPT_PRE_WIDTH; // default value removed as 0 === falsy
    this._postPrompt = properties.postPrompt;
    this._postPromptWidth = properties.postPromptWidth;
    // || FormInput.DEFAULT_PROMPT_POST_WIDTH; default value removed as 0 === falsy
    this._name = properties.name;
    this._sasCodeLabel = properties.sasCodeLabel;
    this._type = properties.type;
    this._tabOrder = properties.tabOrder;
    this._inputWidth = properties.inputWidth;
    this._promptNumber = properties.promptNumber;
    this._QxQ = properties.QxQ;
    this._autoNumber =
      typeof properties.autoNumber === 'string'
        ? FormInput.AutoNumberRuleToken[properties.autoNumber]
        : properties.autoNumber;
    this._validations = properties.validations || [];
    this._dependencies = properties.dependencies || [];

    // || FormInput.DEFAULT_VALIDATIONS, {
    //   defaultUserVal: _dataDefined[FormInput.DEFAULT_VALIDATIONS.valType].userDefined,
    // }
    this._inputType = properties.inputType;
    this._maxLength = properties.maxLength || 2;
    this._externalIdentifier = properties.externalIdentifier;
    this._autoNumberRule = properties.autoNumberRule;

    // { userDefinedNonSelection: _dataDefined }

    if (this.constructor === FormInput) {
      deepFreeze(this);
    }
  }

  /**
   * Get the prompt prefix that should appear before rendered representations of this input.
   * @return {string}
   * @memberof FormInput
   */
  prePrompt() {
    return this._prePrompt;
  }

  /**
   * Get the width of the prompt prefix that should appear before rendered representations of the input.
   * @return {number}
   * @memberof FormInput
   */
  prePromptWidth() {
    return this._prePromptWidth;
  }

  /**
   * Get the prompt suffix that should appear before rendered representations of this input.
   * @return {string}
   * @memberof FormInput
   */
  postPrompt() {
    return this._postPrompt;
  }

  /**
   * Get the width of the prompt suffix that should appear before rendered representations of the input.
   * @return {number}
   * @memberof FormInput
   */
  postPromptWidth() {
    return this._postPromptWidth;
  }

  /**
   * Get the name of the input.
   * @return {string}
   * @memberof FormInput
   */
  name() {
    return this._name;
  }

  /**
   * Get the QxQ of the input.
   * @return {string}
   * @memberof FormInput
   */
  QxQ() {
    return this._QxQ;
  }

  /**
   * Get the SAS "code label" for the input.
   * @return {string}
   * @memberof FormInput
   */
  sasCodeLabel() {
    return this._sasCodeLabel;
  }

  /**
   * Get the type for the input.
   * @return {string}
   * @memberof FormInput
   */
  type() {
    return this._type;
  }

  /**
   * Get the tab order for the input.
   * @return {array}
   * @memberof FormInput
   */
  tabOrder() {
    return this._tabOrder;
  }

  /**
   * Get the width for the input.
   * @return {number}
   * @memberof FormInput
   */
  inputWidth() {
    return this._inputWidth;
  }

  /**
   * Get the text corresponding to the question number and separator, which prefixes a prompt when auto-numbering has been enabled.
   * @return {string}
   * @memberof FormInput
   */
  promptNumber() {
    return this._promptNumber;
  }

  /**
   * The expression used to determine how to automatically number inputs after this one in a form hierarchy.
   * @return {string}
   * @memberof FormInput
   */
  autoNumber() {
    return this._autoNumber;
  }

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
   * Get validation properties on the form input.
   * @param {Array} props
   * @returns {FormInput}
   * @memberof FormInput
   */
  validations() {
    console.log('validations hit: ', this._validations);
    return this._validations;
  }

  /**
   *
   * Get dependency properties on the form input.
   * @param {Array} props
   * @returns {FormInput}
   * @memberof FormInput
   */
  dependencies() {
    console.log('dependencies hit: ', this._dependencies);
    return this._dependencies;
  }

  /**
   *
   * Get maxLength on the form input.
   * @param {Object} props
   * @returns {FormInput}
   * @memberof FormInput
   */
  maxLength() {
    return this._maxLength;
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
   * The rule by which the externalIdentifier is assigned.
   * @returns {string}
   * @memberof TextInput
   */
  autoNumberRule() {
    return this._autoNumberRule;
  }

  /**
   *
   * Returns public properties of a form input.
   * @return {object}
   * @memberof FormInput
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
      validations: this.validations(),
      dependencies: this.dependencies(),
      maxLength: this.maxLength(),
      externalIdentifier: this.externalIdentifier(),
    };
  }
}

FormInput.DEFAULT_PROMPT_PRE_WIDTH = 2;
FormInput.DEFAULT_PROMPT_POST_WIDTH = 0;
FormInput.DEFAULT_VALIDATIONS = {
  valType: 'String',
  length: 2,
  userDefined: 'Pattern',
};

// These are dummy options, need to replace with real options
FormInput.AutoNumberRuleToken = {
  SEQUENTIAL: 0,
  UNORDERED: 1,
  ORDERED: 2,
};

if (this.constructor === FormInput) {
  deepFreeze(FormInput);
}

// let x = new FormInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4});

// console.log(x)

module.exports = { FormInput: FormInput };
