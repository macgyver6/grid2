import { utility } from './utility';
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

export const movers = {
  mouseDownToMove_handler: (event, props) => {
    move.mouseDownStartX = event.clientX;
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    element.addEventListener('mousemove', event => movers.mouseMove_handler(event, props))
    element.addEventListener('dragend', event => movers.dragEnd_handler(event, props))

    move.init_prepend = props.model.prepend()
    move.init_append = props.model.append()
    move.source_address = utility.findNode(props.model, props.form)

    move.offsetInit = utility.findNode(props.model, props.form).length > 1 ?
      round((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left), 3) :
      null
  },

  mouseMove_handler: (event, props) => {
    const canMove = () => {
      move.valid = true;
      return true
    };
    move.dX = canMove() ? event.clientX - move.mouseDownStartX : null;
  },

  dragEnd_handler: (event, props) => {
    console.log(event.target)
    if (move.valid) {
      move.mouseDownStopX = event.clientX;

      // const grid = () => {
      //   var calc = event.clientX - move.mouseDownStartX;
      //   if (calc > 0) {
      //     return round(((calc / bgrndGrdWidth)), 0)
      //   } else {
      //     return round(((calc / bgrndGrdWidth)), 0)
      //   }
      // }
      const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
      if (element !== null) {
        element.removeEventListener('mousemove', movers.mouseMove_handler)
        element.removeEventListener('dragend', movers.dragEnd_handler)
        /**mutate previous sibling if necessary*/
        // if (move.source_address[move.source_address.length - 1] > 0) {
        //   const previousSibling = [...move.source_address]
        //   previousSibling[previousSibling.length - 1] = previousSibling[previousSibling.length - 1] - 1
        //   props.mutateformentity(previousSibling, {
        //     append: utility.findEntityByPath(props.form, previousSibling).append() + grid()
        //   })
        // }

        /**mutate entity itself */
        // props.mutateformentity(move.source_address, {
        //   // prepend: move.init_prepend + grid(),
        //   append: move.init_append - grid()
        // })
      }
    }
  },
  // dragOver_handler: (event) => {
  //   event.preventDefault()
  // },

  drop_handler: (event, props) => {
    console.log(event.target)
    event.stopPropagation();
    const data = JSON.parse(event.dataTransfer.getData('address'));
    if (data.action != 'addEntity') {
      const previousSibling = () => {
        const _source_address = [...move.source_address]
        if (move.source_address[move.source_address.length - 1] > 0) {
          _source_address.splice(move.source_address.length - 1, 1, _source_address[move.source_address.length - 1] - 1)
          return _source_address
        } else {
          return null
        }
      }

      const destination_address = utility.findNode(props.model, props.form)
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
      // console.log('ff ',)
      // console.log(utility.findEntityByPath(props.form, previousSibling).UUID())
      let sectionEntity = utility.findEntityByPath(props.form, destination_address.slice(0, destination_address.length - 1))
      console.log(sectionEntity, sectionEntity.children())
      let sectionAddress = destination_address.slice(0, destination_address.length - 1)

      const total = (entity) => entity.prepend() + entity.width() + entity.append();

      const _sectionChildren = [...sectionEntity.children()]
      // const firstInRow = (before) => {
      //   // var runningTotal = 0;
      //   if (before === -1) {return true} else
      //   var runningTotal = 0;
      //   {for (var i = 0; i < before; i++) {
      //     console.log(i)
      //      runningTotal += total(_sectionChildren[i])
      //   }
      //   return (runningTotal % sectionEntity.width() === 0) ? true : false}
      // }

      // function firstInRow(before) {
      //   var runningTotal = 0;

      //   for (var i = 0; i < before; ++i) {
      //     runningTotal += total(_sectionChildren[i]);
      //     console.log(runningTotal += total(_sectionChildren[i]), i, before)
      //   }
      //   console.log(runningTotal)
      //   return (runningTotal % sectionEntity.width() === 0) ? true : false
      // };

      function firstInRow(before) {
        var runningTotal = 0;

        for (var i = 0; i <= before; ++i) {
          console.log(_sectionChildren[i])
          runningTotal += total(_sectionChildren[i]);
        }
        return (runningTotal % sectionEntity.width() === 0) ? true : false;
      }

      if (arraysEqual(destination_address, previousSibling())) {
        const previous_entity = utility.findEntityByPath(props.form, previousSibling())
        console.log('FF moved onto previous sibling')

        console.log(previous_entity.append())
        console.log('ff mutate previous sibling: ', previousSibling(), {
          append: previous_entity.append() + grid()
        })
        props.mutateformentity(previousSibling(), {
          append: previous_entity.append() + grid()
        })

        // /**mutate entity itself */
        console.log('ff mutate entity itself: ', move.source_address, {
          prepend: 0,
          append: move.init_append - grid()
        })
        props.mutateformentity(move.source_address, {
        prepend: 0,
          append: move.init_append - grid()
      })
      }


      /**mutate entity itself */
      console.log(utility.findEntityByPath(props.form, data.address).UUID(), props.model.UUID())



      console.log(arraysEqual(source_address, destination_address))
      if (arraysEqual(source_address, destination_address)) {
        console.log('FF entity moved onto itself')



        /**mutate previous entity if necessary */
        if (!firstInRow((destination_address.slice(destination_address.length - 1, destination_address.length + 1) - 1))) {
          // if (move.init_append - grid() === 0 && grid() > 0 && previousSibling()) {
          const previous_entity = utility.findEntityByPath(props.form, previousSibling())
          console.log('ff previous entity: ', previousSibling(), {
            append: previous_entity.append() + grid()
          })
          props.mutateformentity(previousSibling(), {
            append: previous_entity.append() + grid()
          })
        }
        /**mutate entity itself */
        console.log(move.source_address, {
          prepend: firstInRow(destination_address.slice(destination_address.length - 1, destination_address.length + 1) - 1) ? move.init_prepend + grid() : 0,
          append: move.init_append - grid()
        })

        console.log('ff: entity itself', firstInRow(destination_address.slice(destination_address.length - 1, destination_address.length + 1) - 1) )

        props.mutateformentity(move.source_address, {
          prepend: firstInRow(destination_address.slice(destination_address.length - 1, destination_address.length + 1) - 1) ? move.init_prepend + grid() : 0,
          append: move.init_append - grid()
        })
      }
    }
  }
}