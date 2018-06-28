import React from 'react';
// import { utility } from '../../../utility';
import { address } from '../../../address';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';
import { initFE } from '../../../constants/defaultPropsFE';
// import { helpers } from '../../../helpers';

const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

const resizeStyle = {
  width: '30px',
  height: '100%',
  padding: `4px`,
  // backgroundColor: 'yellow',
  position: 'absolute',
  right: 0,
  bottom: 0,
  cursor: 'w-resize',
  // borderRadius: '2px',
};

let Resizer = props => {
  const resize = {
    _mouseMoveStartX: null,
    _mouseMoveEndX: props.mouseMoveEndX,
    dx: props.dx,
    init: null,
    init_grids: null,
    init_append: null,
    init_children: null,
    changed: null,
    grids: null,
    reset: null,
    target: null,
  };

  let mouseDown_handler = event => {
    event.stopPropagation();
    // console.log('mouseDown: ', event.clientX)
    resize.mouseMoveStartX = event.clientX;
    console.log(event.target);
    resize.target = event.target.id;
    console.log(event.target);
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`);
    element.addEventListener('mousemove', mouseMove_handler);
    element.addEventListener('mouseup', mouseUp_handler);
  };

  const dragstart_handler = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  let mouseMove_handler = event => {
    console.log(resize);
    event.stopPropagation();

    resize.reset = false;
    let locEntity = address.byUuid(props.model.UUID(), props.form);
    resize.dx = event.clientX - resize.mouseMoveStartX;
    console.log(props.model.type());
    if (resize.init_grids === null) {
      resize.init_grids = props.model[`${resize.target}`]();
      resize.init_append = props.model.append();
    }
    let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;
    /**
     * returns number of grids moved
     *
     */
    const grid = () => {
      var calc = event.pageX - resize.mouseMoveStartX;
      if (calc > 0) {
        return round(calc / bgrndGrdWidth, 0);
      } else {
        return round(calc / bgrndGrdWidth, 0);
      }
    };
    /** if the move has moved at least 1 grid's worth
     *  && if the mouse actually moves
     */
    if (resize.grids !== grid() && event.pageX !== 0) {
      resize.grids = grid();

      console.log('mutate single entity: ', locEntity[0], {
        [resize.target]: resize.init_grids + resize.grids,
        append: resize.init_append - resize.grids,
      });

      if (locEntity[1].type() !== 'FormSection') {
        props.mutate(locEntity[0], {
          [resize.target]: resize.init_grids + resize.grids,
          append: resize.init_append - resize.grids,
        });
        /** mutate single entity, including formsection */

        props.mutate(locEntity[0], {
          [resize.target]: resize.init_grids + resize.grids,
          append: resize.init_append - resize.grids,
        });
        console.log(`changing ${props.model.UUID()}.${props.model.type()}color to 'lightgreen`);
        console.log('resize check which type');
      } else if (locEntity[1].type() === 'FormSection') {
        /** resize FormSection with NO children */
        if (locEntity[1].children().length === 0) {
          props.mutate(locEntity[0], {
            [resize.target]: resize.init_grids + resize.grids,
            append: resize.init_append - resize.grids,
          });
        } else {
          /** resize FormSection with children */
          console.log('resize FormSection with children');
          const total = entity =>
            (entity.prePromptWidth ? entity.prePromptWidth() : 0) +
            entity.prepend() +
            entity.width() +
            entity.append() +
            (entity.postPromptWidth ? entity.postPromptWidth() : 0);
          const section2 = address.byPath(props.form, address.bySample(props.model, props.form));
          resize.init_children = section2.children();
          console.log(section2);

          const lastInRow = entityAddress => {
            const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
            console.log(
              address.byPath(props.form, entityAddress),
              address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1))
            );
            const _entityAddress = entityAddress[entityAddress.length - 1];
            console.log(_entityAddress);

            const entity = address.byPath(props.form, entityAddress);
            console.log(entity, total(entity), entityAddress[entityAddress.length - 1]);
            console.log(total(props.model));
            if (entityAddress[entityAddress.length - 1] === 0 && total(entity) !== props.model.width()) {
              return false;
            }
            var runningTotal = 0;
            // console.log(_entityAddress, section.children())
            for (var i = 0; i <= _entityAddress; ++i) {
              console.log(section.children()[i]);
              runningTotal += total(section.children()[i]);
            }
            console.log(runningTotal);
            return runningTotal % section.width() === 0 ? true : false;
          };
          console.log(resize.grids, resize.init_children[0].append());
          const functionToMutateChildAppend = entity =>
            address.rehydrate(
              Object.assign({}, entity.properties(), {
                append: entity.append() + resize.grids,
              })
            );
          const lastEntitiesInRow = props.model.children().map((child, index) => {
            console.log(lastInRow(address.bySample(child, props.form)) ? functionToMutateChildAppend(child) : null);
            // console.log(lastInRow(address.bySample(child, props.form)) ? functionToMutateChildAppend(child) : child);
            return lastInRow(address.bySample(child, props.form)) ? functionToMutateChildAppend(child) : child;
          });
          resize.init_lastEntitiesInRow = lastEntitiesInRow;
          console.log(lastEntitiesInRow);
          // const modifiedChildren = lastEntitiesInRow.map((entity, index) =>
          //   address.rehydrate(
          //     Object.assign({}, entity.properties(), {
          //       append: resize.init_lastEntitiesInRow[index].append() + resize.grids,
          //     })
          //   )
          // );
          // console.log(modifiedChildren.map(child => child)); // this is the array of mutated entities

          // eventually reimplement this

          props.mutate(
            address.bySample(props.model, props.form),
            Object.assign({}, section2.properties(), {
              width: resize.init_grids + resize.grids,
              children: lastEntitiesInRow,
              append: resize.init_append - resize.grids,
            })
          );
          /*
          */
        }
      }
    }
  };

  let mouseUp_handler = function(event) {
    // event.preventDefault();
    resize.mouseMoveEndX = event.clientX;
    console.log('mouseUp: ', resize);

    const wrapperElement = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`);
    wrapperElement.removeEventListener('mousemove', mouseMove_handler);
    wrapperElement.removeEventListener('mouseup', mouseUp_handler);
    const entityToChangeColor = document.getElementById(`${props.model.UUID()}.${props.model.type()}`);
    // setTimeout(function () { element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor }, 120);
    // console.log(
    //   'change this: ',
    //   entityToChangeColor.id +
    //     'to: ' +
    //     defaultPropsFE[props.model.type()].render.backgroundColor
    // );
    console.log(initFE[props.model.type()]);
    event.target.style.backgroundColor = '';

    // entityToChangeColor.style.backgroundColor =
    //   initFE[props.model.type()].render.backgroundColor;
  };

  const mouseEnter_handler = event => {
    // console.log(event.target);
    event.target.style.backgroundColor = 'green';
    event.target.style.width = '30px';
    // event.target.innerHTML = '<h1>↔️</h1>';
    // event.target.zIndex = '100';
  };

  const mouseLeave_handler = event => {
    // console.log(event.target);
    event.target.style.backgroundColor = '';
    // event.target.innerHTML = '';
    console.log(props.model.type());
    event.target.style.width = props.model.type() !== 'FormSection' ? resizeStyle.width : '5px';
  };

  const click_handler = event => {
    event.stopPropagation();
  };

  return (
    <div
      id={`${props.resizeType}`}
      className="resizer"
      style={{ ...resizeStyle, ...props.style }}
      // style={{ ...resizeStyle, ...props.style }}
      onDragStart={dragstart_handler}
      onMouseDown={mouseDown_handler}
      onMouseUp={mouseUp_handler}
      onMouseEnter={mouseEnter_handler}
      onMouseLeave={mouseLeave_handler}
      draggable="true"
      // onClick={click_handler}
    />
  );
};

export default Resizer;
