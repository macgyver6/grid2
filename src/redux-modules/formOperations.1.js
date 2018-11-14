import * as model from "../model/TextInput";

export const reformat = (state, action) => {
  const { dropTargetUUID, dragTargetUUID, sectionUUID, dragDistance } = action;
  console.log(dragDistance > 0 ? "greater" : "less");

  const siblings = state[sectionUUID].children;
  const dropTargetIndex = siblings.indexOf(dropTargetUUID);
  const dragTargetIndex = siblings.indexOf(dragTargetUUID);
  const dropTarget = state[dropTargetUUID];
  const addToSection = (index, id) => {
    const result = [...siblings];
    result.splice(index, 0, id);
    return result;
  };

  const getTarget = index => {
    if (state[siblings[index]].type === "Padding") {
      const entity = state[siblings[index]];

      return {
        [entity.uuid]: {
          ...entity,
          width: entity.width + Math.abs(dragDistance)
        }
      };
    } else {
      const eToAdd = new model.generatePadding({
        width: Math.abs(dragDistance)
      });
      return {
        [eToAdd.uuid]: eToAdd,
        [sectionUUID]: {
          ...state[sectionUUID],
          children: addToSection(index, `${eToAdd.uuid}`)
        }
      };
    }
  };

  const correspondingPadding = () => {
    if (dropTargetIndex < dragTargetIndex) {
      return getTarget(dragTargetIndex + 1);
    } else if (dropTargetIndex > dragTargetIndex) {
      return getTarget(dragTargetIndex - 1);
    }
  };

  const result = {
    ...state,
    [dropTarget.uuid]: {
      ...dropTarget,
      width: dropTarget.width - Math.abs(dragDistance)
    },
    ...correspondingPadding()
  };
  return { ...result };
};
