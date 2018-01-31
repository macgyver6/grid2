import { utility } from './utility';
import { address } from './address';
import { defaultPropsFE } from './constants/defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const resize = {
  _mouseMoveStartX: null,
  _mouseMoveEndX: null,
  dx: null,
  init: null,
  init_grids: null,
  init_append: null,
  init_children: null,
  changed: null,
  grids: null,
  reset: null
}
let bgrndGrdWidth = 44

/**
 * 1. array of section children
 * 2. sectionEntity
 *
 *
 */
export const formatter = {

  // let locEntity = address.byUuid(props.model.UUID(), props.form)

  main: (sectionEntity) => {
    resize.init_children = sectionEntity.children()
    if (sectionEntity.children().length > 0) {
      const total = (prepend, width, append) => prepend + width + append;
      let vacantColumnsInSection = sectionEntity.width();
      let row = 0;
      let index = 0;
      let append = 0

      const _children = resize.init_children.map((entity) => {

        let finalTotal = total(entity.prepend(), entity.width(), entity.append())
        if (finalTotal > vacantColumnsInSection) {

          row = row + 1
          index = 0
          vacantColumnsInSection = sectionEntity.width()
        } else {
          index = index + 1
          vacantColumnsInSection = vacantColumnsInSection - finalTotal
        }

        return  Object.assign({}, entity.properties(), {
          total: finalTotal,
          row: row,
          index: index
        })
      })
    }
  }
}