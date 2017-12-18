import { FormSection } from '../data/FormSection';
import { CheckBox } from '../data/CheckBox';
import { TextInput } from '../data/TextInput';

export var defaultPropsFE = {
  Form: {
    uuid: undefined, type: 'Form', version: 1, autoId: true, children: [
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [

          new FormSection({
            uuid: undefined, type: 'FormSection', width: 16, children: [
              new CheckBox({
                uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 1, autoNumber: 'SEQUENTIAL', append: 1, defaultState: true,
                render: { backgroundColor: 'rgb(255, 72, 196)' }
              }
              ),
              new TextInput({
                uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 1, autoNumber: 'SEQUENTIAL', append: 1, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content',
                render: { backgroundColor: 'rgb(255, 63, 63)' }
              }),
            ], legend: 'string', prepend: 4, append: 4
          }),
          new FormSection({
            uuid: undefined, type: 'FormSection', width: 16, children: [

            ], legend: 'string', prepend: 4, append: 4
          })
        ], legend: 'string', prepend: 0, append: 0
      }),
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 16, children: [
          new FormSection({
            uuid: undefined, type: 'FormSection', width: 16, children: [
            ], legend: 'string', prepend: 4, append: 4
          })
        ], legend: 'string', prepend: 4, append: 4
      }),

    ]
    , crf: 'crf', inputs: ['input1', 'input2'], remoteValidatorCondition: { 0: 'zero', 1: 'one' }, sectionTabs: true, versionDescription: 'version description'
  },

  FormSection: {
    uuid: undefined, prepend: 4, width: 16, append: 4, type: 'FormSection', children: [], legend: 'string',
    render: { backgroundColor: 'rgb(243, 234, 95)' }
  },

  TextInput: {
    uuid: undefined, prepend: 1, width: 5, append: 1, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content',
    render: { backgroundColor: 'rgb(255, 63, 63)' }
  },

  TextArea: {
    uuid: undefined, prepend: 1, width: 5, append: 1, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 12, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', numColumns: 20, numRows: 2, defaultContent: 'Default Content',
    render: { backgroundColor: 'rgb(43, 209, 252)' }
  },

  CheckBox: {
    uuid: undefined, prepend: 1, width: 5, append: 1, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', defaultState: true,
    render: { backgroundColor: 'rgb(255, 72, 196)' }
  }
}

export var initFE = [

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 100, numRows: 2, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true }
]