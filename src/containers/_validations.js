export const _dataDefined = {
  String: {
    type: 'String',
    length: 2,
    userDefined: {
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
        eventDef: 'sampleDef'
      },
      NoOp: {
        emptyField: false,
        anyValue: false,
        customFailureMessaage: '',
        language: '',
        country: '',
        overRideable: false,
        eventDef: 'sampleDef'
      },
      Enumeration: {
        formDependency: '',
        inputId: '',
        eventDefinition: '',
        occureance: '',
        occuranceNum: 0,
        validationPattern: '',
        overRideable: false,
        eventDef: 'sampleDef'
      }
    }
  },
  Date: {
    type: 'Date',
    fixed: false,
    full: false,
    partialExpression: null,
    timeZone: null,
    userDefined: ['NoOp', 'Enumeration', 'Range']
  },
  Integer: {
    type: 'Integer',
    length: 2,
    userDefined: ['Pattern', 'NoOp', 'Enumeration', 'Range']
  },
  Float: {
    type: 'Float',
    length: 2,
    userDefined: ['Pattern', 'NoOp', 'Enumeration', 'Range']
  }
}; //string //string //string //string
// ['Pattern', 'NoOp', 'Enumeration', 'SubjectInputValidation']

const dataDefined = {
  Pattern: {
    formDependency: '', //string
    inputId: '', //string
    eventDefinition: '',
    occureance: '',
    occuranceNum: 0,
    validationPattern: '',
    customFailureMessaage: '',
    language: ''
  },
  NoOp: {
    emptyField: false,
    anyValue: false,
    customFailureMessaage: '',
    language: '',
    country: ''
  },
  Enumeration: {
    formDependency: '', //string
    inputId: '', //string
    eventDefinition: '',
    occureance: '',
    occuranceNum: 0,
    validationPattern: ''
  },
  SubjectInputValidation: {}
};

export const _validations = {
  String: {
    type: 'String',
    length: 2
  },
  Date: {
    type: 'Date',
    fixed: false,
    full: false,
    partialExpression: null,
    timeZone: null
  },
  Float: {
    type: 'Float',
    length: 2
  },
  Integer: {
    type: 'Integer',
    length: 2
  },
  Pattern: {
    value: 'pattern content'
  },
  EmptyField: {
    value: 'EmptyField content'
  },
  Enumeration: {
    value: 'Enumeration content'
  },
  SubjectInputValidation: {
    value: 'SubjectInputValidation content'
  }
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

  'Vietnames>'
];
