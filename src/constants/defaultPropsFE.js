import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';

export var initFE = {
  FormSection: {
    uuid: undefined,
    prepend: 0,
    width: 24,
    append: 0,
    type: 'FormSection',
    children: [],
    legend: 'legend',
    render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 }
  },
  TextInput: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 1,
    prePrompt: 'prePromptString',
    prePromptWidth: 1,
    postPrompt: 'postPromptString',
    postPromptWidth: 1,
    name: 'text input name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'TextInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE492a',
    autoNumber: 'SEQUENTIAL',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: 'Default Content',
    render: { backgroundColor: '#6C788F', minWidth: 3 }
  },
  SelectionInput: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 1,
    prePrompt: 'prePromptString',
    prePromptWidth: 1,
    postPrompt: 'postPromptString',
    postPromptWidth: 1,
    name: 'Selection Input name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'SelectionInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE493b',
    autoNumber: 'SEQUENTIAL',
    doubleEntry: true,
    defaultContent: 'Default Content',
    renderMode: 'menu',
    options: [
      { label: 'dfgh', value: 'one' },
      { label: 'dfgh', value: 'two' },
      { label: 'dfgh', value: 'three' }
    ],
    render: { backgroundColor: '#6C788F', minWidth: 3 }
  },
  TextArea: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 1,
    prePrompt: 'prePromptString',
    prePromptWidth: 1,
    postPrompt: 'postPromptString',
    postPromptWidth: 1,
    name: 'name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'TextArea',
    tabOrder: 1,
    inputWidth: 12,
    promptNumber: 'CIE494c',
    autoNumber: 'SEQUENTIAL',
    numColumns: 12,
    numRows: 5,
    defaultContent: 'Default Content',
    render: { backgroundColor: '#205EE2', minWidth: 3 }
  },
  CheckBox: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 1,
    prePrompt: 'prePromptString',
    prePromptWidth: 1,
    postPrompt: 'postPromptString',
    postPromptWidth: 1,
    name: 'name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'CheckBox',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE493g',
    autoNumber: 'SEQUENTIAL',
    defaultState: true,
    render: { backgroundColor: '#00C5EC', minWidth: 1 }
  },
  RadioButton: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 1,
    prePrompt: 'prePromptString',
    prePromptWidth: 1,
    postPrompt: 'postPromptString',
    postPromptWidth: 1,
    name: 'name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'RadioButton',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE49dfd5',
    autoNumber: 'SEQUENTIAL',
    defaultState: true,
    render: { backgroundColor: '#304061', minWidth: 3 }
  },
  TextBlock: {
    uuid: undefined,
    name: 'TextBlock Name',
    width: 4,
    content: 'default text block content',
    prepend: 1,
    append: 9,
    type: 'TextBlock',
    render: { backgroundColor: 'purple', minWidth: 1 }
  },
  ImageBlock: {
    alt: 'alt',
    title: 'title',
    url: '',
    uuid: undefined,
    name: 'TextBlock Name',
    width: 8,
    content: 'default text block content',
    prepend: 1,
    append: 1,
    type: 'ImageBlock',
    render: { backgroundColor: 'purple', minWidth: 1 }
  },
  ASInput: {
    uuid: undefined,
    name: 'Adverse Event Name',
    width: 4,
    content: 'default ASInput content',
    promptNumber: 'CIE49sfsdf',
    prePrompt: 'prePromptString',
    prePromptWidth: 1,
    postPrompt: 'postPromptString',
    postPromptWidth: 1,
    prepend: 1,
    append: 1,
    type: 'AdverseEvent',
    render: { backgroundColor: 'green', minWidth: 1 }
  },
  Echo: {
    uuid: undefined,
    name: 'Echo Name',
    width: 4,
    content: 'default Echo content',
    prepend: 1,
    append: 1,
    type: 'Echo',
    render: { backgroundColor: 'khaki', minWidth: 1 },
    sourceInput: ''
  }
};

export var defaultPropsFE = {
  Form: {
    uuid: undefined,
    type: 'Form',
    version: 1,
    autoId: true,
    children: [
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [
          new FormSection({
            uuid: undefined,
            type: 'FormSection',
            width: 18,
            children: [
              new TextInput({
                uuid: undefined,
                prepend: 1,
                width: 4,
                append: 11,
                prePrompt: 'prePromptString',
                prePromptWidth: 1,
                postPrompt: 'postPromptString',
                postPromptWidth: 1,
                name: 'text input name',
                sasCodeLabel: 'sasCodeLabel',
                type: 'TextInput',
                tabOrder: 1,
                inputWidth: 8,
                promptNumber: 'CIE491a',
                autoNumber: 'SEQUENTIAL',
                length: 80,
                autoTab: true,
                doubleEntry: true,
                defaultContent: 'this is default content',
                render: {
                  backgroundColor: '#6C788F',
                  minWidth: 3
                }
              })
            ],
            legend: 'legend',
            prepend: 3,
            append: 3
          })
          // new FormSection({
          //   uuid: undefined,
          //   type: 'FormSection',
          //   width: 16,
          //   children: [],
          //   legend: 'legend',
          //   prepend: 4,
          //   append: 4,
          //   render: {
          //     backgroundColor: 'rgba(243, 234, 95, 0.7)',
          //     minWidth: 3,
          //   },
          // }),
          // new FormSection({
          //   uuid: undefined,
          //   type: 'FormSection',
          //   width: 24,
          //   children: [],
          //   legend: 'legend',
          //   prepend: 0,
          //   append: 0,
          //   render: {
          //     backgroundColor: 'rgba(243, 234, 95, 0.7)',
          //     minWidth: 3,
          //   },
          // }),
        ],
        legend: '1',
        prepend: 0,
        append: 0
      }),
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [
          new FormSection({
            uuid: undefined,
            type: 'FormSection',
            width: 16,
            legend: 'legend',
            children: [new TextArea(initFE.TextArea)],
            prepend: 0,
            append: 0,
            render: {
              backgroundColor: 'rgba(243, 234, 95, 0.7)',
              minWidth: 3
            }
          })
        ],
        legend: '2',
        prepend: 0,
        append: 0
      }),
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [
          new FormSection({
            uuid: undefined,
            type: 'FormSection',
            width: 16,
            children: [],
            legend: 'legend',
            prepend: 0,
            append: 0,
            render: {
              backgroundColor: 'rgba(243, 234, 95, 0.7)',
              minWidth: 3
            }
          })
        ],
        legend: '3',
        prepend: 0,
        append: 0
      }),
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [
          new FormSection({
            uuid: undefined,
            type: 'FormSection',
            width: 16,
            children: [],
            legend: 'legend',
            prepend: 0,
            append: 0,
            render: {
              backgroundColor: 'rgba(243, 234, 95, 0.7)',
              minWidth: 3
            }
          })
        ],
        legend: '4',
        prepend: 0,
        append: 0
      })
    ],
    crf: 'crf',
    inputs: ['input1', 'input2'],
    remoteValidatorCondition: { 0: 'zero', 1: 'one' },
    sectionTabs: true,
    versionDescription: 'version description'
  }
};
