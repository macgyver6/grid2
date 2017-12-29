import FormComponent from '../components/FormEntities/Form';
import FormSectionComponent from '../components/FormEntities/FormSection';
import TextInputComponent from '../components/FormEntities/TextInput';
import TextAreaComponent from '../components/FormEntities/TextArea';
import CheckBoxComponent from '../components/FormEntities/CheckBox';
import RadioButtonComponent from '../components/FormEntities/RadioButton';
import { Form } from '../data/Form';
import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { CheckBox } from '../data/CheckBox';
import { RadioButton } from '../data/RadioButton';
import { utility } from '../utility';

export const aux = {
  /**
   *
   * @param {FormEntity} entity
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */

  dragStart_handler: (event, model, form) => {
    event.stopPropagation();
    event.dataTransfer.setData("address", JSON.stringify({
      action: 'move',
      address: utility.findNode(model, form)
    }));
  }
}