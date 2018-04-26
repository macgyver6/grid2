import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';

export const _dataDefined = {
  String: {
    type: 'String',
    length: 2,
    userDefined: ['Pattern', 'NoOp', 'Enumeration', 'SubjectInputValidation']
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
