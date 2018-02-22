// import {defaultPropsFE} from './constants/defaultPropsFE';
import FormComponent from './components/FormEntities/Form';
import FormSectionComponent from './components/FormEntities/FormSection';
import TextInputComponent from './components/FormEntities/TextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import CheckBoxComponent from './components/FormEntities/CheckBox';
import RadioButtonComponent from './components/FormEntities/RadioButton';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { TextInput } from './data/TextInput';
import { TextArea } from './data/TextArea';
import { CheckBox } from './data/CheckBox';
import { RadioButton } from './data/RadioButton';
import { utility } from './utility';
import { address } from './address'
import { validateLogic } from './form_validator_logic'

export const validator = {
  drop: (form) => {
    console.log(validateLogic.searchTree(form))
    console.log(validateLogic.largerThanParent(form, form))
    console.log(validateLogic.negativePrependPostpend(form))
    // 1. form must start with 1 top level form section
    if (form.children().length < 1) { return 'must have top level form section' }
    // 2. entities must have > 0 prepend and append
    // form.children()
    // else if (validateLogic.negativePrependPostpend(form)) { return 'prepend and append must >= 0' }
    // 3. if the child total() is larger than the width of the section
    // else if (validateLogic.largerThanParent(form, form)) { return 'child width cannot exceed parnt width'}



    else { undefined }
  }
}
