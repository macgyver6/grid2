const deepFreeze = require('deep-freeze');
const { TextInput } = require('./TextInput.js');

/**
 * Class representing a DateTextInput.
 * @extends FormInput
 */
class DateTextInput extends TextInput {
  /**
     * Create a DateTextInput.
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
    @property {boolean} properties.tzChoice - Whether rendered representations of the input should allow for a choice of time zone for entered dates.
    @property {startingDate} properties.startingDate - The starting date which should be used for calendar-like controls within a rendered representation of this input.
     */
  constructor(properties) {
    super(properties);

    this._tzChoice = properties.tzChoice;
    this._startingDate = properties.startingDate;

    deepFreeze(this);
  }

  /**
   *
   * Whether rendered representations of the input should allow for a choice of time zone for entered dates.
   * @returns {boolean}
   * @memberof DateTextInput
   */
  tzChoice() {
    return this._tzChoice;
  }

  /**
   *
   * Get the starting date which should be used for calendar-like controls within a rendered representation of this input.
   * @returns {string}
   * @memberof DateTextInput
   */
  startingDate() {
    return this._startingDate;
  }

  /**
   *
   * Clone the text input.
   * @param {Object} props
   * @returns {DateTextInput}
   * @memberof DateTextInput
   */
  clone(props) {
    return new DateTextInput(props === undefined ? this.properties() : props);
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
      tzChoice: this.tzChoice(),
      startingDate: this.startingDate(),
      currentValidator: this.currentValidator(),
      currentDependency: this.currentDependency()
    };
  }
}

deepFreeze(DateTextInput);

// let x = new DateTextInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'type', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, tzChoice: false, startingDate: '1/1/17'});

// console.log(x.mutate({uuid: 11}))

module.exports = { DateTextInput: DateTextInput };
