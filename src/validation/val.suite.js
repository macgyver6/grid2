import { utility } from './val.utility';

export const inputValidations = {
  // shoudNotBeLargerThanSection: e =>
  //   e.width() > 24 ? { exception: 'Must not be larger than containing section', entity: e } : undefined,
  // shoudNotBeNegativeWidth: e => (e.width() < 1 ? { exception: 'Must not be negative width', entity: e } : undefined),

  noNegativePrompts: e =>
    e.prePromptWidth() < 0 || e.postPromptWidth() < 0
      ? {
          exception: 'Entity prompt widths must be non-negative',
          entity: e,
        }
      : undefined,
};

export const entityValidations = {
  shoudNotBeLargerThanSection: e =>
    e.width() > 24 ? { exception: 'YYY Must not be larger than containing section', entity: e } : undefined,
  shoudNotBeNegativeWidth: e => (e.width() < 1 ? { exception: 'Must not be negative width', entity: e } : undefined),
  noNegativePrependPostpend: e =>
    e.prepend() < 0 || e.append() < 0
      ? {
          exception: 'Entity prepend/postpend widths must be non-negative',
          entity: e,
        }
      : undefined,
};

export const validations = {
  Form: {
    containMinOneSection: e =>
      e.children().length > 0 && e.children()[0] === 'FormSection'
        ? {
            exception: 'Form Must contain a FormSection as the first child',
            entity: e,
          }
        : undefined,
    willBeIssue: e => ({ exception: 'This is an issue' }),
  },
  FormSection: {
    sumChildrenLessSection: section => {
      let increment = 0;
      const validate = (e, sectionWidth) => {
        if (increment === section.width()) {
          increment = 0;
        }
        if (increment + e <= section.width()) {
          increment += e;
        } else {
          return { exception: 'sum child width must be less than parents' };
        }
      };
      return section.children().forEach(e => validate(utility.total(e), 18));
    },
  },
  TextInput: {
    shouldContainDefaultContent: e =>
      e.defaultContent() === undefined ? { exception: 'must contain default text', entity: e } : undefined,
  },
  SelectionInput: {
    default: e => undefined,
  },
  TextArea: {
    default: e => undefined,
  },
  CheckBox: {
    default: e => undefined,
  },
  TextBlock: {
    default: e => undefined,
  },
  ImageBlock: {
    default: e => undefined,
  },
  AdverseEvent: {
    default: e => undefined,
  },
  Echo: {
    default: e => undefined,
  },
  CDSTextInput: {
    default: e => undefined,
  },
};
