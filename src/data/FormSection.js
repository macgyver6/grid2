"use strict";

const deepFreeze = require('deep-freeze');
const { FormEntity } = require('./FormEntity.js');

/**
 * Class representing a FormSection.
 * @extends FormEntity
 * See {@link http://csccjenk.cscc.unc.edu:8080/job/cdart2-model/javadoc/edu/unc/tcrdms/model/form/FormSection.html}
 */
class FormSection extends FormEntity {
  /**
     * Create a FormSection.
     * @param {Object} properties 
     * @param @property {number} properties.uuid
     * @param @property {number} properties.width Description of width
     * @param @property {array} properties.children
     * @param @property {string} properties.legend
     * @param @property {number} properties.prepend
     * @param @property {number} properties.append
     */
  constructor(properties) {
    super(properties)
    this._children = properties.children;
    this._legend = properties.legend;

    deepFreeze(this);

  };



  /**
    * The children of the form section

    * @returns {FormEntity[]}
    * @memberof FormSection
    */
  children() 
  {
    return this._children;
  };

  /**
   * Set the children of the form section.
   * 
   * @param {FormEntity[]} children 
   * @returns {FormSection} copy of the form section with the given children
   * set
   */
  setChildren(children)
  {
    return this.mutate({children : children});
  }

  /**
    * 
    * Get the legend of the form section.
    * @returns {FormSection}
    * @memberof FormSection
    */
  legend() {
    return this._legend;
  };

  /**
     * 
     * Clone the form section.
     * @param {Object} props 
     * @returns {FormSection}
     * @memberof FormSection
     */
  clone(props) {
    return new FormSection(props === undefined ? this.properties() : props);
  }

  /**
   * 
   * Returns public properties of a form section.
   * @returns {Object}
   */
  properties() {
    return {
      uuid: this.UUID(),
      width: this.width(),
      prepend: this.prepend(),
      append: this.append(),
      children: this.children(),
      legend: this.legend()
    };
  }
};

deepFreeze(FormSection);

// let x = new FormSection({uuid: 1, width: 2, children: ['children'], legend: 'string', prepend: 3, append: 4})
// console.log(x.mutate({width: 1201}))

module.exports = { FormSection: FormSection };