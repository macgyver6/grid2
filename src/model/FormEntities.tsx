type Partial<T> = { [P in keyof T]?: T[P] };

const uuidv4 = require("uuid/v4");

interface Form {
  /** The entities which exist directly beneath the form. */
  children: Array<FormEntity>;
  /** Whether files should be allowed to be attached to an event associated with this form. */
  allowEventAttachedFiles: boolean;
  /** Controls the behavior of whether/how child inputs have their external IDs automatically generated */
  autoIds: {
    enabled: boolean;
    /** ex. ABC.1 The value used between prefix and externalID */
    separator: string;
    /** The value used prior to separator */
    prefix: string;
  };
  /** Whether top-level FormSection entities should be considered as tabs. */
  sectionTabs: boolean;
}

type FormConfig = Partial<Form>;

export function generateForm(config?: FormConfig): Form {
  const FormDefault = {
    type: "Form",
    children: [],
    topLevel: false,
    allowEventAttachedFiles: false,
    autoIds: {
      enabled: false,
      separator: "",
      prefix: ""
    },
    sectionTabs: true
  };
  return { ...FormDefault, ...config };
}

interface FormEntity {
  /** The Form Entity's UUID generated client-side. */
  uuid: string;
  /** Width of the entity itself in grid units. */
  width: Number;
}
type FormEntityConfig = Partial<FormEntity>;

export function generateFormEntity(config?: FormEntityConfig): FormEntity {
  const FORM_ENTITY_DEFAULT = {
    width: 6,
    uuid: uuidv4()
  };
  return { ...FORM_ENTITY_DEFAULT, ...config };
}

interface FormSection extends FormEntity {
  /** The child form entities within the form section. */
  children: Array<string>;
  /** The value used as a label for FormSections that are Top Level */
  legend: String;
}
type FormSectionConfig = Partial<FormSection>;

export function generateFormSection(config?: FormSectionConfig): FormSection {
  const FORM_SECTION_DEFAULT = {
    type: "FormSection",
    width: 24,
    children: [],
    topLevel: false,
    prepend: 0,
    append: 0,
    legend: ""
  };
  return {
    ...generateFormEntity(),
    ...FORM_SECTION_DEFAULT,
    ...config
  };
}

type ExternalId = string;

interface FormInput extends FormEntity {
  /** Width of leading prompts in grid units. */
  prePromptWidth: Number;
  /** Prompt prefix that should appear before rendered representations of this input. */
  prePrompt: String;
  /** Width of trailing prompts in grid units. */
  postPromptWidth: Number;
  /** Prompt suffix that should appear before rendered representations of this input. */
  postPrompt: String;
  /** Resulting value should not be assumed to be globally-unique among all other forms */
  externalId: ExternalId;
  /** Order of the input  in the Form's tab order */
  tabOrder: number;
}
type FormInputConfig = Partial<FormInput>;

export function generateFormInput(config?: FormInputConfig): FormInput {
  const FORM_INPUT_DEFAULT = {
    externalId: "",
    prePromptWidth: 0,
    prePrompt: "",
    postPromptWidth: 0,
    postPrompt: "",
    tabOrder: 0
  };
  return { ...generateFormEntity(), ...FORM_INPUT_DEFAULT, ...config };
}

interface TextInput extends FormInput {
  /** Max length for input. Default is 60, and if NO_MAX is passed in, no max length will be applied to this field. */
  maxLength: number;
  /** The default contents of representations of this input item. */
  defaultContent: string;
  /** Whether the input is defined as permitting auto tab to the next field during data collection. */
  autoTab: boolean;
}
type TextInputConfig = Partial<TextInput>;

export function generateTextInput(config?: TextInputConfig): TextInput {
  const TEXT_INPUT_DEFAULT = {
    type: "TextInput",
    maxLength: 60,
    defaultContent: "",
    autoTab: false
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...TEXT_INPUT_DEFAULT,
    ...config
  };
}

interface TextArea extends FormInput {
  /** Set the number of rows in the text area (HTML element property). */
  numRows: number;
  /** Set the number of columns in the text area (HTML element property). */
  numColumns: number;
}
type TextAreaConfig = Partial<TextArea>;

export function generateTextArea(config?: TextAreaConfig): TextArea {
  const TEXT_AREA_DEFAULT = {
    type: "TextArea",
    numRows: 3,
    numColumns: 0
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...TEXT_AREA_DEFAULT,
    ...config
  };
}

interface Padding extends FormEntity {
  width: number;
}
type PaddingConfig = Partial<Padding>;

export function generatePadding(config?: PaddingConfig): Padding {
  const PADDING_DEFAULT = {
    type: "Padding",
    width: 1
  };
  return { ...generateFormEntity(), ...PADDING_DEFAULT, ...config };
}

interface CheckBox extends FormInput {
  /** Default state of the CheckBox. */
  defaultState: boolean;
}

type CheckBoxConfig = Partial<Padding>;

export function generateCheckBox(config?: CheckBoxConfig): CheckBox {
  const CHECK_BOX_DEFAULT = {
    defaultState: false
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...CHECK_BOX_DEFAULT,
    ...config
  };
}

enum RenderModes {
  radio,
  selection
}

enum InputTypes {
  string,
  number,
  boolean,
  null
}

type SelectionInputTypes = InputTypes.string | InputTypes.number;

interface SelectionInput extends FormInput {
  /** Defines if the Selection Input will render as a select or radio button set */
  renderMode: RenderModes;
  /** Expected type of the selection input */
  inputType: SelectionInputTypes;
}

type SelectionInputConfig = Partial<SelectionInput>;

export function generateSelectionInput(
  config?: SelectionInputConfig
): SelectionInput {
  const SELECTION_INPUT_DEFAULT = {
    renderMode: RenderModes.selection,
    inputType: 0
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...SELECTION_INPUT_DEFAULT,
    ...config
  };
}

interface TextBlock extends FormEntity {
  /** Content to be rendered in the text block. */
  content: string;
  /** Background color of the text block. */
  backgroundColor: string;
}

type TextBlockConfig = Partial<TextBlock>;

export function TextBlock(config?: TextBlockConfig): TextBlock {
  const TEXT_BLOCK_DEFAULT = {
    content: "",
    backgroundColor: "blue"
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...TEXT_BLOCK_DEFAULT,
    ...config
  };
}

interface ImageBlock extends FormEntity {
  /** Alternate text for an image (HTML property) */
  alt: string;
  /** Title of the image (HTML property) */
  title: string;
  /** UTL of the image (HTML property) */
  url: string;
}

type ImageBlockConfig = Partial<ImageBlock>;

export function generateImageBlock(config?: ImageBlockConfig): ImageBlock {
  const IMAGE_BLOCK_DEFAULT = {
    alt: "",
    title: "",
    url: ""
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...IMAGE_BLOCK_DEFAULT,
    ...config
  };
}

/** Also known as AdverseEventInput */
interface AutoSuggestInput extends FormInput {
  /** The dictionary used to lookup the term. */
  dictionaryName: string;
}

type AutoSuggestInputConfig = Partial<AutoSuggestInput>;

export function generateAutoSuggestInput(
  config?: AutoSuggestInputConfig
): AutoSuggestInput {
  const AUTO_SUGGEST_INPUT_DEFAULT = {
    dictionaryName: ""
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...AUTO_SUGGEST_INPUT_DEFAULT,
    ...config
  };
}

interface EchoInput extends TextInput {
  /** Whether the input implementation may be made editable. */
  editeable: boolean;
  /** External ID of the input who's value will be renderd in this input */
  sourceInput: ExternalId;
}

type EchoInputConfig = Partial<EchoInput>;

export function generateEchoInput(config?: EchoInputConfig): EchoInput {
  const ECHO_INPUT_DEFAULT = {
    editeable: false,
    sourceInput: ""
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...generateTextInput(),
    ...ECHO_INPUT_DEFAULT,
    ...config
  };
}

enum EvaluationPolicy {
  placeHolder
}

interface CDSTextInput extends TextInput {
  /** Get the script which should be evaluated to produce the value of the input. */
  script: string;
  /** Whether the input implementation may be made editable. */
  editeable: boolean;
  /** Policy that dictates when the script will operate. */
  evaluationPolicy: EvaluationPolicy;
}

type CDSTextInputConfig = Partial<CDSTextInput>;

export function generateCDSTextInput(
  config?: CDSTextInputConfig
): CDSTextInput {
  const CDSTextInputDefault = {
    editeable: false,
    evaluationPolicy: EvaluationPolicy.placeHolder,
    script: ""
  };
  return {
    ...generateFormEntity(),
    ...generateFormInput(),
    ...generateTextInput(),
    ...CDSTextInputDefault,
    ...config
  };
}
