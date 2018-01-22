import { FormSection } from '../data/FormSection';
import { CheckBox } from '../data/CheckBox';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { RadioButton } from '../data/RadioButton';

export var defaultPropsFE = {
  Form: {
    uuid: undefined, type: 'Form', version: 1, autoId: true, children: [
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [

          new FormSection({
            uuid: undefined, type: 'FormSection', width: 16, children: [
              new TextInput({
                uuid: undefined, prepend: 5, width: 5, append: 0, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content',
                render: { backgroundColor: '#6C788F', minWidth: 3 }
              }),
              new CheckBox({
                uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 1, defaultState: true,
                render: { backgroundColor: '#00C5EC', minWidth: 3 }
              }
              ),

            ], legend: 'string', prepend: 4, append: 4
            , render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 }
          }),

          new FormSection({
            uuid: undefined, type: 'FormSection', width: 18, children: [
              // new FormSection({
              //   uuid: undefined, type: 'FormSection', width: 16, children: [



              //   ], legend: 'string', prepend: 4, append: 4, render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 }
              // })
            ], legend: 'string', prepend: 3, append: 3
          }),

          new FormSection({
            uuid: undefined, type: 'FormSection', width: 23, children: [
              new TextInput({
                uuid: undefined, width: 5, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 2, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content',
                render: { backgroundColor: '#6C788F', minWidth: 3 }
              }),
              // new TextArea({
              //   uuid: undefined, prepend: 0, width: 5, append: 0, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 12, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', numColumns: 20, numRows: 2, defaultContent: 'Default Content',
              //   render: { backgroundColor: '#205EE2', minWidth: 3 }
              // }),
              new CheckBox({
                uuid: undefined, prepend: 0, width: 5, append: 11, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', defaultState: true,
                render: { backgroundColor: 'lightgrey', minWidth: 3 }
              }),
              // new RadioButton({
              //   uuid: undefined, prepend: 0, width: 5, append: 6, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'RadioButton', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', defaultState: true,
              //   render: { backgroundColor: '#304061', minWidth: 3 }
              // })
            ], legend: 'string', prepend: 0, append: 1, render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 }
          })
        ], legend: 'string', prepend: 0, append: 0
      }),
      new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [
          new FormSection({
            uuid: undefined, type: 'FormSection', width: 16, children: [



            ], legend: 'string', prepend: 4, append: 4, render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 }
          })
        ], legend: 'string', prepend: 0, append: 0
      }),
    ]
    , crf: 'crf', inputs: ['input1', 'input2'], remoteValidatorCondition: { 0: 'zero', 1: 'one' }, sectionTabs: true, versionDescription: 'version description'
  },

  FormSection: {
    uuid: undefined, prepend: 0, width: 24, append: 0, type: 'FormSection', children: [


    ], legend: 'string',
    render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 }
  },

  TextInput: {
    uuid: undefined, prepend: 0, width: 5, append: 1, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content',
    render: { backgroundColor: '#6C788F', minWidth: 3 }
  },

  TextArea: {
    uuid: undefined, prepend: 0, width: 5, append: 1, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 12, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', numColumns: 20, numRows: 2, defaultContent: 'Default Content',
    render: { backgroundColor: '#205EE2', minWidth: 3 }
  },

  CheckBox: {
    uuid: undefined, prepend: 0, width: 5, append: 1, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', defaultState: true,
    render: { backgroundColor: '#00C5EC', minWidth: 3 }
  },

  RadioButton: {
    uuid: undefined, prepend: 0, width: 5, append: 0, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'RadioButton', tabOrder: [1, 2, 3], inputWidth: 8, promptNumber: 'promptNumber', autoNumber: 'SEQUENTIAL', defaultState: true,
    render: { backgroundColor: '#304061', minWidth: 3 }
  }
}

export var initFE = [

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 100, numRows: 2, defaultContent: 'Default Content' },

  { uuid: undefined, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'CheckBox', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber', prepend: 0, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true }
]