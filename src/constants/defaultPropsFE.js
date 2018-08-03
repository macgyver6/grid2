import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { CheckBox } from '../data/CheckBox';
import { TextArea } from '../data/TextArea';
import { SelectionInput } from '../data/SelectionInput';
import { CDSTextInput } from '../data/CDSTextInput';
import { EchoInput } from '../data/EchoInput';
import { autoSuggestInput } from '../data/autoSuggestInput';

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
    autoNumberRule: 'N+',
    uuid: undefined,
    prepend: 0,
    width: 6,
    append: 10,
    prePromptWidth: 4,
    postPromptWidth: 4,
    prePrompt: '',
    postPrompt: '',
    name: '',
    QxQ: '',
    sasCodeLabel: '',
    type: 'TextInput',
    tabOrder: null,
    inputWidth: 8,
    promptNumber: '',
    autoNumber: 'SEQUENTIAL',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    autoNameRule: 'CIE492a',
    render: { backgroundColor: '#6C788F', minWidth: 3 },
  },
  SelectionInput: {
    uuid: undefined,
    autoNumberRule: 'N+',
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
    tabOrder: null,
    inputWidth: 8,
    promptNumber: '',
    externalIdentifier: 'CIE493b',
    autoNumber: 'SEQUENTIAL',
    doubleEntry: true,
    defaultContent: '',
    renderMode: 'selection',
    options: [
      { label: '', value: '' },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
    ],
    render: { backgroundColor: 'red', minWidth: 3 },
  },
  TextArea: {
    uuid: undefined,
    autoNumberRule: 'N+',
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
    externalIdentifier: 'CIE513c',
    tabOrder: null,
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
    autoNumberRule: 'N+',
    prepend: 0,
    width: 1,
    append: 19,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    name: '',
    sasCodeLabel: '',
    externalIdentifier: 'CIE2567b',
    type: 'CheckBox',
    tabOrder: null,
    inputWidth: 8,
    promptNumber: 'CIE493g',
    autoNumber: 'SEQUENTIAL',
    defaultState: true,
    render: { backgroundColor: '#00C5EC', minWidth: 1 },
  },
  TextBlock: {
    uuid: undefined,
    name: '',
    width: 6,
    content: '',
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
    content: '',
    prepend: 0,
    append: 16,
    type: 'ImageBlock',
    render: { backgroundColor: 'brown', minWidth: 1 },
  },
  autoSuggest: {
    autoNumberRule: 'N+',
    prepend: 0,
    width: 4,
    append: 16,
    prePromptWidth: 4,
    postPromptWidth: 0,
    uuid: undefined,
    name: '',
    content: 'default autoSuggest content',
    promptNumber: '',
    externalIdentifier: 'CIE49sfsdf',
    prePrompt: '',
    postPrompt: '',
    dictionaryName: '',
    type: 'autoSuggest',
    render: { backgroundColor: 'green', minWidth: 1 },
  },
  Echo: {
    autoNumberRule: 'N+',
    uuid: undefined,
    name: '',
    prepend: 0,
    width: 4,
    append: 16,
    prePromptWidth: 4,
    postPromptWidth: 0,
    prePrompt: '',
    postPrompt: '',
    externalIdentifier: 'CIE0873a',
    defaultContent: '',
    type: 'Echo',
    render: { backgroundColor: 'orange', minWidth: 1 },
    sourceInput: '',
  },
  CDSTextInput: {
    autoNumberRule: 'N+',
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
    externalIdentifier: 'CIE3983a',
    name: '',
    sasCodeLabel: '',
    type: 'CDSTextInput',
    tabOrder: null,
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
    autoId: { enable: false },
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
              // new autoSuggestInput(initFE.autoSuggest),
              // new EchoInput(initFE.Echo),
              // new CDSTextInput(initFE.CDSTextInput),
              // new TextInput(initFE.TextInput),
              // new SelectionInput(initFE.SelectionInput),
              // new CheckBox(initFE.CheckBox),
              new TextInput({ ...initFE.TextInput, externalIdentifier: '', tabOrder: 1 }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 2,
              }),
              new TextInput({
                ...initFE.TextInput,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 7,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 6,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 5,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 4,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 3,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 8,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 9,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 10,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 11,
              }),
              new TextArea({
                ...initFE.TextArea,
                externalIdentifier: '',
                autoNumberRule: 'N+',
                tabOrder: 12,
              }),
            ],
            // children: [new TextInput(initFE.TextInput)],
            legend: 'legend',
            prepend: 0,
            append: 0,
          }),
          // new FormSection({
          //   uuid: undefined,
          //   type: 'FormSection',
          //   width: 24,
          //   children: [],
          //   // children: [new TextInput(initFE.TextInput)],
          //   legend: 'legend',
          //   prepend: 0,
          //   append: 0,
          // }),
          // new FormSection({   uuid: undefined,   type: 'FormSection',   width: 16,
          // children: [],   legend: 'legend',   prepend: 4,   append: 4,   render: {
          // backgroundColor: 'rgba(243, 234, 95, 0.7)',     minWidth: 3,   }, }), new
          // FormSection({   uuid: undefined,   type: 'FormSection',   width: 24,
          // children: [],   legend: 'legend',   prepend: 0,   append: 0,   render: {
          // backgroundColor: 'rgba(243, 234, 95, 0.7)',     minWidth: 3,   }, }),
        ],
        legend: 'Tab 1',
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
            width: 24,
            legend: 'legend',
            children: [
              // new TextArea(initFE.TextArea)
            ],
            prepend: 0,
            append: 0,
            render: {
              backgroundColor: 'rgba(243, 234, 95, 0.7)',
              minWidth: 3,
            },
          }),
        ],
        legend: 'Tab 2',
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
      //       width: 24,
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
      //   legend: 'Tab 3',
      //   prepend: 0,
      //   append: 0,
      // }),
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
