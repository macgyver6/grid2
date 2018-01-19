import React from 'react';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';
import { aux } from '../../../constants/aux';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const resizeStyle = {
  width: '20px',
  height: '20px',
  backgroundColor: 'yellow',
  position: 'absolute',
  right: 0,
  bottom: 0,
  cursor: 'w-resize'
}

// let source = null
const resize = {
  init: null,
  init_grids: null,
  init_append: null,
  init_children: null,
  changed: null,
  grids: null,
  reset: null
}

let drag_handler = (event, props) => {
  console.log('dragHandler resizer')
  event.stopPropagation();
  resize.reset = false
  let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
  console.log(locEntity[1].type())
  let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity[0].length - 1))
  const minWidth = defaultPropsFE[props.model.type()].render.minWidth
  const maxWidth = parentEntity.width();
  if (resize.init === null) {
    resize.init = event.pageX
    resize.init_grids = props.model.width()
    resize.init_append = props.model.append()
  }
  let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

  const grid = () => {
    var calc = event.pageX - resize.init;
    if (calc > 0) {
      return round(((calc / bgrndGrdWidth)), 0)
    } else {
      return round(((calc / bgrndGrdWidth)), 0)
    }
  }

  console.log(grid())

  if (resize.grids !== grid() && event.pageX !== 0) {
    resize.grids = grid()
    if (!can_resize(minWidth, maxWidth)) {
      resize.reset = null
      document.getElementById(`${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'red'
      //  let timer =  setTimeout(function () {
      //     resize.reset != null ? mutate2(locEntity, props) : null
      //     }, 600)
    } else {
      document.getElementById(
        `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'lightgreen'
      console.log(`changing ${props.model.UUID()}.${props.model.type()}color to 'lightgreen`)
      console.log('resize check which type')
      if (locEntity[1].type() === 'FormSection') {
        console.log('resize FormSection')
        resize.init_children === null ?
          resize.init_children = locEntity[1].children() :
          null

        // map through children starting here
        if (locEntity[1].children().length > 0) {

          const total = (prepend, width, append) => prepend + width + append;
          const _children = resize.init_children.map(child => {
            return Object.assign({}, child.properties(), {
              total: total(child.prepend(), child.width(), child.append()),
              row: null,
              index: null
            })
          })
          const sectionWidth = resize.init_grids + grid()

          var counter = 0;
          const reducer = (accumulator, currentValue, currentIndex) => {
            console.log('current index: ', currentIndex)
            console.log('counter: ', counter)
            console.log('accumulator: ', accumulator)
            if (!Array.isArray(accumulator)) { accumulator = [].concat(accumulator) }
            if (accumulator)
              // return last entity in section

              if ((_children.length - 1) === currentIndex) {
                console.log('last');

                if ((
                  total(accumulator[accumulator.length - 1].prepend, accumulator[accumulator.length - 1].width, accumulator[accumulator.length - 1].append) +

                  total(_children[_children.length - 1].prepend, accumulator[accumulator.length - 1].width, accumulator[accumulator.length - 1].append)
                ) > sectionWidth) {
                  counter++;
                  console.log('last and cant add new row: ')
                  accumulator[accumulator.length] = (Object.assign({}, _children[currentIndex], { index: 0, row: counter }));
                  return accumulator
                } else {
                  console.log(accumulator)
                  console.log('last and all can be same row: ', accumulator[accumulator.length - 1])
                  _children.map((entity, index) => {
                    Object.assign({}, entity, { row: 0 })
                  })
                  const occupiedColumnsInRow = (entities, prop) => {
                    return entities.reduce((a, b) => {
                      // console.log(a, b)
                      console.log('yes, yes: ', a, b)
                      if (b.row === _children[_children.length - 1].row) {
                        return a + b[prop];
                      } else {
                        return a
                      }
                    }, 0)
                  }
                  accumulator[accumulator.length] = Object.assign({}, _children[currentIndex],
                    {
                      append: _children[currentIndex].append + (sectionWidth - occupiedColumnsInRow(_children, 'total'))
                    });
                  return accumulator
                }
                counter = 0;
              }
            // return sum of each entity < section.width
            console.log('is ' + total(accumulator[accumulator.length - 1].prepend, accumulator[accumulator.length - 1].width, accumulator[accumulator.length - 1].append) + ' plus ' + total(_children[currentIndex].prepend, _children[currentIndex].width, _children[currentIndex].append) + ' less than or equal to sectionWidth ');

            if ((total(accumulator[accumulator.length - 1].prepend, accumulator[accumulator.length - 1].width, accumulator[accumulator.length - 1].append) + total(_children[currentIndex].prepend, _children[currentIndex].width, _children[currentIndex].append)) <= sectionWidth) {
              // (counter++);
              console.log('yes')
              accumulator[accumulator.length - 1] = (Object.assign({}, _children[currentIndex - 1], { index: 0, row: counter }));

              accumulator[accumulator.length] = Object.assign({}, _children[currentIndex], {
                index: currentIndex - 1,
                row: counter
              })
              return accumulator
            } else {
              (counter++);
              console.log('no')
              console.log('counter: ', counter)

              const occupiedColumnsInRow = (entities, prop) => {
                return entities.reduce((a, b) => {
                  if (b.row === accumulator[accumulator.length - 1].row) {
                    return a + b[prop];
                  } else {
                    return a
                  }
                }, 0)
              }


              accumulator[accumulator.length - 1] = Object.assign({}, accumulator[accumulator.length - 1], {
                total:
                  total(accumulator[accumulator.length - 1].prepend, accumulator[accumulator.length - 1].width, accumulator[accumulator.length - 1].append) + (sectionWidth - occupiedColumnsInRow(accumulator, 'total')),
                index: ((accumulator.length - 2) + 1),
                row: counter - 1
              })

              accumulator[accumulator.length] = { total: total(_children[currentIndex].prepend, _children[currentIndex].width, _children[currentIndex].append), index: 0, row: counter };
              return accumulator
            }
          };
          const updatedChildren = _children.reduce(reducer)
          console.log(updatedChildren)

          // map through children finishing here
          // console.log(resize.init_children[0].UUID(), Object.assign({}, resize.init_children[0], { append: resize.init_children[0].append() + resize.grids }))
          console.log(resize.init_children[0].prepend(), locEntity[1].setChildren(
            [utility.resurrectEntity(Object.assign({}, resize.init_children[0].properties(), { append: resize.init_children[0].append() + resize.grids }))
            ]))

          props.mutateformentity(locEntity[0], {
            width: (resize.init_grids + resize.grids),
            append: (resize.init_append - resize.grids),
            children: props.model.children().length === 1 ?
              [utility.resurrectEntity(Object.assign({}, resize.init_children[0].properties(), { append: resize.init_children[0].append() + resize.grids }))]
              :
              updatedChildren.map(child => utility.resurrectEntity(child, props.form))
          })
          console.log(updatedChildren)
        }
      }
      console.log('resize entity other than FormSection')
      props.mutateformentity(locEntity[0], {
        width: (resize.init_grids + resize.grids),
        append: (resize.init_append - resize.grids)
      })
    }
  }
}

const can_resize = (minWidth, maxWidth) => {
  if (resize.init_grids + resize.grids - 1 < maxWidth && resize.init_grids + resize.grids > minWidth) {
    console.log(minWidth, maxWidth, '867, valid resize')
    return true
  } else {
    console.log(minWidth, maxWidth, '867, invalid resize')
    return false
  }
}

// const mutate2 = (locEntity, props) => {
//   props.removeformentity(locEntity[0])
//   props.addformentity(utility.resurrectEntity(
//     Object.assign({},
//       locEntity[1].properties(), {
//         width: (resize.init_grids),
//         append: (resize.init_append),
//       })
//   ), locEntity[0])
// }

let dragstart_handler = (event, props) => {
  event.stopPropagation();
  // event.dataTransfer.setData("address", JSON.stringify({
  //   action: 'move',
  //   address: utility.findNode(props.model, props.form)
  // }))
  aux.dragStart_handler(event, props.model, props.form, 'resize')
}

let dragend_handler = function (event, props) {
  event.preventDefault();

  resize.init = null
  resize.init_grids = null
  resize.init_append = null
  resize.init_children = null
  resize.changed = null
  resize.grids = null
  resize.reset = null

  const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`)
  // setTimeout(function () { element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor }, 120);
  console.log('change this: ', element.id + 'to: ' + defaultPropsFE[props.model.type()].render.backgroundColor)
  element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
}

let Resizer = (props) =>
  <div
    id={`${props.model.UUID()}.resizer`}
    className='resizer'
    style={resizeStyle}
    onDrag={(event) => drag_handler(event, props)}
    onDragStart={(event) => dragstart_handler(event, props)}
    onDragEnd={(event) => dragend_handler(event, props)}
    draggable='true'
  >
  </div>

export default Resizer;