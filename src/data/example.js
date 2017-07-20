"use strict";

class FormEntity {

  constructor(uuid, width, prepend, append, arrayOfThings) {
    this._uuid = uuid;
    this._width = width;
    this._prepend = FormEntity.DEFAULT_GRID_PREPEND;
    this._append = FormEntity.DEFAULT_GRID_APPEND;
    // prepend and append are both optional
    if (prepend) {
      this._prepend = prepend;
    }

    if (append) {
      this._append = append;
    }
    // this freezes the object so that this cannot be manipulated later
    Object.freeze(this);
  }

  width() {
    return this._width;
  }

  /**
   * 
   * @param {number} width 
   * @returns {FormEntity}
   * @memberof FormEntity
   * 
   */
  setWidth(width) {
    return new FormEntity(this.UUID(), width, this.prepend(), this.append());
  }

  prepend() {
    return this._prepend;
  }

  setPrepend(prepend) {
    return new FormEntity(this.UUID(), this.width(), prepend, this.append());
  }

  append() {
    return this._append;
  }

  setAppend(append) {
    return new FormEntity(this.UUID(), this.width(), this.prepend(), append);
  }

  UUID() {
    return this._uuid;
  }

  setUUID(uuid) {
    return new FormEntity(uuid, this.width(), this.prepend(), this.append());
  }


}
// these are public default values that may need to be accessed by other entities
FormEntity.DEFAULT_GRID_PREPEND = 0;
FormEntity.DEFAULT_GRID_APPEND = 0;

Object.freeze(FormEntity);


// creating a new instance of FormEntity
let x =  new FormEntity(12, 12)

// calling methods of FormEntity
// console.log(x._width)
// console.log(x.setWidth(10))

// extends all of the attributes of FormEntity
// I believe that these methods need to be recreated, or else if the methods are called, they will force the Class to revert back to being a FormEntity
class TextInput extends FormEntity {
  constructor(uuid, width) {
    super(uuid, width)
    // this._uuid = uuid
    // this._width = width
  }
}

let y = new TextInput(1, 2)

console.log(y)

module.exports =
  {
    FormEntity: FormEntity,
    TextInput: TextInput
  };

  /*
  http://devdocs.io/javascript/classes/extends
  http://csccjenk.cscc.unc.edu:8080/job/cdart2-model/javadoc/edu/unc/tcrdms/model/form/inputs/FormInput.html#getIndex--
  */