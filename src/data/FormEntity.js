const deepFreeze = require('deep-freeze');
const uuidv4 = require('uuid/v4');

/** Class representing a FormEntity.
 * See {@link http://csccjenk.cscc.unc.edu:8080/job/cdart2-model/javadoc/edu/unc/tcrdms/model/form/FormSection.html}
*/
class FormEntity {
    /**
     * Create a FormEntity.
     * @param {Object} properties
     * @param {string} properties.type - Type of form entity.
     * @param {number} properties.uuid - UUID of form entity.
     * @param {number} properties.width - Width (in grid units) of the form entity.
     * @param {number} properties.prepend - Get the number of grid units prepended to rendered representations of the form entity.
     * @param {number} properties.append - Get the number of grid units appended to rendered representations of the form entity.
     */
    constructor(properties) {
        this._type = properties.type;
        this._uuid = uuid()
        this._width = properties.width;
        this._prepend = properties.prepend || FormEntity.DEFAULT_GRID_PREPEND;
        this._append = properties.append || FormEntity.DEFAULT_GRID_APPEND;

        function uuid() {
            if (!properties.hasOwnProperty("uuid") || properties["uuid"] === undefined) {
                let num = uuidv4()
                console.log('creating new uuid: ', num)
                return num
            }
            console.log('using existing uuid: ', properties.uuid)
            return properties.uuid
        }

        // if FormEntity is not being inherited by another class, recursively freeze all properties to prevent mutation

        if (this.constructor === FormEntity) {
            deepFreeze(this);
        };

    };

    /**
     * Get the type of the form entity.
     * @return {string}
     * @memberof FormEntity
     */
    type() {
        return this._type;
    };

    /**
     * Get the Width (in grid units) of the form entity.
     * @return {number}
     * @memberof FormEntity
     */
    width() {
        return this._width;
    };

    /**
     * Get the number of grid units prepended to rendered representations of the form entity.
     * @return {number}
     * @memberof FormEntity
     */
    prepend() {
        return this._prepend;
    };

    /**
     * Get the number of grid units appended to rendered representations of the form entity.
     * @return {number}
     * @memberof FormEntity
     */
    append() {
        return this._append;
    };

    /**
     * Get the UUID of the form entity.
     * @returns {FormEntity}
     * @memberof FormEntity
     */
    UUID() {
        return this._uuid;
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
            prepend: this.prepend(),
            append: this.append(),
            width: this.width()
        };
    }

    /**
     *
     * Clone the form entity.
     * @param {Object} props
     * @returns {FormEntity}
     * @memberof FormEntity
     */
    // throw failed to provide valid class....
    clone(props) {
        throw new Error('Illegal instatiation - cannot instantiate a FormEntity directly');
    }

    /**
     *
     * Mutate the form entity.
     * @param {Object} newProperties
     * @returns {FormEntity}
     * @memberof FormEntity
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

FormEntity.DEFAULT_GRID_PREPEND = 2;
FormEntity.DEFAULT_GRID_APPEND = 2;

// if (this.constructor === FormEntity) {
//     deeepFreeze(FormEntity);
// }

// create a new FormEntity
// let x = 66
// var test = new FormEntity({uuid: 10, width: x})
// console.log(test)
// console.log(test.mutate({width: 101}))

module.exports =
    {
        FormEntity: FormEntity
    };