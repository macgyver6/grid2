import * as model from '../model/FormEntities';
import { reformat } from './reformat';
import { move } from './move';
import { reorderTabs } from './reorderTabs';
import { RenderModes, EntityTypes } from '../model/types';
import { generateEntity } from './formModelHelpers';
const formSeed = {
  byId: {
    1: model.generateFormSection({
      uuid: '1',
      children: ['4', '5'],
      legend: 'First Tab',
    }),
    2: model.generateFormSection({
      uuid: '2',
      children: [],
      legend: 'Second Tab',
    }),
    3: model.generateFormSection({
      uuid: '3',
      children: [],
      legend: 'Third Tab',
    }),
    4: model.generateFormSection({
      uuid: '4',
      children: ['6', '7'],
    }),
    5: model.generateTextInput({ uuid: '5' }),
    6: model.generateTextInput({ uuid: '6' }),
    7: model.generateImageBlock({ uuid: '7' }),
  },
  topLevelIds: ['1', '2', '3'],
};

const createEntity = (
  entityTypes: Array<EntityTypes>,
  sectionUUID: string = '4',
  initialFormValue: any = formSeed
) => {
  const startIndex = '50';

  const reducer = (accumulator: any, currentValue: any) => {
    const parent = accumulator.byId[sectionUUID];
    const newEntity = generateEntity(currentValue);
    const addToSection = () => {
      return { ...parent, children: parent.children.concat(newEntity.uuid) };
    };

    return {
      ...accumulator,
      byId: {
        ...accumulator.byId,
        [newEntity.uuid]: newEntity,
        [addToSection().uuid]: addToSection(),
      },
    };
  };
  return entityTypes.reduce(reducer, initialFormValue);
};

const reducers: any = {
  ENTITYRESIZED: (state: any, action: any) => {
    // console.log(state, action);

    return {
      ...state,
      [action.entityUUID]: {
        ...state[action.entityUUID],
        ...action.resizeUpdatedProps,
      },
    };
  },
  REFORMAT: (state: any, action: any) => ({
    ...state,
    ...reformat(state, action),
  }),
  MOVE: (state: any, action: any) => ({ ...state, ...move(state, action) }),
  REORDERFORMTABS: (state: any, action: any) => ({
    ...state,
    ...reorderTabs(state, action),
  }),
};
const arrEntitiesToCreate = [
  EntityTypes.TextArea,
  EntityTypes.CheckBox,
  EntityTypes.SelectionInput,
  EntityTypes.TextBlock,
  EntityTypes.ImageBlock,
  EntityTypes.AutoSuggestInput,
  EntityTypes.EchoInput,
  EntityTypes.CDSTextInput,
];
export default function form(
  state = createEntity(arrEntitiesToCreate),
  action: any = ''
) {
  const nextReducer = reducers[action.type];

  return nextReducer ? nextReducer(state, action) : state;
}
