import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';

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
};
