const deepFreeze = require('deep-freeze');
const { FormInput } = require('./FormInput.js');

/**
 * Class representing a SelectionInput.
 * @extends FormInput
 */
class SelectionInput extends FormInput {
  /**
   * Create a SelectionInput.
   * @param {mode} renderMode
   * @property {boolean} properties.autoTab - Whether the input is defined as permitting auto tab to the next field during data collection.
   * @property {string} properties.QxQ - Field to provide additional information that may assist the user in filling out the form. This is rendered in a "tool tip", or if a TextBlock Entity property "QxQ" is true, the currently selected entity's QxQ information will be rendered in this field.
   */
  constructor(properties) {
    super(properties);

    this._options = properties.options;
    // this._renderMode = SelectionInput.RenderMode[properties.renderMode];
    this._renderMode = properties.renderMode;
    this._autoTab = properties.autoTab;

    deepFreeze(this);
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
   * Get the options which comprise the input.
   * @returns {array}
   * @memberof SelectionInput
   */
  options() {
    return this._options;
  }

  /**
   *
   * Clone the form entity.
   * @param {Object} props
   * @returns {SelectionInput}
   * @memberof SelectionInput
   */
  clone(props) {
    return new SelectionInput(props === undefined ? this.properties() : props);
  }

  /**
   *
   * Get the render mode of the selection input.
   * @returns {string}
   * @memberof SelectionInput
   */
  renderMode() {
    return this._renderMode;
  }

  /**
   *
   * Returns public properties of a selection input.
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
      options: this.options(),
      renderMode: this.renderMode(),
      currentValidator: this.currentValidator(),
      currentDependency: this.currentDependency(),
      autoTab: this.autoTab(),
    };
  }
}
/**
 * @readonly
 * @enum {number}
 */
SelectionInput.RenderMode = {
  MENU: 0,
  RADIO: 1,
};

deepFreeze(SelectionInput);

// var x = new SelectionInput({
//   uuid: 10,
//   width: 10,
//   options: ['true'],
//   prepend: 10,
//   append: 10,
//   sasCodeLabel: 'sasCodeLabel',
//   name: 'name',
//   prePrompt: 'prePrompt',
//   prePromptWidth: 12,
//   postPrompt: 'postPrompt',
//   postPromptWidth: 12,
//   renderMode: 'MENU',
//   type: 'selection',
//   tabOrder: [1, 2, 3],
//   inputWidth: 33,
//   promptNumber: 'promptNumber',
//   autoNumber: 'SEQUENTIAL',
// });
// console.log(x.mutate({ width: 2003 }));

module.exports = { SelectionInput: SelectionInput };
