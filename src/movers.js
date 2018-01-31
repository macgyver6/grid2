import { utility } from './utility';
import { address } from './address';
import { formatter } from './formatter';
import { defaultPropsFE } from './constants/defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const move = {
  mouseDownStartX: null,
  dX: null,
  mouseDownStopX: null,
  offsetInit: null,
  init_prepend: null,
  init_append: null,
  source_address: null,
  destination_address: null,
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
export const movers = {
  /**mouseDown_handler  kicks off the event pattern for an entity mutating the prepend and append sizes of itself
   * mouseMove and drop handlers are added only to the wrapper for the said entity. This was done in an attempt to reduce the event complexity on ther entities so that all other drop events other than the events they handle would not be accounted for
  */
  mouseDown_handler: (event, props) => {
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    element.addEventListener('mousemove', event => drop.mouseMove_handler(event, props))
    element.addEventListener('drop', event => drop.drop_handler(event, props))
    /**set initial properties to compute mutations against */
    move.mouseDownStartX = event.clientX;
    move.init_prepend = props.model.prepend()
    move.init_append = props.model.append()
    move.source_address = address.bySample(props.model, props.form)
    move.offsetInit = address.bySample(props.model, props.form).length > 1 ?
      round((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left), 3) :
      null
  },
  /**Give the user feedback while they are dragged.
   * If the user were to drop at the clientX of mouseMove, would it be valid?
   * Eg: Make the target drop green if valid, red if not.
   *    */
  mouseMove_handler: (event, props) => {
    const canMove = () => {
      move.valid = true;
      return true
    };
    move.dX = canMove() ? event.clientX - move.mouseDownStartX : null;
  },

  drop_handler: (event, props) => {
    console.log(event.target)
    event.stopPropagation();
    const data = JSON.parse(event.dataTransfer.getData('address'));
    if (data.action === 'move') {
      const previousSibling = () => {
        const _source_address = [...move.source_address]
        if (move.source_address[move.source_address.length - 1] > 0) {
          _source_address.splice(move.source_address.length - 1, 1, _source_address[move.source_address.length - 1] - 1)
          return _source_address
        } else {
          return null
        }
      }

      const destination_address = address.bySample(props.model, props.form)
      const source_address = move.source_address
      console.log(previousSibling(), props.form)


      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      const grid = () => {
        var calc = event.clientX - move.mouseDownStartX;
        if (calc > 0) {
          return round(((calc / bgrndGrdWidth)), 0)
        } else {
          return round(((calc / bgrndGrdWidth)), 0)
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

      let sectionEntity = address.byPath(props.form, destination_address.slice(0, destination_address.length - 1))
      console.log(sectionEntity, sectionEntity.children())
      let sectionAddress = destination_address.slice(0, destination_address.length - 1)

      const total = (entity) => entity.prepend() + entity.width() + entity.append();

      const _sectionChildren = [...sectionEntity.children()]
      /**returns true if entity path provided is firstInRow; false if not
       * * @param {array} before - Path of the current entity
      */
      const firstInRow = (entity_address) => {
        console.log(entity_address)
        const _entity_address = (entity_address.slice(entity_address.length - 1, entity_address.length + 1) - 1)
        var runningTotal = 0;

        for (var i = 0; i <= _entity_address; ++i) {
          console.log(_sectionChildren[i])
          runningTotal += total(_sectionChildren[i]);
        }
        return (runningTotal % sectionEntity.width() === 0) ? true : false;
      }

      if (arraysEqual(destination_address, previousSibling())) {
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
        console.log('ff mutate entity itself: ', move.source_address, {
          prepend: 0,
          append: move.init_append - grid()
        })
        props.mutate(move.source_address, {
          prepend: 0,
          append: move.init_append - grid()
        })
      }


      /**mutate entity itself */
      console.log(address.byPath(props.form, data.address).UUID(), props.model.UUID())



      console.log(arraysEqual(source_address, destination_address))
      if (arraysEqual(source_address, destination_address)) {
        console.log('FF entity moved onto itself')

        console.log(event.clientX)

        /**mutate previous entity if necessary */
        console.log(firstInRow(destination_address))
        if (!firstInRow(destination_address)) {
          const previous_entity = address.byPath(props.form, previousSibling())
          console.log('ff previous entity: ', previousSibling(), {
            append: previous_entity.append() + grid()
          })
          props.mutate(previousSibling(), {
            append: previous_entity.append() + grid()
          })
        }
        console.log(data.action)
        /**mutate entity itself */
        console.log(move.source_address, {
          prepend: firstInRow(destination_address) ? move.init_prepend + grid() : 0,
          append: move.init_append - grid()
        })

        console.log('ff: entity itself', firstInRow(destination_address))

        props.mutate(move.source_address, {
          prepend: firstInRow(destination_address) ? move.init_prepend + grid() : 0,
          append: move.init_append - grid()
        })
      }
    }
    /** still within the drop handler
     * remove event listeners attached onMouseDown
     */
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    if (element !== null) {
      element.removeEventListener('mousemove', drop.mouseMove_handler)
      element.removeEventListener('drop', drop.drop_handler)
    }
  }
}