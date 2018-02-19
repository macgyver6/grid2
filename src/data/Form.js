const deepFreeze = require('deep-freeze');
/** Class representing a Form.
 * See {@link http://csccjenk.cscc.unc.edu:8080/job/cdart2-model/javadoc/edu/unc/tcrdms/model/form/Form.html}
*/
class Form {
  /**
   * Create a Form.
   * @param {Object} properties
   * @param {string} properties.type - The type of the entity(form).
   * @param {number} properties.uuid - The UUID of the form.
   * @param {number} properties.version - The major version of the form.
   * @param {boolean} properties.autoId - Whether children inputs have their external IDs generated automatically.
   * @param {array} properties.children - The entities which exist directly beneath the form.
   * @param {string} properties.crf - The CRF that this form belongs to.
   * @param {array} properties.inputs - Produce a list of the inputs in the given list, descending into form sections contained in the list as required (depth-first search).
   * @param {object} properties.remoteValidatorCondition - Get the remote validator conditions contained within the given composite condition.
   * @param {boolean} properties.sectionTabs - Get whether top-level FormSection entities should be considered as tabs.
   * @param {string} properties.versionDescription - The version description of the form.
   */
  constructor(properties) {

    this._type = properties.type;
    this._uuid = properties.uuid;
    this._version = properties.version || Form.DEFAULT_VERSION;
    this._autoId = properties.autoId;
    this._children = properties.children;
    this._crf = properties.crf;
    this._inputs = properties.inputs;
    this._remoteValidatorCondition = properties.remoteValidatorCondition;
    this._sectionTabs = properties.sectionTabs;
    this._versionDescription = properties.versionDescription;

    // if Form is not being inherited by another class, recursively freeze all properties to prevent mutation

    if (this.constructor === Form) {
      deepFreeze(this);
    };

  };

  /**
   * Get the type of the form.
   * @return {string}
   * @memberof Form
   */
  type() {
    return this._type;
  };

  /**
   * Get the major version of the form.
   * @return {boolean}
   * @memberof Form
   */
  version() {
    return this._version;
  };

  /**
   * Get whether children inputs have their external IDs generated automatically.
   * @return {array}
   * @memberof Form
   */
  children() {
    return this._children;
  };

    /**
   * Set the children of the form.
   *
   * @param {FormSection[]} children
   * @returns {Form} - copy of the form section with the given children
   * set
   */
  setChildren(children)
  {
    return this.mutate({children : children});
  }

  /**
   * Gets the CRF that this form belongs to.
   * @return {string}
   * @memberof Form
   */
  crf() {
    return this._crf;
  };

  /**
   * Get the UUID of the form.
   * @returns {Form}
   * @memberof Form
   */
  UUID() {
    return this._uuid;
  };

  /**
   * Produce a list of the inputs in the given list, descending into form sections contained in the list as required (depth-first search).
   * @returns {array}
   * @memberof Form
   */
  inputs() {
    return this._inputs;
  };

  /**
   * Get the remote validator conditions contained within the given composite condition.
   * @returns {Object}
   * @memberof Form
   */
  remoteValidatorCondition() {
    return this._remoteValidatorCondition;
  };

  /**
   * Get whether top-level FormSection entities should be considered as tabs.
   * @returns {boolean}
   * @memberof Form
   */
  sectionTabs() {
    return this._sectionTabs;
  };

  /**
   * Get the version description of the form.
   * @returns {boolean}
   * @memberof Form
   */
  versionDescription() {
    return this._versionDescription;
  };

  /**
   * Whether children inputs have their external IDs generated automatically.
   * @returns {boolean}
   * @memberof Form
   */
  autoId() {
    return this._autoId;
  };

  /**
   *
   * Returns public properties of a form entity.
   * @returns {Object}
   */
  properties() {
    return {
      type: this.type(),
      uuid: this.UUID(),
      version: this.version(),
      autoId: this.autoId(),
      children: this.children(),
      crf: this.crf(),
      inputs: this.inputs(),
      remoteValidatorCondition: this.remoteValidatorCondition(),
      sectionTabs: this.sectionTabs(),
      versionDescription: this.versionDescription()
    };
  }

  /**
   *
   * Clone the form entity.
   * @param {Object} props
   * @returns {Form}
   * @memberof Form
   */
  // throw failed to provide valid class....
  clone(props) {
    return new Form(props === undefined ? this.properties() : props);
  }

  /**
   *
   * Mutate the form.
   * @param {Object} newProperties
   * @returns {Form}
   * @memberof Form
   */
  mutate(newProperties) {
    // take in properties and newProperties wins
    var properties = this.properties();
    // if key exists in new props, use, if not, use existing
    for (var key in properties) {
      if (newProperties.hasOwnProperty(key)) {
        properties[key] = newProperties[key]
      }
    }
    return this.clone(properties);
  };
};

Form.DEFAULT_VERSION = 1;

// if (this.constructor === Form) {
//     deeepFreeze(Form);
// }

// create a new Form
// var test = new Form({ uuid: 10, version: 1, autoId: true, children: [0, 1, 0], crf: 'crf', inputs: ['input1', 'input2'], remoteValidatorCondition: { 0: 'zero', 1: 'one' }, sectionTabs: false, versionDescription: 'version description' })
// console.log(test)
// console.log(test.mutate({ versionDescription: 'test description' }))

module.exports =
  {
    Form: Form
  };