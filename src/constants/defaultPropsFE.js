import {FormSection} from '../data/FormSection';
import {TextInput} from '../data/TextInput';
import {TextArea} from '../data/TextArea';
import {RadioButton} from '../data/RadioButton';
import {SelectionInput} from '../data/SelectionInput';

export var initFE = {
  FormSection: {
    uuid: undefined,
    prepend: 0,
    width: 24,
    append: 0,
    type: 'FormSection',
    children: [],
    legend: 'legend',
    render: {
      backgroundColor: 'rgba(243, 234, 95, 0.7)',
      minWidth: 3
    }
  },
  TextInput: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 7,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: 'text input name',
    QxQ: 'Sample QxQ',
    sasCodeLabel: 'sasCodeLabel',
    type: 'TextInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE492a',
    autoNumber: 'SEQUENTIAL',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    render: {
      backgroundColor: '#6C788F',
      minWidth: 3
    }
  },
  SelectionInput: {
    uuid: undefined,
    prepend: 1,
    width: 11,
    append: 0,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: 'Selection Input name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'SelectionInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE493b',
    autoNumber: 'SEQUENTIAL',
    doubleEntry: true,
    defaultContent: '',
    renderMode: 'selection',
    options: [
      {
        label: 'dfgh',
        value: 'one'
      }, {
        label: 'dfgh',
        value: 'two'
      }, {
        label: 'dfgh',
        value: 'three'
      }
    ],
    render: {
      backgroundColor: '#6C788F',
      minWidth: 3
    }
  },
  TextArea: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 7,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: 'name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'TextArea',
    tabOrder: 1,
    inputWidth: 12,
    promptNumber: 'CIE494c',
    autoNumber: 'SEQUENTIAL',
    numColumns: 12,
    numRows: 2,
    defaultContent: '',
    render: {
      backgroundColor: '#205EE2',
      minWidth: 3
    }
  },
  CheckBox: {
    uuid: undefined,
    prepend: 1,
    width: 4,
    append: 7,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: 'name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'CheckBox',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE493g',
    autoNumber: 'SEQUENTIAL',
    defaultState: true,
    render: {
      backgroundColor: '#00C5EC',
      minWidth: 1
    }
  },
  RadioButton: {
    uuid: undefined,
    prepend: 1,
    width: 11,
    append: 0,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: 'name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'RadioButton',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE49dfd5',
    autoNumber: 'SEQUENTIAL',
    defaultState: true,
    render: {
      backgroundColor: '#304061',
      minWidth: 3
    }
  },
  TextBlock: {
    uuid: undefined,
    name: 'TextBlock Name',
    width: 4,
    content: 'default text block content',
    prepend: 1,
    append: 9,
    type: 'TextBlock',
    render: {
      backgroundColor: 'purple',
      minWidth: 1
    }
  },
  ImageBlock: {
    alt: 'alt',
    title: '',
    url: '',
    uuid: undefined,
    name: 'TextBlock Name',
    width: 8,
    content: 'default text block content',
    prepend: 1,
    append: 1,
    type: 'ImageBlock',
    render: {
      backgroundColor: 'brown',
      minWidth: 1
    }
  },
  ASInput: {
    prepend: 1,
    width: 4,
    append: 7,
    prePromptWidth: 4,
    postPromptWidth: 0,
    uuid: undefined,
    name: 'Adverse Event Name',
    content: 'default ASInput content',
    promptNumber: 'CIE49sfsdf',
    prePrompt: '',
    postPrompt: '',
    type: 'AdverseEvent',
    render: {
      backgroundColor: 'green',
      minWidth: 1
    }
  },
  Echo: {
    uuid: undefined,
    name: 'Echo Name',
    width: 4,
    content: 'default Echo content',
    prepend: 1,
    append: 1,
    type: 'Echo',
    render: {
      backgroundColor: 'orange',
      minWidth: 1
    },
    sourceInput: ''
  },
  CDSTextInput: {
    prepend: 1,
    width: 4,
    append: 7,
    prePromptWidth: 4,
    postPromptWidth: 0,
    uuid: undefined,
    script: '  const id = x => x',
    editeable: 'true',
    prePrompt: '',
    postPrompt: '',
    name: 'text input name',
    sasCodeLabel: 'sasCodeLabel',
    type: 'CDSTextInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE492a',
    autoNumber: 'SEQUENTIAL',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    render: {
      backgroundColor: 'blue',
      minWidth: 3
    }
  }
};

export var defaultPropsFE = {
  Form: {
    uuid: undefined,
    type: 'Form',
    version: 1,
    autoId: true,
    allowEventAttachedFile: true,
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
            children: [new RadioButton(initFE.RadioButton), new SelectionInput(initFE.SelectionInput)],
            legend: 'legend',
            prepend: 3,
            append: 3
          })
          // new FormSection({   uuid: undefined,   type: 'FormSection',   width: 16,
          // children: [],   legend: 'legend',   prepend: 4,   append: 4,   render: {
          // backgroundColor: 'rgba(243, 234, 95, 0.7)',     minWidth: 3,   }, }), new
          // FormSection({   uuid: undefined,   type: 'FormSection',   width: 24,
          // children: [],   legend: 'legend',   prepend: 0,   append: 0,   render: {
          // backgroundColor: 'rgba(243, 234, 95, 0.7)',     minWidth: 3,   }, }),
        ],
        legend: '1',
        prepend: 0,
        append: 0
      }),
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [new FormSection({
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
          })],
        legend: '2',
        prepend: 0,
        append: 0
      }),
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [new FormSection({
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
          })],
        legend: '3',
        prepend: 0,
        append: 0
      }),
      new FormSection({
        uuid: undefined,
        type: 'FormSection',
        width: 24,
        children: [new FormSection({
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
          })],
        legend: '4',
        prepend: 0,
        append: 0
      })
    ],
    crf: 'crf',
    inputs: [
      'input1', 'input2'
    ],
    remoteValidatorCondition: {
      0: 'zero',
      1: 'one'
    },
    sectionTabs: true,
    versionDescription: 'version description'
  }
};
