import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';

const defaultProps = {
  TextInput: ( new TextInput({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'text input name', sasCodeLabel: 'sasCodeLabel', type: 'TextInput', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, length: 'DEFAULT', autoTab: true, doubleEntry: true, defaultContent: 'Default Content'})),
  TextArea: ( new TextArea({uuid: 1, width: 2, prePrompt: 'prePromptString', prePromptWidth: 6, postPrompt: 'postPromptString', postPromptWidth: 6, name: 'name', sasCodeLabel: 'sasCodeLabel', type: 'TextArea', tabOrder: [1, 2, 3], inputWidth: 7, promptNumber: 'promptNumber',  prepend: 88, autoNumber: 'SEQUENTIAL', append: 4, numColumns: 10, numRows: 11, defaultContent: 'Default Content'}))
}

export default defaultProps;