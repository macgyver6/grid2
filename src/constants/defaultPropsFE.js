import { FormSection } from '../data/FormSection';
import { TextArea } from '../data/TextArea';

export var defaultPropsFE = {

  Form: {
    uuid: undefined, type: 'Form', version: 1, autoId: true, children: [
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [

          new FormSection({
            uuid: undefined, type: 'FormSection', width: 24, children: [
              new TextArea({ uuid: undefined, width: 12, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 12, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 20, numRows: 2, defaultContent: 'Default Content' },)
            ], legend: 'string', prepend: 3, append: 4
          })
        ], legend: 'string', prepend: 3, append: 4
      }),
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [
          new FormSection({
            uuid: undefined, type: 'FormSection', width: 24, children: [

            ], legend: 'string', prepend: 3, append: 4
          })
        ], legend: 'string', prepend: 3, append: 4
      })
    ]
    , crf: 'crf', inputs: ['input1', 'input2'], remoteValidatorCondition: { 0: 'zero', 1: 'one' }, sectionTabs: true, versionDescription: 'version description'
  },

  FormSection: { uuid: undefined, type: 'FormSection', width: 2, children: [], legend: 'string', prepend: 3, append: 4 },

  TextInput: { uuid: undefined, width: 8, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 4, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content' },

  TextArea: { uuid: undefined, width: 12, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 12, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 20, numRows: 2, defaultContent: 'Default Content' },

  Checkbox: { uuid: undefined, width: 6, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'Checkbox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true }
}

export var initFE = [

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 4, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 100, numRows: 2, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'Checkbox', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true }
]