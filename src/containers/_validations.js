import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';

export const _validations = {
  String: {
    type: 'String',
    length: 2
  },
  Date: {
    type: 'Date',
    fixed: null,
    full: null,
    partialExpression: null,
    timeZone: null
  },
  Float: {
    type: 'Float'
    // fixed: null,
    // full: null,
    // partialExpression: null,
    // timeZone: null
  },
  Integer: {
    type: 'Integer'
    // fixed: null,
    // full: null,
    // partialExpression: null,
    // timeZone: null
  }
};
