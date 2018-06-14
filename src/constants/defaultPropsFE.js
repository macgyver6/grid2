import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { CheckBox } from '../data/CheckBox';
import { TextArea } from '../data/TextArea';
import { SelectionInput } from '../data/SelectionInput';
import { CDSTextInput } from '../data/CDSTextInput';
import { EchoInput } from '../data/EchoInput';
import { AdverseEventInput } from '../data/AdverseEventInput';

export var initFE = {
  FormSection: {
    uuid: undefined,
    prepend: 0,
    width: 24,
    append: 0,
    type: 'FormSection',
    children: [],
    legend: 'legend',
    render: { backgroundColor: 'rgba(243, 234, 95, 0.7)', minWidth: 3 },
  },
  TextInput: {
    uuid: undefined,
    uuid: undefined,
    uuid: undefined,
    prepend: 0,
    width: 6,
    append: 14,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: '',
    QxQ: '',
    sasCodeLabel: '',
    type: 'TextInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE492a',
    autoNumber: 'SEQUENTIAL',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    externalIdentifier: 'test',
    render: { backgroundColor: '#6C788F', minWidth: 3 },
  },
  SelectionInput: {
    uuid: undefined,
    prepend: 0,
    width: 6,
    append: 14,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: '',
    sasCodeLabel: '',
    type: 'SelectionInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE493b',
    autoNumber: 'SEQUENTIAL',
    doubleEntry: true,
    defaultContent: '',
    renderMode: 'selection',
    options: [{}],
    render: { backgroundColor: 'red', minWidth: 3 },
  },
  TextArea: {
    uuid: undefined,
    prepend: 0,
    width: 6,
    append: 14,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: '',
    sasCodeLabel: '',
    type: 'TextArea',
    tabOrder: 1,
    inputWidth: 12,
    promptNumber: 'CIE494c',
    autoNumber: 'SEQUENTIAL',
    numColumns: 12,
    numRows: 2,
    defaultContent: '',
    render: { backgroundColor: '#205EE2', minWidth: 3 },
  },
  CheckBox: {
    uuid: undefined,
    prepend: 0,
    width: 1,
    append: 19,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: '',
    sasCodeLabel: '',
    type: 'CheckBox',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE493g',
    autoNumber: 'SEQUENTIAL',
    defaultState: true,
    render: { backgroundColor: '#00C5EC', minWidth: 1 },
  },
  TextBlock: {
    uuid: undefined,
    name: '',
    width: 4,
    content: 'default text block content',
    prepend: 0,
    append: 20,
    type: 'TextBlock',
    render: { backgroundColor: 'purple', minWidth: 1 },
  },
  ImageBlock: {
    alt: 'alt',
    title: '',
    url: '',
    uuid: undefined,
    name: '',
    width: 8,
    content: 'default text block content',
    prepend: 0,
    append: 16,
    type: 'ImageBlock',
    render: { backgroundColor: 'brown', minWidth: 1 },
  },
  ASInput: {
    prepend: 0,
    width: 4,
    append: 16,
    prePromptWidth: 4,
    postPromptWidth: 0,
    uuid: undefined,
    name: '',
    content: 'default ASInput content',
    promptNumber: 'CIE49sfsdf',
    prePrompt: '',
    postPrompt: '',
    dictionaryName: '',
    type: 'AdverseEvent',
    render: { backgroundColor: 'green', minWidth: 1 },
  },
  Echo: {
    uuid: undefined,
    name: '',
    prepend: 0,
    width: 4,
    append: 16,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    content: 'default Echo content',
    type: 'Echo',
    render: { backgroundColor: 'orange', minWidth: 1 },
    sourceInput: '',
  },
  CDSTextInput: {
    prepend: 0,
    width: 6,
    append: 14,
    prePromptWidth: 4,
    postPromptWidth: 0,
    uuid: undefined,
    script: 'script fn(x) => y',
    editeable: 'true',
    prePrompt: '',
    postPrompt: '',
    name: '',
    sasCodeLabel: '',
    type: 'CDSTextInput',
    tabOrder: 1,
    inputWidth: 8,
    promptNumber: 'CIE492a',
    autoNumber: 'SEQUENTIAL',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    render: { backgroundColor: 'blue', minWidth: 3 },
  },
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
            width: 24,
            children: [
              new AdverseEventInput(initFE.ASInput),
              new EchoInput(initFE.Echo),
              new CDSTextInput(initFE.CDSTextInput),
              new TextInput(initFE.TextInput),
              new SelectionInput(initFE.SelectionInput),
              new CheckBox(initFE.CheckBox),
              new TextArea(initFE.TextArea),
            ],
            // children: [new TextInput(initFE.TextInput)],
            legend: 'legend',
            prepend: 0,
            append: 0,
          }),
          new FormSection({
            uuid: undefined,
            type: 'FormSection',
            width: 24,
            children: [],
            // children: [new TextInput(initFE.TextInput)],
            legend: 'legend',
            prepend: 0,
            append: 0,
          }),
          // new FormSection({   uuid: undefined,   type: 'FormSection',   width: 16,
          // children: [],   legend: 'legend',   prepend: 4,   append: 4,   render: {
          // backgroundColor: 'rgba(243, 234, 95, 0.7)',     minWidth: 3,   }, }), new
          // FormSection({   uuid: undefined,   type: 'FormSection',   width: 24,
          // children: [],   legend: 'legend',   prepend: 0,   append: 0,   render: {
          // backgroundColor: 'rgba(243, 234, 95, 0.7)',     minWidth: 3,   }, }),
        ],
        legend: '1',
        prepend: 0,
        append: 0,
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
            append: 8,
            render: {
              backgroundColor: 'rgba(243, 234, 95, 0.7)',
              minWidth: 3,
            },
          }),
        ],
        legend: '2',
        prepend: 0,
        append: 0,
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
              minWidth: 3,
            },
          }),
        ],
        legend: '3',
        prepend: 0,
        append: 0,
      }),
      // new FormSection({
      //   uuid: undefined,
      //   type: 'FormSection',
      //   width: 24,
      //   children: [
      //     new FormSection({
      //       uuid: undefined,
      //       type: 'FormSection',
      //       width: 16,
      //       children: [],
      //       legend: 'legend',
      //       prepend: 0,
      //       append: 0,
      //       render: {
      //         backgroundColor: 'rgba(243, 234, 95, 0.7)',
      //         minWidth: 3,
      //       },
      //     }),
      //   ],
      //   legend: '4',
      //   prepend: 0,
      //   append: 0,
      // }),
    ],
    crf: 'crf',
    inputs: ['input1', 'input2'],
    remoteValidatorCondition: {
      0: 'zero',
      1: 'one',
    },
    sectionTabs: true,
    versionDescription: 'version description',
  },
};
