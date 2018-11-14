import * as model from "../model/FormEntities";
import { reformat } from "./reformat";
import { move } from "./move";
import { reorderTabs } from "./reorderTabs";
const test = model.generateEchoInput({});
console.log(test);

const defaultState = {
  byId: {
    1: model.generateFormSection({
      uuid: "1",
      children: ["6", "8"],
      legend: "First Tab"
    }),
    7: model.generateFormSection({
      uuid: "7",
      children: [],
      legend: "Second Tab"
    }),
    9: model.generateFormSection({
      uuid: "9",
      children: [],
      legend: "Third Tab"
    }),
    10: model.generateFormSection({
      uuid: "10",
      children: [],
      legend: "Fourth Tab"
    }),
    11: model.generateFormSection({
      uuid: "11",
      children: [],
      legend: "Fifth Tab"
    }),
    12: model.generateFormSection({
      uuid: "12",
      children: [],
      legend: "Sixth Tab"
    }),
    6: model.generateFormSection({ uuid: "1", children: ["3", "2", "4", "5"] }),
    2: model.generateTextInput({
      uuid: "2",
      prePromptWidth: 3,
      postPromptWidth: 4,
      prePrompt: "this is a preprompt",
      postPrompt: "this is a postprompt"
    }),
    8: model.generateTextInput({ uuid: "8" }),
    3: model.generatePadding({ uuid: "3", width: 1 }),
    4: model.generateTextInput({ uuid: "4" }),
    5: model.generatePadding({ uuid: "5", width: 24 })
  },
  topLevelIds: [1, 7, 9, 10, 11, 12]
};

const reducers: any = {
  ENTITYRESIZED: (state: any, action: any) => ({
    ...state,
    [action.entityId]: { ...state[action.entityId], ...action.newProps }
  }),
  REFORMAT: (state: any, action: any) => ({
    ...state,
    ...reformat(state, action)
  }),
  MOVE: (state: any, action: any) => ({ ...state, ...move(state, action) }),
  REORDERFORMTABS: (state: any, action: any) => ({
    ...state,
    ...reorderTabs(state, action)
  })
};
export default function form(state = defaultState, action: any = "") {
  /* tslint:disable */
  const nextReducer = reducers[action.type];

  return nextReducer ? nextReducer(state, action) : state;
}
