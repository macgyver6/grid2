import React from 'react';
import { address } from '../../address';
import { initFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';
import AddToEnd from './subentities/AddToEnd.js';
import AddToBeginning from './subentities/AddToBeginning.js';
import Append from './subentities/Append';
import Prepend from './subentities/Prepend.js';
import { helpers } from '../../helpers';
import { utility } from '../../utility';
import { entityActions } from './actions.entities';
import { entityWrapperStyle, entitySubWrapperStyle, entityStyle, inputStyle } from './feStyles';

// import AddToEnd from './subentities/AddToEnd.js';
let FormSectionComponent = props => {
  const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

  const dragstart_handler = event => {
    event.stopPropagation();
    console.log(event.target, props.model.UUID());
    helpers.dragStart_handler(event, props.model, props.form, 'move');
    console.log('FS DragStart');
  };
  let data = '';

  const dragOver_handler = function(event) {
    // event.stopPropagation();
    event.preventDefault();
    // document.getElementById(
    //   `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'ightgreen'
  };

  const drop_handler = event => {
    event.stopPropagation();
    console.log('formSection drop_handler');
    console.log(data);
    // event.preventDefault();
    data = JSON.parse(event.dataTransfer.getData('address'));
    console.log(event.dataTransfer.getData('address'), data);
    let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;
    const offsetE1 = data.dragInit;
    console.log(round(data.dragInit / bgrndGrdWidth, 0));
    const offsetGrids = round(
      (event.clientX -
        document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`).getBoundingClientRect().left -
        offsetE1) /
        bgrndGrdWidth,
      0
    );

    if (data && data.action === 'addEntity') {
      console.log('drop FS add: ');
      let location = address.bySample(props.model, props.form);
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;
      const offsetGrids = round((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth, 0);
      const considerPrompt = prompt => (data.model[prompt] ? data.model[prompt] : 0);

      let entityToAdd = address.rehydrate(
        Object.assign({}, data.model, {
          prepend: offsetGrids,
          append:
            props.model.width() -
            (offsetGrids +
              data.model.width +
              (data.model.prePromptWidth ? data.model.prePromptWidth : 0) +
              (data.model.postPromptWidth ? data.model.postPromptWidth : 0)),
        })
      );
      console.log('here: ', entityToAdd.prepend());
      // @hack - only adds to position 0 at this point
      let addressNewEntity = [...location];
      addressNewEntity[addressNewEntity.length] = props.model.children().length;
      props.add(addressNewEntity, entityToAdd);
      props.temporalStateChange({
        currententity: addressNewEntity,
      });
    }
    // rearranging by moving one entity from one section to another
    if (data && data.action === 'move') {
      console.log('FormSection drop move');
      console.log(data.address);
      let draggedEntity = address.byPath(props.form, data.address);

      const totalThis =
        (draggedEntity.prePromptWidth ? draggedEntity.prePromptWidth() : 0) +
        draggedEntity.width() +
        (draggedEntity.postPromptWidth ? draggedEntity.postPromptWidth() : 0);
      const whereClicked = round(offsetE1 / bgrndGrdWidth, 0);

      const gridsToEndOfSection = props.model.width() - (totalThis - whereClicked - offsetGrids);

      /**
       * offsetGrids is not calculating if the entity had a prepend in position 1
       * */

      const futurePrepend = draggedEntity.prepend() + offsetGrids;

      let entityToAdd = address.rehydrate(
        Object.assign({}, draggedEntity.properties(), {
          prepend: futurePrepend,
          append: props.model.width() - totalThis - futurePrepend,
          // (draggedEntity.postPromptWidth ? draggedEntity.postPromptWidth() : 0) -
          // draggedEntity.width(),
        })
      );

      console.log(whereClicked, gridsToEndOfSection, props.model.width(), totalThis - offsetGrids);
      // console.log(
      //   // entityToAdd.prepend(),
      //   entityToAdd.append(),
      //   props.model.width(),
      //   gridsToEndOfSection,
      //   draggedEntity.postPromptWidth ? draggedEntity.postPromptWidth() : 0,
      //   draggedEntity.width(),
      //   {
      //     [`data.dragInit`]: round(data.dragInit / bgrndGrdWidth, 0),
      //     [`data`]: data,
      //     offsetGrids,
      //     [`props.model.width()`]: props.model.width(),
      //     offsetGrids,
      //     [`draggedEntity.prePromptWidth()`]: draggedEntity.prePromptWidth(),
      //     [` draggedEntity.width()`]: draggedEntity.width(),
      //   }
      // );

      const total = entity =>
        entity.prepend() +
        (entity.prePromptWidth ? entity.prePromptWidth() : 0) +
        entity.width() +
        entity.append() +
        (entity.postPromptWidth ? entity.postPromptWidth() : 0);

      // const _parentChildren = [...parentEntity.children()]
      /**returns true if entity path provided is firstInRow; false if not
       * * @param {array} before - Path of the current entity
       */
      const firstInRow = entityAddress => {
        const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
        // console.log(entityAddress )
        const _entityAddress = entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1;
        var runningTotal = 0;
        // console.log(_entityAddress, section.children())
        for (var i = 0; i <= _entityAddress; ++i) {
          // console.log(section)
          runningTotal += total(section.children()[i]);
        }
        return runningTotal % section.width() === 0 ? true : false;
      };

      const restoreDonorSiblingAddress = (arr, props, draggedEntity) => {
        // get donor's parent
        const donorParent = address.byPath(props.form, arr.slice(0, arr.length - 1));
        console.log(arr, props, draggedEntity);
        const toLeft = arr => {
          const _toLeft = [...arr];
          console.log({
            address: _toLeft,
            entity: address.byPath(props.form, _toLeft),
          });
          _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1;
          return {
            address: _toLeft,
            entity: address.byPath(props.form, _toLeft),
          };
        };
        const toRight = arr => {
          const _toRight = [...arr];
          _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1;
          return {
            address: _toRight,
            entity: address.byPath(props.form, _toRight),
          };
        };
        console.log(donorParent.children().length - 1 === arr[arr.length - 1] && firstInRow(arr));
        /** if only 1 child in section or the donor entity is the last entity in section */
        if (
          donorParent.children().length === 1 ||
          (donorParent.children().length - 1 === arr[arr.length - 1] && firstInRow(arr))
        ) {
          // if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1])) {
          console.log(false);
          return false;
        } else if (total(draggedEntity) >= donorParent.width()) {
          return false;
        } else if (firstInRow(arr)) {
          console.log('firstInRow: ', toRight(arr));
          return {
            address: toRight(arr).address,
            properties: {
              prepend:
                (draggedEntity.prePromptWidth ? draggedEntity.prePromptWidth() : 0) +
                toRight(arr).entity.prepend() +
                draggedEntity.prepend() +
                draggedEntity.width() +
                draggedEntity.append(),
            },
          };
        } else {
          return {
            address: toLeft(arr).address,
            properties: {
              append:
                // @hack
                /**this restores the donor entity */
                toLeft(arr).entity.append() +
                (draggedEntity.prePromptWidth ? draggedEntity.prePromptWidth() : 0) +
                draggedEntity.prepend() +
                draggedEntity.width() +
                draggedEntity.append(),
            },
          };
        }
      };

      console.log(restoreDonorSiblingAddress(data.address, props, draggedEntity));

      const toBeMutatedRestore = restoreDonorSiblingAddress(data.address, props, draggedEntity);

      let test = address.byUuid(props.model.UUID(), props.form)[0];
      let _test = [...test];
      _test[test.length] = props.model.children().length;
      // for dropping entity other than itself onto this form section
      if (draggedEntity.UUID() !== props.model.UUID()) {
        console.log('FormSection drop move, entity dropped on FS');
        console.log('add this: ', entityToAdd, _test);
        console.log('remove this: ', data.address);
        // props.add(_test, entityToAdd);
        // props.remove(data.address);
        // path, properties, pathToAdd, entityToAdd, pathToRemove section
        // console.log(
        //   toBeMutatedRestore.address,
        //   toBeMutatedRestore.properties,
        //   _test,
        //   entityToAdd,
        //   data.address,
        //   props.form
        // );
        if (toBeMutatedRestore) {
          console.log('here');
          props.mutateaddremove(
            toBeMutatedRestore.address,
            toBeMutatedRestore.properties,
            _test,
            entityToAdd,
            data.address,
            props.form
          );
        } else {
          props.add(_test, entityToAdd);
          props.remove(data.address);
        }
        //   /*
        //   start restore donor
        //   */

        console.log(helpers.restoreDonorSiblingAddress(data.address, props));
        if (helpers.restoreDonorSiblingAddress(data.address, props)) {
          console.log(
            helpers.restoreDonorSiblingAddress(data.address, props).address,
            helpers.restoreDonorSiblingAddress(data.address, props).properties
          );
          // props.mutate(helpers.restoreDonorSiblingAddress(data.address, props).address, helpers.restoreDonorSiblingAddress(data.address, props).properties)
        }
        /*
        end restore donor
        */
      }
      // for changing prepend/append of a formsection
      if (draggedEntity.UUID() === props.model.UUID()) {
        console.log('here dropped on FormSection, moving form section: ', offsetGrids, {
          prepend: props.model.prepend() + offsetGrids,
          append: props.model.append() - offsetGrids,
        });

        props.mutate(address.bySample(props.model, props.form), {
          prepend: props.model.prepend() + offsetGrids,
          append: props.model.append() - offsetGrids,
        });
      }
      // @hack - only adds to position 0 at this point
      const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`);
      // console.log(
      //   'change this: ',
      //   element.id +
      //     'to: ' +
      //     defaultPropsFE[props.model.type()].render.backgroundColor
      // );
      // element.style.backgroundColor =
      //   defaultPropsFE[props.model.type()].render.backgroundColor;
    }
  };

  const drop_handler2 = event => entityActions.drop_handler(event, props);

  const mouseDown_handler = event => {
    event.stopPropagation();
    console.log(event.target, document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`));
    document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`).draggable = true;
    console.log(event.target.draggable);
    console.log(event.target, address.bySample(props.model, props.form));
  };

  const fsStyle = {
    display: 'grid',
    position: 'relative',
    // border: '8px solid black',
    borderRadius: '2px',
    gridTemplateColumns: `repeat(${props.model.width()}, [col] 1fr)`,
    backgroundColor: 'rgba(243, 234, 95, 0.7)',
    // minHeight: '120px',
    minWidth: '100px',
    paddingBottom: '40px',
    gridColumn: `span ${props.model.width()}`,
    gridGap: '8px',
    gridAutoRows: 'min-content',
    zIndex: '30',
    cursor: 'move',
    borderRadius: '2px',
    // padding: '4px',
  };

  const formSectionStyle = {
    display: 'grid',
    // gridColumn: null,
    // gridTemplateColumns: null,
    // draggable: 'true',
    margin: '20px 0px 0px 0px', // minHeight: '120px',
    // "maxHeight": "120px",
    zIndex: '40',
    cursor: 'move',
  };

  // return actual style values
  // 1. # of grid columns the CheckBox and Append will fill
  formSectionStyle['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append());
  // 2. # of grid columns within the CheckBox
  formSectionStyle['gridTemplateColumns'] =
    'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)';
  const whichBackground = address.bySample(props.model, props.form).length < 2 ? '' : fsStyle.backgroundColor;
  const maxHeight = address.bySample(props.model, props.form).length < 2 ? '70vh' : '';

  const minHeight = address.bySample(props.model, props.form).length < 2 ? '70vh' : '0';

  /**address of less than 2 would scrolls properly with 'auto', but it affects the integrity of the grid columns */
  const scrollable = address.bySample(props.model, props.form).length < 2 ? 'visible' : 'scroll';

  const dontResizeTopLevel = address.bySample(props.model, props.form).length < 2 ? false : true;

  const total = entity =>
    (entity.prePromptWidth ? entity.prePromptWidth() : 0) +
    entity.prepend() +
    entity.width() +
    entity.append() +
    (entity.postPromptWidth ? entity.postPromptWidth() : 0);

  const lastInRow = entityAddress => {
    const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
    // console.log(entityAddress )
    const _entityAddress = entityAddress[entityAddress.length - 1];
    const entity = address.byPath(props.form, entityAddress);
    // if (entityAddress[entityAddress.length - 1] === 0 && total(entity) !== props.model.width()) {
    //   return false;
    // }
    var runningTotal = 0;
    // console.log(_entityAddress, section.children())
    for (var i = 0; i <= _entityAddress; ++i) {
      // console.log(section)
      runningTotal += total(section.children()[i]);
    }
    console.log(runningTotal % section.width());
    return runningTotal % section.width() === 0 ? true : false;
  };

  const lastEntitiesInRow = props.model
    .children()
    .map(
      (child, index) =>
        lastInRow(address.bySample(child, props.form)) ? `${child.UUID()}.${child.type()}.wrapper` : null
    );

  console.log(lastEntitiesInRow);

  // const allChildrenSum = section =>
  //   section
  //     .children()
  //     .map(child => {
  //       console.log(total(child));
  //       return total(child);
  //     })
  //     .reduce((accumulator, currentValue, currentIndex, array) => {
  //       return accumulator + currentValue;
  //     }, 0);

  const dragEnter_handler = event => {
    event.stopPropagation();
    event.preventDefault();
    props.temporalStateChange({ gridWidth: document.getElementById('0.bgrndGrd').clientWidth + 7 });
  };
  // lastEntitiesInRow.map(entity => document.getElementById(entity).appendChild(AddToEnd));

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      className="FS"
      style={formSectionStyle}
      onDrop={drop_handler2}
      onDragEnter={dragEnter_handler}
      onDragOver={
        dragOver_handler // adding a new entity to section
      }
      onMouseDown={mouseDown_handler}
      onDragStart={dragstart_handler}
      draggable="false"
    >
      {props.model.prepend() > 0 ? (
        <Prepend
          id={`${props.model.UUID()}.prepend`}
          prepend={props.model.prepend()}
          uuid={props.model.UUID()}
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
        />
      ) : null}
      <div
        id={`${props.model.UUID()}.${props.model.type()}.subWrapper`}
        style={{
          ...entitySubWrapperStyle(props.model),
          // border: 'solid green 1px',
        }}
        onMouseDown={mouseDown_handler} // to set intitial
        draggable="false"
      >
        <div
          id={`${props.model.UUID()}.${props.model.type()}`}
          className="form-group FS"
          /**
           * scrolling notes: without styling the scrollbar was inadvertantly skewing the grid contents by the scrollbar width. Using this css, the scrollbar is hidden:
           * ::-webkit-scrollbar {
           * display: none;
           *}
           */
          style={{
            ...fsStyle,
            // border: '1px dashed blue',
            backgroundColor: whichBackground,
            minHeight: minHeight,
            maxHeight: '65vh',
            // overflowY: 'scrollable',
            overflowY: 'scroll', // this allows both the tab and the form section to scroll
            overflowX: 'visible',
            paddingTop: '18px',
          }}
          data-action={`mover.${props.model.UUID()}.FormSection`}
          onDrop={drop_handler}
        >
          {/* <p>{address.bySample(props.model, props.form).length}</p> */}
          {address.bySample(props.model, props.form).length > 0 ? (
            <AddToBeginning
              model={props.model}
              form={props.form}
              add={props.add}
              remove={props.remove}
              mutate={props.mutate}
              temporalStateChange={props.temporalStateChange}
              addToEndAction="insertInPlace"
              appState={props.appState}
            />
          ) : null}
          {props.model.type() === 'FormSection' && props.form.children().length >= 1
            ? props.model.children().map((element, i) =>
                React.createElement(address.lookupComponent(element), {
                  key: i,
                  model: element,
                  form: props.form,
                  remove: props.remove,
                  add: props.add,
                  mutate: props.mutate,
                  mutateandadd: props.mutateandadd,
                  mutateaddremove: props.mutateaddremove,
                  temporalStateChange: props.temporalStateChange,
                  appState: props.appState,
                  selected: utility.arraysEqual(address.bySample(element, props.form), props.appState.currententity),
                })
              )
            : null}
          {dontResizeTopLevel ? (
            <Resizer
              id={`${props.model.UUID()}.resizer`}
              element="FormEntity"
              uuid={props.model.UUID()}
              className="resizer"
              model={props.model}
              form={props.form}
              remove={props.remove}
              add={props.add}
              mutate={props.mutate}
              resizeType="width"
              style={{
                width: '5px',
                padding: '0px',
              }}
            />
          ) : null}
          {/* <AddToEnd
          model={props.model}
          form={props.form}
          add={props.add}
          remove={props.remove}
          mutate={props.mutate}
          temporalStateChange={props.temporalStateChange}
          addToEndAction="appendToEnd"
        /> */}
        </div>
      </div>
      {props.model.append() > 0 ? (
        <Append
          id={`${props.model.UUID()}.append`}
          append={props.model.append()}
          uuid={props.model.UUID()}
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
        />
      ) : null}
    </div>
  );
};

export default FormSectionComponent;
