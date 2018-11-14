// import {defaultPropsFE} from './constants/defaultPropsFE';
// import FormComponent from '../components/FormEntities/Form';
// import FormSectionComponent from '../components/FormSection';
import FormEntityContainer from '../components/FormEntityContainer';
// import SelectionInputComponent from '../components/FormEntities/SelectionInput';
// import TextBlockComponent from '../components/FormEntities/TextBlock';
// import ImageBlockComponent from '../components/FormEntities/ImageBlock';
// import Form from '../data/Form';
// import FormSection from '../data/FormSection';
// import TextInput from '../data/TextInput';
// import CDSTextInput from '../data/CDSTextInput';
// import TextArea from '../data/TextArea';
// import CheckBox from '../data/CheckBox';
// import SelectionInput from '../data/SelectionInput';
// import TextBlock from '../data/TextBlock';
// import ImageBlock from '../data/ImageBlock';
// import EchoInput from '../data/EchoInput';
// import AutoSuggestInput from '../data/AutoSuggestInput';
// import { TextInputProperty } from '../containers/TextInputProperty';
// import { CDSTextInputProperty } from '../containers/CDSTextInputProperty';
// import { TextAreaProperty } from '../containers/TextAreaProperty';
// import { autoSuggestProperty } from '../containers/AutoSuggestProperty';
// import { CheckBoxProperty } from '../containers/CheckBoxProperty';
// import SelectionInputProperty from '../containers/SelectionInputProperty';
// import { TextBlockProperty } from '../containers/TextBlockProperty';
// import { ImageBlockProperty } from '../containers/ImageBlockProperty';
// import { EchoProperty } from '../containers/EchoProperty';
// import { FormSectionProperty } from '../containers/FormSectionProperty';
// import DateValidationUI from '../containers/validations/DateValidationUI';
// import StringValidationUI from '../containers/validations/stringValidationUI';
// import IntegerValidationUI from '../containers/validations/integerValidationUI';
// import FloatValidationUI from '../containers/validations/floatValidationUI';
// import PatternValidation from '../containers/validations/PatternValidation';
// import EnumerationValidation from '../containers/validations/EnumerationValidation';
// import SubjectInputValidation from '../containers/validations/SubjectInputValidation';
// import EmptyFieldValidation from '../containers/validations/EmptyFieldValidation';
// import RangeValidation from '../containers/validations/RangeValidation';
// import NoOpValidation from '../containers/validations/NoOpValidation';
// import PatternValidator from '../containers/validations/data/PatternValidator';
// import EnumerationValidator from '../containers/validations/data/EnumerationValidator';
// import NoOpValidator from '../containers/validations/data/NoOpValidator';
// import RangeValidator from '../containers/validations/data/RangeValidator';
// import SubjectInputValidator from '../containers/validations/data/SubjectInputValidator';
import TI_Fragment from '../components/input_fragments/TI_Fragment';
import FS_Fragment from '../components/input_fragments/FS_Fragment';
import Padding_Fragment from '../components/input_fragments/Padding_Fragment';
// import TA_Fragment from '../components/FormEntities/input_fragments/TA_Fragment';
// import TB_Fragment from '../components/FormEntities/input_fragments/TB_Fragment';
// import IB_Fragment from '../components/FormEntities/input_fragments/IB_Fragment';
// import SI_Fragment from '../components/FormEntities/input_fragments/SI_Fragment';
// import AI_Fragment from '../components/FormEntities/input_fragments/AI_Fragment';

export const address = {
  lookupComponent: modelInstance => {
    const FormEntities = {
      //   FormSection: FormSectionComponent,
      default: FormEntityContainer,
    };
    return FormEntities[modelInstance] || FormEntities.default;
  },
  lookupFragment: modelInstance => {
    const Fragments = {
      FormSection: FS_Fragment,
      TextInput: TI_Fragment,
      Padding: Padding_Fragment,
    };
    return Fragments[modelInstance] || console.log('OOB: ', modelInstance);
  },
  getHumanName: entityType => {
    switch (entityType) {
      case 'CDSTextInput':
        return 'CDS Text Input';
      case 'TextInput':
        return 'Text Input';
      case 'TextArea':
        return 'Text Area';
      case 'CheckBox':
        return 'Check Box';
      case 'SelectionInput':
        return 'Selection Input';
      case 'TextBlock':
        return 'Text Block';
      case 'ImageBlock':
        return 'Image Block';
      case 'AutoSuggestInput':
        return 'Auto-suggest';
      case 'Echo':
        return 'Echo Input';
      case 'FormSection':
        return 'Form Section';
      default:
        return null;
    }
  },
};
//   lookupFragment: modelInstance => {
//     const entity = modelInstance.split('.')[0];
//     console.log(modelInstance);
//     if (modelInstance instanceof Form) {
//       return FormComponent;
//     } else if (entity === 'FormSection') {
//       return TI_Fragment;
//     } else if (entity === 'CDSTextInput') {
//       return TI_Fragment;
//     } else if (entity === 'TextInput') {
//       return TI_Fragment;
//     } else if (entity === 'TextArea') {
//       return TA_Fragment;
//     } else if (entity === 'CheckBox') {
//       return TI_Fragment;
//     } else if (entity === 'SelectionInput') {
//       return SI_Fragment;
//     } else if (entity === 'TextBlock') {
//       return TB_Fragment;
//     } else if (entity === 'ImageBlock') {
//       return IB_Fragment;
//     } else if (entity === 'AutoSuggestInput') {
//       return AI_Fragment;
//     } else if (entity === 'EchoInput') {
//       return TI_Fragment;
//     }
//   },

//   whichEntity: modelInstance => {
//     if (
//       modelInstance instanceof CDSTextInput ||
//       modelInstance === 'CDSTextInput'
//     ) {
//       return CDSTextInputProperty;
//     } else if (
//       modelInstance instanceof FormSection ||
//       modelInstance === 'FormSection'
//     ) {
//       return FormSectionProperty;
//     } else if (
//       modelInstance instanceof TextInput ||
//       modelInstance === 'TextInput'
//     ) {
//       return TextInputProperty;
//     } else if (
//       modelInstance instanceof TextArea ||
//       modelInstance === 'TextArea'
//     ) {
//       return TextAreaProperty;
//     } else if (
//       modelInstance instanceof CheckBox ||
//       modelInstance === 'CheckBox'
//     ) {
//       return CheckBoxProperty;
//     } else if (
//       modelInstance instanceof SelectionInput ||
//       modelInstance === 'SelectionInput'
//     ) {
//       return SelectionInputProperty;
//     } else if (
//       modelInstance instanceof TextBlock ||
//       modelInstance === 'TextBlock'
//     ) {
//       return TextBlockProperty;
//     } else if (
//       modelInstance instanceof ImageBlock ||
//       modelInstance === 'ImageBlock'
//     ) {
//       return ImageBlockProperty;
//     } else if (
//       modelInstance instanceof AutoSuggestInput ||
//       modelInstance === 'AutoSuggestInput'
//     ) {
//       return autoSuggestProperty;
//     } else if (
//       modelInstance instanceof EchoInput ||
//       modelInstance === 'EchoInput'
//     ) {
//       return EchoProperty;
//     }
//   },
