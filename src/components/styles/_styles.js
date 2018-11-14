export var _styles = {
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
    inputType: 'String',
    promptNumber: '',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    // autoNameRule: 'CIE492a',
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
    inputType: 'String',
    promptNumber: '',
    // externalIdentifier: 'CIE493b',
    doubleEntry: true,
    defaultContent: '',
    renderMode: 'selection',
    options: [
      { label: '', value: '' },
      // { label: 1, value: 1 },
      // { label: 2, value: 2 },
      // { label: 3, value: 3 },
      // { label: 4, value: 4 },
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
    inputType: 'String',

    type: 'TextArea',
    // externalIdentifier: 'CIE513c',
    tabOrder: null,
    inputWidth: 12,
    promptNumber: 'CIE494c',
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
    // externalIdentifier: 'CIE2567b',
    type: 'CheckBox',
    tabOrder: null,
    inputWidth: 8,
    promptNumber: 'CIE493g',
    defaultState: true,
    render: { backgroundColor: '#00C5EC', minWidth: 1 },
  },
  TextBlock: {
    uuid: undefined,
    name: '',
    width: 6,
    content: '',
    prepend: 0,
    append: 18,
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
  AutoSuggestInput: {
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
    // externalIdentifier: 'CIE49sfsdf',
    prePrompt: '',
    postPrompt: '',
    dictionaryName: '',
    type: 'AutoSuggestInput',
    render: { backgroundColor: 'green', minWidth: 1 },
  },
  EchoInput: {
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
    // externalIdentifier: 'CIE0873a',
    defaultContent: '',
    type: 'EchoInput',
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
    // externalIdentifier: 'CIE3983a',
    name: '',
    sasCodeLabel: '',
    type: 'CDSTextInput',
    tabOrder: null,
    inputWidth: 8,
    promptNumber: 'CIE492a',
    length: 80,
    autoTab: true,
    doubleEntry: true,
    defaultContent: '',
    render: { backgroundColor: 'blue', minWidth: 3 },
  },
};
