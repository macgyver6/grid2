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
  if (destinationEntity.length > 2) {
    const whichSection = (arr) => arr[arr.length - 2]
    const isSibling = (arr) => arr[arr.length - 1]
    if (whichSection(destinationEntity) === whichSection(draggedEntityAddress)) {
      if (isSibling(destinationEntity) === (isSibling(draggedEntityAddress) + 1
        || (isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1))) {
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
    console.log(previousSibling(), props.form)

    const colWidthPx = document.getElementById('0.bgrndGrd').clientWidth + 8

    const grid = () => {
      var calc = event.clientX - dropObj.mouseDownStartX;
      if (calc > 0) {
        return round(((calc / colWidthPx)), 0)
      } else {
        return round(((calc / colWidthPx)), 0)
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

    let parentEntity = address.byPath(props.form, dropObj.destinationAddress.slice(0, dropObj.destinationAddress.length - 1))
    console.log(parentEntity, parentEntity.children())
    let parentAddress = dropObj.destinationAddress.slice(0, dropObj.destinationAddress.length - 1)

    const total = (entity) => entity.prepend() + entity.width() + entity.append();

    const _parentChildren = [...parentEntity.children()]
    /**returns true if entity path provided is firstInRow; false if not
     * * @param {array} before - Path of the current entity
    */
    const firstInRow = (entityAddress) => {
      console.log(entityAddress)
      const _entityAddress = (entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1)
      var runningTotal = 0;

      for (var i = 0; i <= _entityAddress; ++i) {
        console.log(_parentChildren[i])
        runningTotal += total(_parentChildren[i]);
      }
      return (runningTotal % parentEntity.width() === 0) ? true : false;
    }

    /**
     * souroceAddress and destinationAddress ===
     * */
    if (arraysEqual(dropObj.sourceAddress, dropObj.destinationAddress)) {
      console.log('FF entity moved onto itself')

      console.log(event.clientX)

      /**mutate previous entity if necessary */
      console.log(firstInRow(dropObj.destinationAddress))
      if (!firstInRow(dropObj.destinationAddress)) {
        const previous_entity = address.byPath(props.form, previousSibling())
        console.log('ff previous entity: ', previousSibling(), {
          append: previous_entity.append() + grid()
        })
        props.mutate(previousSibling(), {
          append: previous_entity.append() + grid()
        })
      }
      console.log(dropData.action)
      /**mutate entity itself */
      console.log(dropObj.sourceAddress, {
        prepend: firstInRow(dropObj.destinationAddress) ? dropObj.initPrepend + grid() : 0,
        append: dropObj.initAppend - grid()
      })

      console.log('ff: entity itself', firstInRow(dropObj.destinationAddress))

      props.mutate(dropObj.sourceAddress, {
        prepend: firstInRow(dropObj.destinationAddress) ? dropObj.initPrepend + grid() : 0,
        append: dropObj.initAppend - grid()
      })
    }

    /** if dropped onto previous siblings append, handle */
    if (arraysEqual(dropObj.destinationAddress, previousSibling()) && event.target.id === `${dropObj.destinationEntity.UUID()}.append`) {
      const previous_entity = address.byPath(props.form, previousSibling())
      console.log('FF moved onto previous sibling')

      console.log(previous_entity.append())
      console.log('ff mutate previous sibling: ', previousSibling(), {
        append: previous_entity.append() + grid()
      })
      props.mutate(previousSibling(), {
        append: previous_entity.append() + grid()
      })

      // /**mutate entity itself */
      console.log('ff mutate entity itself: ', dropObj.sourceAddress, {
        prepend: 0,
        append: dropObj.initAppend - grid()
      })
      props.mutate(dropObj.sourceAddress, {
        prepend: 0,
        append: dropObj.initAppend - grid()
      })
    }

    /**
     * Handle sourceAddress and destinationAddress !==
     */

     /**create a function to handle restoring vacancy */

  }
}