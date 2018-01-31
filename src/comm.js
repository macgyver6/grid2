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
import { address } from './address';

export const comm = {

  serialize: (node) => {
    // process this node and return public copy with props
    const props = node.properties()
    let children;
    if (props && props.children) {
      // process any children
      (children = props.children.map(child => comm.serialize(child)));
    }
    return { ...props, children }
  },

  unserialize: (node) => {
    // process this node and return public copy with props
    const props = address.resurrectEntity(node)
    if (node && (props instanceof Form || props instanceof FormSection)) {
      // process any children
      return props.setChildren(props.children().map(child => comm.unserialize(child)
      ))
    }
    return props
  }
}
