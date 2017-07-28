import { Form } from '../data/Form';
import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { Checkbox } from '../data/Checkbox';

export const defaultPropsFE = {
  
  Form: (new Form({ uuid: 10, type: 'Form', version: 1, autoId: true, children: [(new FormSection({uuid: 1, type: 'FormSection', width: 2, children: [], legend: 'string', prepend: 3, append: 4})), (new FormSection({uuid: 1, type: 'FormSection', width: 2, children: [], legend: 'string', prepend: 3, append: 4}))], crf: 'crf', inputs: ['input1', 'input2'], remoteValidatorCondition: { 0: 'zero', 1: 'one' }, sectionTabs: false, versionDescription: 'version description' })),

  FormSection: (new FormSection({uuid: 1, type: 'FormSection', width: 2, children: [], legend: 'string', prepend: 3, append: 4})),

  TextInput: ( new TextInput({uuid: null, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 4, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content'})),

  TextArea: ( new TextArea({uuid: null, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 100, numRows: 2, defaultContent: 'Default Content'})),

  Checkbox: (new Checkbox({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'Checkbox', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, defaultState: true}))
}