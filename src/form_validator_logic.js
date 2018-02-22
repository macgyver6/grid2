import { defaultPropsFE } from './constants/defaultPropsFE';
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

export const validateLogic = {
  // negativePrepend: (form) => {
  //   // process this form and return public copy with props
  //   // const props = form.properties()
  //   if (form.type() !== 'Form' && (form.prepend() < 0 || form.append() < 0)) { return 'negative prepend or appeed' }

  //   let children;
  //   if (form instanceof Form || form instanceof FormSection) {
  //     // process any children
  //     children = form.children().map(child => {
  //       return
  //       validateLogic.negativePrepend(child)
  //     });
  //   }

  //   // console.log('end of file')
  //   return 'no issues'
  // },

  searchTree: element => {
    const node = element.properties();
    console.log(element);
    if (
      element.type() !== 'Form' &&
      (element.prepend() < 0 || element.append() < 0)
    ) {
      console.log(element);
      return true;
    } else if (node.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < node.children.length; i++) {
        result = validateLogic.searchTree(node.children[i]);
      }
      return result;
    }
    return null;
  },

  negativePrependPostpend: element => {
    console.log(element);
    const node = element.properties();
    if (
      element.type() !== 'Form' &&
      (element.prepend() < 0 || element.append() < 0)
    ) {
      return element;
    } else if (node.children != null) {
      var i;
      var result = null;
      for (i = 0; i < node.children.length; i++) {
        result = validateLogic.negativePrependPostpend(node.children[i]);
      }
      return result;
    }
    return false;
  },

  largerThanParent: (element, form) => {
    console.log(element);
    const total = element => element.prepend + element.width + element.append;
    const node = element.properties();
    if (
      element.type() !== 'Form' &&
      (element.prepend() < 0 || element.append() < 0)
    ) {
      return element;
    } else if (node.children != null) {
      console.log(node.children);
      var i;
      var result = null;
      for (i = 0; i < node.children.length; i++) {
        result = validateLogic.largerThanParent(node.children[i], form);
      }
      return result;
    }
    return false;
  },
};
