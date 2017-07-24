const deepFreeze = require('deep-freeze');
const { TextInput } = require('./TextInput.js')

/**
 * Class representing a CDSTextInput.
 * @extends FormInput
 */
class CDSTextInput extends TextInput {
  /**
     * Create a CDSTextInput.
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
    @property {string} properties.script - Get the script which should be evaluated to produce the value of the input.
    @property {boolean} properties.editeable - Whether the input implementation may be made editable.
     */
  constructor(properties) {
    super(properties);

    this._script = properties.script;
    this._editeable = properties.editeable;
    
    deepFreeze(this);
        
  }

  /**
    * 
    * Get the script which should be evaluated to produce the value of the input.
    * @returns {string}
    * @memberof CDSTextInput
    */
  script() {
    return this._script;
  }

  /**
    * 
    * Whether the input implementation may be made editable.
    * @returns {boolean}
    * @memberof CDSTextInput
    */
  editeable() {
    return this._editeable;
  }


  /**
   * 
   * Clone the text input.
   * @param {Object} props 
   * @returns {CDSTextInput}
   * @memberof CDSTextInput
   */
  clone(props) {
    return new CDSTextInput(props === undefined ? this.properties() : props);
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
      postPrompt: this.postPromptWidth(),
      postPromptWidth: this.postPromptWidth(),
      name: this.name(),
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
      script: this.script(),
      editing: this.editeable()
    };
  }
}

deepFreeze(CDSTextInput);

let x = new CDSTextInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, editeable: false, script: 'script'});

console.log(x)

module.exports = { CDSTextInput: CDSTextInput }