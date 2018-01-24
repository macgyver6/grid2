import { utility } from './utility';
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
  address: null,
  valid: null
}

export const movers = {

  mouseDownToMove_handler: (event, props ) => {
    console.log(event, props)
    move.mouseDownStartX = event.clientX;
    console.log(props)

    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    element.addEventListener('mousemove', event => movers.mouseMove_handler(event, props))
    element.addEventListener('dragend', event => movers.dragEnd_handler(event, props))

    move.init_prepend = props.model.prepend()
    move.init_append = props.model.append()
    move.address = utility.findNode(props.model, props.form)

    move.offsetInit = utility.findNode(props.model, props.form).length > 1 ?
      round((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left), 3) :
      null
  },
  mouseMove_handler: (event, props ) => {
    const canMove = () => {
      move.valid = true;
      return true
    };
    move.dX = canMove() ? event.clientX - move.mouseDownStartX : null;
  },

  dragLeave_handler: (event) => {
    move.valid = false;
  },

  dragEnd_handler: (event, props) => {
    console.log(event.type)
    if (move.valid) {

      move.mouseDownStopX = event.clientX;

      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      const grid = () => {
        var calc = event.clientX - move.mouseDownStartX;
        if (calc > 0) {
          return round(((calc / bgrndGrdWidth)), 0)
        } else {
          return round(((calc / bgrndGrdWidth)), 0)
        }
      }
      console.log(props)
      // props.mutateformentity(resize.address,
      //   {
      //     prepend: (resize.init_prepend + resize.grids),
      //     append: (resize.init_append - resize.grids),
      //   })

      props.mutateformentity(move.address, {
        prepend: move.init_prepend + grid(),
        append: move.init_append - grid()
      })

      const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
      element.removeEventListener('mousemove', movers.mouseMove_handler)
      // element.removeEventListener('dragend', movers.dragEnd_handler)
    }
  }

}