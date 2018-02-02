import { utility } from './utility';
import { address } from './address';
import { formatter } from './formatter';
import { defaultPropsFE } from './constants/defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const dropObj = {
  mouseDownStartX: null,
  dX: null,
  mouseDownStopX: null,
  offsetInit: null,
  initPrepend: null,
  initAppend: null,
  sourceAddress: null,
  destinationAddress: null,
  valid: null
}

const destinationIsSibling = (destinationEntity, draggedEntityAddress) => {
  // console.log(destinationEntity, draggedEntityAddress)
  if (destinationEntity.length > 2) {
    // console.log('larger')
    const whichSection = (arr) => arr[arr.length - 2]
    const isSibling = (arr) => arr[arr.length - 1]
    if (whichSection(destinationEntity) === whichSection(draggedEntityAddress)) {
      // console.log('sameSection')
      if (isSibling(destinationEntity) === (isSibling(draggedEntityAddress) + 1
        || (isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1))) {
        // console.log('sibling')
        return true
      }
    }
  }
}

/** all event handlers within this object are for handling an entity mutating the prepend and append sizes of itself */
export const drop = {
  /**mouseDown_handler  kicks off the event pattern for an entity mutating the prepend and append sizes of itself
   * mouseMove and drop handlers are added only to the wrapper for the said entity. This was done in an attempt to reduce the event complexity on ther entities so that all other drop events other than the events they handle would not be accounted for
  */
  mouseDown_handler: (event, props) => {
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    // element.addEventListener('mousemove', event => drop.mouseMove_handler(event, props))
    // element.addEventListener('drop', event => drop.drop_handler(event, props))
    /**set initial properties to compute mutations against */
    dropObj.mouseDownStartX = event.clientX;
    dropObj.initPrepend = props.model.prepend()
    dropObj.initAppend = props.model.append()
    dropObj.sourceAddress = address.bySample(props.model, props.form)
    dropObj.offsetInit = address.bySample(props.model, props.form).length > 1 ?
      round((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left), 3) :
      null
  },
  /**Give the user feedback while they are dragged.
   * If the user were to drop at the clientX of mouseMove, would it be valid?
   * Eg: Make the target drop green if valid, red if not.
   *    */
  mouseMove_handler: (event, props) => {
    const canMove = () => {
      dropObj.valid = true;
      return true
    };
    dropObj.dX = canMove() ? event.clientX - dropObj.mouseDownStartX : null;
  },

  drop_handler: (event, props) => {
    event.stopPropagation();
    const dropData = JSON.parse(event.dataTransfer.getData('address'));
    const previousSibling = () => {
      const _sourceAddress = [...dropObj.sourceAddress]
      if (dropObj.sourceAddress[dropObj.sourceAddress.length - 1] > 0) {
        _sourceAddress.splice(dropObj.sourceAddress.length - 1, 1, _sourceAddress[dropObj.sourceAddress.length - 1] - 1)
        return _sourceAddress
      } else {
        return null
      }
    }

    dropObj.destinationAddress = address.bySample(props.model, props.form)
    dropObj.destinationEntity = address.byPath(props.form, dropObj.destinationAddress)
    dropObj.sourceEntity = address.byPath(props.form, dropData.address)

    const colWidthPx = document.getElementById('0.bgrndGrd').clientWidth + 8

    const gridOffsetNoLocChange = () => {
      var calc = event.clientX - dropObj.mouseDownStartX;
      if (calc > 0) {
        return round(((calc / colWidthPx)), 0)
      } else {
        return round(((calc / colWidthPx)), 0)
      }
    }

    const restoreDonorSiblingAddress = (arr, props, draggedEntity) => {
      // get donor's parent
      const donorParent = address.byPath(props.form, arr.slice(0, arr.length - 1))
      console.log(arr, props, draggedEntity)
      const toLeft = (arr) => {
        const _toLeft = [...arr]
        console.log({ address: _toLeft, entity: address.byPath(props.form, _toLeft) })
          _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
          return ({ address: _toLeft, entity: address.byPath(props.form, _toLeft) })
      }
      const toRight = (arr) => {
        const _toRight = [...arr]
        _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
        return ({
          address: _toRight,
          entity: address.byPath(props.form, _toRight)
        })
      }
      console.log(donorParent.children().length === 1, (donorParent.children().length - 1 === arr[arr.length - 1]))
      /** if only 1 child in section or the donor entity is the last entity in section */
      if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1]) && firstInRow(arr)) {
      // if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1])) {
        return false
      } else if (firstInRow(arr)) {
        console.log('firstInRow: ', toRight(arr))
        return ({
          address: toRight(arr).address,
          properties:
            { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
        })
      } else {
        return ({
          address: toLeft(arr).address,
          properties: {
            append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()
          }
        })
      }
    }

    const arraysEqual = (a, b) => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    /**mutate previous sibling if necessary*/

    // let parentEntity = address.byPath(props.form, dropObj.destinationAddress.slice(0, dropObj.destinationAddress.length - 1))
    // console.log(parentEntity, parentEntity.children())
    let parentAddress = dropObj.destinationAddress.slice(0, dropObj.destinationAddress.length - 1)

    const total = (entity) => entity.prepend() + entity.width() + entity.append();

    // const _parentChildren = [...parentEntity.children()]
    /**returns true if entity path provided is firstInRow; false if not
     * * @param {array} before - Path of the current entity
    */
    const firstInRow = (entityAddress) => {
      const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1))
      // console.log(entityAddress )
      const _entityAddress = (entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1)
      var runningTotal = 0;
      // console.log(_entityAddress, section.children())
      for (var i = 0; i <= _entityAddress; ++i) {
        // console.log(section)
        runningTotal += total(section.children()[i]);
      }
      return (runningTotal % section.width() === 0) ? true : false;
    }

    /**
     * sourceAddress and destinationAddress ===
     * */
    if (arraysEqual(dropObj.sourceAddress, dropObj.destinationAddress)) {
      // console.log('FF entity moved onto itself')

      // console.log(event.clientX)

      /**mutate previous entity if necessary */
      // console.log(firstInRow(dropObj.destinationAddress))
      if (!firstInRow(dropObj.destinationAddress)) {
        const previous_entity = address.byPath(props.form, previousSibling())
        // console.log('ff at to append of previous entity: ', previousSibling(), {
        //   append: previous_entity.append() + gridOffsetNoLocChange()
        // })
        // console.log(previousSibling(), {
        //   append: previous_entity.append() + gridOffsetNoLocChange()
        // })
        props.mutate(previousSibling(), {
          append: previous_entity.append() + gridOffsetNoLocChange()
        })
      }

      // console.log('ff: entity itself', firstInRow(dropObj.destinationAddress))
      // console.log(firstInRow(dropObj.destinationAddress))
      const entityToMutate = {
        prepend: firstInRow(dropObj.destinationAddress) ? dropObj.initPrepend + gridOffsetNoLocChange() : 0,
        append: dropObj.initAppend - gridOffsetNoLocChange()
      }
      // console.log(dropObj.sourceAddress, entityToMutate)
      props.mutate(dropObj.sourceAddress, entityToMutate)

    } else if (arraysEqual(dropObj.destinationAddress, previousSibling()) && event.target.id === `${dropObj.destinationEntity.UUID()}.append`) {

      /**
       * if dropped onto previous siblings append, handle
       * */
      const previous_entity = address.byPath(props.form, previousSibling())
      // console.log('FF moved onto previous sibling')

      // console.log(previous_entity.append())
      // console.log('ff mutate previous sibling: ', previousSibling(), {
      //   append: previous_entity.append() + gridOffsetNoLocChange()
      // })
      props.mutate(previousSibling(), {
        append: previous_entity.append() + gridOffsetNoLocChange()
      })

      // /**mutate entity itself */
      // console.log('ff mutate entity itself: ', dropObj.sourceAddress, {
      //   prepend: 0,
      //   append: dropObj.initAppend - gridOffsetNoLocChange()
      // })
      props.mutate(dropObj.sourceAddress, {
        prepend: 0,
        append: dropObj.initAppend - gridOffsetNoLocChange()
      })
    } else {

      const gridOffsetLocChange = () => {
        const leftBound = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`).getBoundingClientRect().left
        var calc = event.clientX - leftBound - dropObj.offsetInit;
        if (calc > 0) {
          return round(((calc / colWidthPx)), 0)
        } else {
          return round(((calc / colWidthPx)), 0)
        }
      }
      // console.log('change of addresses')
      // 1. mutate destination
      // 2. add
      // 3. mutate origin sibling for vacancy
      // 4. remove
      const toBeMutated = {
        prepend: event.target.id === `${props.model.UUID()}.append` ? props.model.prepend() :
          0,
        append: event.target.id === `${props.model.UUID()}.append` ? gridOffsetLocChange() - props.model.prepend() - props.model.width() :
          props.model.append()
      }
      console.log(event.clientX,
        document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`).getBoundingClientRect().left,

        dropObj.offsetInit,


        gridOffsetLocChange(), props.model.prepend(), props.model.width())

      const updatedAddress = dropObj.destinationAddress.map((val, index, array) => index === array.length - 1 ? val -= 1 : val);
      console.log('destination sibling toBeMutated: ', dropObj.destinationAddress, toBeMutated)
      props.mutate(dropObj.destinationAddress, toBeMutated)

      const updatedAddress2 = dropObj.destinationAddress.map((val, index, array) => index === array.length - 1 ? val -= 1 : val);
      const toBeMutatedRestore = restoreDonorSiblingAddress(dropObj.sourceAddress, props, dropObj.sourceEntity)
      // if (!arraysEqual(toBeMutatedRestore.address, dropObj.destinationAddress)) {
        console.log('restore sibling: ', toBeMutatedRestore)

      if (toBeMutatedRestore) {
        props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties)
      }

      console.log(dropObj.sourceAddress, dropObj.destinationAddress)
      const toBeDeleted = dropObj.sourceAddress
      console.log('toBeDeleted: ', toBeDeleted)
      props.remove(toBeDeleted)

      const _destinationAddress = [...dropObj.destinationAddress]
      _destinationAddress[dropObj.destinationAddress.length - 1] = dropObj.destinationAddress[dropObj.destinationAddress.length - 1] + 1
      const whereToAdd = destinationAddress => event.target.id === `${props.model.UUID()}.prepend` ? destinationAddress : _destinationAddress
      const toBeAdded = address.resurrectEntity(Object.assign({}, dropObj.sourceEntity.properties(), {
        prepend: event.target.id === `${props.model.UUID()}.prepend` ? gridOffsetLocChange() : 0,
        append: event.target.id === `${props.model.UUID()}.append` ? total(props.model) - gridOffsetLocChange() - dropObj.sourceEntity.width() : props.model.prepend() - dropObj.sourceEntity.width() - gridOffsetLocChange()
        // append: 1
      }))

      console.log('whereToAdd: ', whereToAdd(dropObj.destinationAddress), toBeAdded)

      props.add(whereToAdd(dropObj.destinationAddress), toBeAdded)

    }

    /**
     * Handle sourceAddress and destinationAddress !==
     */

    // if (dropObj.sourceAddress !== dropObj.destinationAddress && event.target.id !== `${data.model.uuid}.${data.model.uuid.type}.append` )
    //   {
    //     console.log('addreses dont match')
    //    console.log(dropObj.destinationAddress, dropObj.sourceAddress)
    //     console.log(destinationIsSibling(dropObj.destinationAddress, dropObj.sourceAddress))
    //   }

    /**create a function to handle restoring vacancy */



  }
}