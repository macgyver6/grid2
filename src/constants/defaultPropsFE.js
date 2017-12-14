import { FormSection } from '../data/FormSection';
import { CheckBox } from '../data/CheckBox';

export var defaultPropsFE = {
  Form: {
    uuid: undefined, type: 'Form', version: 1, autoId: true, children: [
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [

          new FormSection({
            uuid: undefined, type: 'FormSection', width: 16, children: [
              // new CheckBox({ uuid: undefined, width: 16, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 8, defaultState: true })
            ], legend: 'string', prepend: 4, append: 4
          })
        ], legend: 'string', prepend: 0, append: 0
      }),
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [
          new FormSection({
            uuid: undefined, type: 'FormSection', width: 24, children: [

            ], legend: 'string', prepend: 0, append: 0
          })
        ], legend: 'string', prepend: 0, append: 0
      }),

    ]
    , crf: 'crf', inputs: ['input1', 'input2'], remoteValidatorCondition: { 0: 'zero', 1: 'one' }, sectionTabs: true, versionDescription: 'version description'
  },

  FormSection: { uuid: undefined, type: 'FormSection', width: 12, children: [], legend: 'string', prepend: 0, append: 0,
    render: { backgroundColor: 'rgb(243, 234, 95)'}
},

  TextInput: { uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 0, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content',
    render: { backgroundColor: 'rgb(255, 63, 63)' }
  },

  TextArea: { uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 12, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 0, numColumns: 20, numRows: 2, defaultContent: 'Default Content',
    render: { backgroundColor: 'rgb(43, 209, 252)' }
   },

  CheckBox: { uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 0, defaultState: true,
    render: { backgroundColor: 'rgb(255, 72, 196)' }
  }
}

export var initFE = [

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 100, numRows: 2, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true }
]