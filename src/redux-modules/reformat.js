import * as model from '../model/FormEntities';
import { EntityTypes } from '../model/types';
export const reformat = (state, action) => {
  const { dragTargetUUID, sectionUUID, dragDistance } = action;

  const direction = dragDistance > 0 ? 1 : -1;
  const siblings = state.byId[sectionUUID].children;
  const dragTargetIndex = siblings.indexOf(dragTargetUUID);
  const paddingTargetUUID = siblings[dragTargetIndex + direction];

  const paddingTarget = state.byId[paddingTargetUUID];

  const addToSection = (index, id) => {
    const result = [...siblings];
    result.splice(index, 0, id);
    return result;
  };

  const getTarget = index => {
    if (state.byId[siblings[index]].type === EntityTypes.Padding) {
      const entity = state.byId[siblings[index]];

      return {
        [entity.uuid]: {
          ...entity,
          width: entity.width + Math.abs(dragDistance),
        },
      };
    } else {
      const eToAdd = new model.generatePadding({
        width: Math.abs(dragDistance),
      });
      // console.log(
      //   'look at: ',
      //   state.byId[siblings[index]].type,
      //   'insert at: ',
      //   direction > 0 ? index + 1 : index
      // );
      return {
        [eToAdd.uuid]: eToAdd,
        [sectionUUID]: {
          ...state.byId[sectionUUID],
          children: addToSection(
            direction > 0 ? index + 1 : index,
            `${eToAdd.uuid}`
          ),
        },
      };
    }
  };

  const correspondingPadding = () => {
    if (direction > 0) {
      return getTarget(dragTargetIndex - 1);
    } else {
      return getTarget(dragTargetIndex + 1);
    }
  };

  const result = {
    [paddingTarget.uuid]: {
      ...paddingTarget,
      width: paddingTarget.width - Math.abs(dragDistance),
    },
    ...correspondingPadding(),
  };
  return result;
};
