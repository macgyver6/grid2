import { address } from './address';

export const helpers = {
  /**
   *
   * @param {Array} arrKeys array of keys
   * @param {Object} originalObject
   * @param {Object} output
   */
  returnOnly: (arrKeys, originalObject, output = {}) => {
    arrKeys.forEach(id => (output[id] = originalObject[id]));
    return output;
  },

  /**
   * @param {Number} oldIndex
   * @param {Number} newIndex
   * @param {Arrau} originalArray
   */
  reorderArray: (oldIndex, newIndex, originalArray) => {
    const movedItem = originalArray.filter((item, index) => index === oldIndex);
    const remainingItems = originalArray.filter(
      (item, index) => index !== oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, newIndex),
      movedItem[0],
      ...remainingItems.slice(newIndex),
    ];

    return reorderedItems;
  }, // dragStartHandler: (event, model, form, action) => { //     event.stopPropagation();
  /**
   *
   * @param {FormEntity} entity
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */ //     if (action !== 'addEntity') {
  //         let bgrndGrdWidth =
  //             document.getElementById('0.bgrndGrd').clientWidth + 8;
  //         console.log(model);
  //         event.dataTransfer.setData(
  //             'address',
  //             JSON.stringify({
  //                 action: action,
  //                 address:
  //                     action === 'addEntity'
  //                         ? null
  //                         : address.bySample(model, form),
  //                 dragInit:
  //                     action === 'move'
  //                         ? round(
  //                               event.clientX -
  //                                   document
  //                                       .getElementById(
  //                                           `${model.UUID()}.${model.type()}.subWrapper`
  //                                       )
  //                                       .getBoundingClientRect().left,
  //                               3
  //                           )
  //                         : null,
  //             })
  //         );
  //         const type = model.type();
  //         const div = document.createElement('div');
  //         div.id = 'dmg';
  //         div.style.width = `${widthSubWrapper(model) * bgrndGrdWidth -
  //             12}px`; //  gets the total with of the default entity minus the append and prepend widths. Note subtracting 12 accounts for the gap
  //         div.style.height = '20px';
  //         // div.style.backgroundColor = 'blue';
  //         div.style.backgroundColor =
  //             initFE[`${type}`].render.backgroundColor;
  //         div.style.border = '1px #BBBBBB';
  //         div.style.backgroundColor = '2px #8939AD';
  //         div.style.boxShadow = '0 3px 4px purple';
  //         div.style.position = 'fixed';
  //         div.style.top = '-1000px';
  //         div.style.left = '-1000px';
  //         div.style.borderRadius = '2px';
  //         document.body.appendChild(div);

  //         const subWrapperWidth = document
  //             .getElementById(`${model.UUID()}.${model.type()}.subWrapper`)
  //             .getBoundingClientRect().width;
  //         const parentDiv = document.createElement('div');
  //         parentDiv.style.width = `${subWrapperWidth + 12}px`; // take the original element width and add margin so as to not clip the box shadow
  //         parentDiv.style.height = '50px';
  //         parentDiv.style.backgroundColor = '1';
  //         parentDiv.style.position = 'fixed';

  //         parentDiv.style.top = '-1000px';
  //         parentDiv.style.left = '-1000px';

  //         const div2 = document
  //             .getElementById(`${model.UUID()}.${model.type()}.subWrapper`)
  //             .cloneNode(true);
  //         // const origTarget = document.getElementById(`${model.UUID()}.${model.type()}.subWrapper`);
  //         // origTarget.style.opacity = '0.4';
  //         div2.style.boxShadow = '3px 4px rgba(116, 116, 116, 1)';
  //         div2.style.borderTop = '1px solid #BBBBBB';
  //         div2.style.borderLeft = '1px solid #BBBBBB';
  //         console.log(`${widthSubWrapper(model) * bgrndGrdWidth - 12}px`);
  //         div2.style.width = `${subWrapperWidth}px`;
  //         parentDiv.appendChild(div2);
  //         document.body.appendChild(parentDiv);

  //         type !== 'FormSection'
  //             ? event.dataTransfer.setDragImage(
  //                   parentDiv,
  //                   round(
  //                       event.clientX -
  //                           document
  //                               .getElementById(
  //                                   `${model.UUID()}.${model.type()}.subWrapper`
  //                               )
  //                               .getBoundingClientRect().left,
  //                       3
  //                   ),
  //                   0
  //               )
  //             : null;
  //     } else if (action === 'addEntity') {
  //         const getTabOrder = utility.findAll(
  //             form,
  //             e => e instanceof FormInput
  //         ).length;
  //         const lastEntity = utility.findAll(
  //             form,
  //             e => e instanceof FormInput
  //         );
  //         console.log(lastEntity);
  //         const hydratedEntity = address.rehydrate({
  //             ...model,
  //             tabOrder: getTabOrder + 1,
  //         });
  //         lastEntity.push(hydratedEntity);
  //         const nextIdentifier = () =>
  //             getExternalIdentifier(
  //                 lastEntity.map(entity => entity.autoNumberRule()),
  //                 lastEntity.length - 1
  //             );

  //         event.dataTransfer.setData(
  //             'address',
  //             JSON.stringify({
  //                 action: action,
  //                 model: {
  //                     ...model,
  //                     tabOrder: getTabOrder + 1,
  //                     ...(form.autoId().enable && 'autoNumberRule' in model
  //                         ? { externalIdentifier: String(nextIdentifier()) }
  //                         : {}),
  //                 },
  //                 dragInit: null,
  //             })
  //         );
  //     }
  // },

  /**
   * given the provided subEntity, calc which number to begin event targets at
   * @param {Object} model - Model of the current entity
   * @param {string} currentEntity} - Current subEntity to calc what number to begin event target for
   * @returns {Number} num
   */
  calcStart: (model, currentEntity) => {
    if (currentEntity === 'prepend') {
      return 0;
    } else if (currentEntity === 'append') {
      return (
        model.prepend +
        (model.prePromptWidth || 0) +
        model.width +
        (model.postPromptWidth || 0)
      );
    } else if (currentEntity === 'prePrompt') {
      return model.prepend;
    } else if (currentEntity === 'FormInput') {
      return model.prepend + (model.prePromptWidth || 0);
    } else if (currentEntity === 'postPrompt') {
      return model.prepend + (model.prePromptWidth || 0) + model.width;
    }
  },
  /**
   * given the provided subEntity, calc which number to begin event targets at
   * @param {Object} model - Model of the current entity
   * @param {string} currentEntity} - Current subEntity to calc what number to begin event target for
   * @returns {Number} num
   */
  calcResizerColumn: (model, currentEntity) => {
    if (currentEntity === 'prepend') {
      return 0;
    } else if (currentEntity === 'append') {
      return (
        model.prepend +
        model.prePromptWidth +
        model.width +
        model.postPromptWidth
      );
    } else if (currentEntity === 'prePrompt') {
      return model.prepend + model.prePromptWidth;
    } else if (currentEntity === 'width') {
      return model.prepend + model.prePromptWidth + model.width;
    } else if (currentEntity === 'postPrompt') {
      return (
        model.prepend +
        model.prePromptWidth +
        model.width +
        model.postPromptWidth
      );
    }
  },
  widthAccessor: className => {
    switch (className) {
      case 'prepend':
        return 'prepend';
      case 'append':
        return 'append';
      case 'prePrompt':
        return 'prePromptWidth';
      case 'postPrompt':
        return 'postPromptWidth';
      default:
        return 'width';
    }
  },
  marginCalc: props => {
    const _margin = [0, 0, 0, 0];
    _margin[1] = props.model.append() > 0 ? 4 : 0;
    _margin[3] = props.model.prepend() > 0 ? 4 : 0;
    return _margin
      .map(el => `${el}px`)
      .toString()
      .replace(/,/g, ' ');
  },
  restoreDonorSiblingAddress: (arr, props) => {
    let draggedEntity = address.byPath(props.form, arr);
    const total = (prepend, width, append) => prepend + width + append;
    // get donor's parent
    const donorParent = address.byPath(
      props.form,
      arr.slice(0, arr.length - 1)
    );
    const entitySelf = address.byPath(props.form, arr);
    // console.log(total(0, 8, 0))
    // console.log(typeof(entitySelf.prepend()), typeof(entitySelf.width()), typeof(entitySelf.append()))
    // console.log(total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()),
    //   total(donorParent.prepend() + donorParent.width() + donorParent.append()))
    console.log(
      total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()),
      total(donorParent.prepend(), donorParent.width(), donorParent.append())
    );
    if (
      donorParent.children().length === 1 ||
      total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()) ===
        total(donorParent.prepend(), donorParent.width(), donorParent.append())
    ) {
      console.log('entity being removed from formSection is the last child');
      return false;
    } else {
      console.log('donor formSection is not an empty nester');
      const toLeft = arr => {
        const _toLeft = [...arr];
        if (_toLeft[arr.length - 1] < 1) {
          return false;
        } else {
          _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1;
          return {
            address: _toLeft,
            entity: address.byPath(props.form, _toLeft),
          };
        }
      };
      const toRight = arr => {
        const _toRight = [...arr];
        _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1;
        return { address: arr, entity: address.byPath(props.form, _toRight) };
      };

      if (toLeft(arr)) {
        console.log(
          'previous entity exists, adding to append: ',
          toLeft(arr).address
        );
        return {
          address: toLeft(arr).address,
          properties: {
            append:
              toLeft(arr).entity.append() +
              draggedEntity.prepend() +
              draggedEntity.width() +
              draggedEntity.append(),
          },
        };
      } else {
        console.log(
          'no previous entity exists, adding to prepend, ',
          address.byPath(props.form, toRight(arr).address),
          {
            address: toRight(arr).address,
            properties: {
              prepend:
                toRight(arr).entity.prepend() +
                draggedEntity.prepend() +
                draggedEntity.width() +
                draggedEntity.append(),
            },
          }
        );
        return {
          address: toRight(arr).address,
          properties: {
            prepend:
              toRight(arr).entity.prepend() +
              draggedEntity.prepend() +
              draggedEntity.width() +
              draggedEntity.append(),
          },
        };
      }
    }
  },
};
