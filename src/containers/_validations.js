export const _dataDefined = {
  String: {
    type: 'String',
    length: 2,
    userDefined: ['PatternValidator', 'NoOpValidator', 'EnumerationValidator', 'SubjectInputValidator'],
  },
  Date: {
    type: 'Date',
    fixed: false,
    full: false,
    partialExpression: null,
    timeZone: null,
    userDefined: ['NoOpValidator', 'EnumerationValidator', 'RangeValidator'],
  },
  Integer: {
    type: 'Integer',
    length: 2,
    userDefined: ['PatternValidator', 'NoOpValidator', 'EnumerationValidator', 'RangeValidator'],
  },
  Float: {
    type: 'Float',
    length: 2,
    userDefined: ['PatternValidator', 'NoOpValidator', 'EnumerationValidator', 'RangeValidator'],
  },
};

export const inputDefinedValidator = {
  Echo: ['PatternValidator', 'NoOpValidator', 'EnumerationValidator', 'RangeValidator'],
  CDSTextInput: ['PatternValidator', 'NoOpValidator', 'EnumerationValidator', 'SubjectInputValidator'],
  TextArea: null,
  autoSuggest: null,
  TextInput: true,
};

export const dataDefinedByInput = {
  TextInput: ['String', 'Integer', 'Date', 'Float'],
  CDSTextInput: ['String', 'Date', 'Integer', 'Float'],
  autoSuggest: false,
  TextArea: false,
  SelectionInput: ['String', 'Integer', 'Float'],
  CheckBox: false,
  autoSuggest: false,
};

export const validatorsByInput = {
  Any: ['PatternValidator', 'NoOpValidator', 'EnumerationValidator', 'SubjectInputValidator'],
};
//string //string //string //string
// ['Pattern', 'NoOp', 'Enumeration', 'SubjectInputValidation']

export const userDefined = {
  Pattern: {
    formDependency: '',
    inputId: '',
    eventDefinition: '',
    occureance: '',
    occuranceNum: 0,
    validState: false,
    nullIsValid: false,
    strong: false,
    validationPattern: 'samplePattern',
    customFailureMessaage: 'sampleFailureMessage',
    language: '',
    overRideable: false,
    eventDef: 'sampleDef',
  },
  NoOp: {
    emptyField: false,
    anyValue: false,
    customFailureMessaage: '',
    language: '',
    country: '',
    overRideable: false,
    eventDef: 'sampleDef',
  },
  Enumeration: {
    formDependency: '',
    inputId: '',
    eventDefinition: '',
    occureance: '',
    occuranceNum: 0,
    validationPattern: '',
    overRideable: false,
    eventDef: 'sampleDef',
  },
  SubjectInputValidation: { script: '' },
  Range: {
    type: 'SubjectInputValidation',
    customFailureMessage: 'customFailureMessage',
    validState: 'validState',
    strong: 'strong',
    nullIsValid: 'nullIsValid',
    inputIndex: 'inputIndex',
    externalId: 'externalId',
    maxInclusive: 'maxInclusive',
    minInclusive: 'minInclusive',
    min: 'min',
    max: 'max',
  },
};

export const _validations = {
  String: {
    type: 'String',
    length: 2,
  },
  Date: {
    type: 'Date',
    fixed: false,
    full: false,
    partialExpression: null,
    timeZone: null,
  },
  Float: {
    type: 'Float',
    length: 2,
  },
  Integer: {
    type: 'Integer',
    length: 2,
  },
  Pattern: {
    value: 'pattern content',
  },
  EmptyField: {
    value: 'EmptyField content',
  },
  Enumeration: {
    value: 'Enumeration content',
  },
  SubjectInputValidation: {
    value: 'SubjectInputValidation content',
  },
};
export const locals2 = ['Albanian', 'Arabic'];

export const locals = [
  '',
  'Albanian',

  'Arabic',

  'Belarusian',

  'Bulgarian',

  'Catalan',

  'Chinese',

  'Croatian',

  'Czech',

  'Danish',

  'Dutch',

  'English',

  'Estonian',

  'Finnish',

  'French',

  'German',

  'Greek',

  'Hebrew',
  'Hindi',

  'Hungarian',

  'Icelandic',

  'Indonesian',

  'Irish',

  'Italian',

  'Japanese',

  'Korean',

  'Latvian',

  'Lithuanian',

  'Macedonian',

  'Malay',

  'Maltese',

  'Norwegian',

  'Polish',

  'Portuguese',

  'Romanian',

  'Russian',

  'Serbian',

  'Slovak',

  'Slovenian',

  'Spanish',

  'Swedish',

  'Thai',

  'Turkish',

  'Ukrainian',

  'Vietnames>',
];
