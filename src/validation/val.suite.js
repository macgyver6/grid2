import { utility } from './val.utility';

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
    shoudNotBeLargerThanSection: e =>
      e.width() > 24 ? { exception: 'Must not be larger than containing section', entity: e } : undefined,
    shoudNotBeNegativeWidth: e => (e.width() < 1 ? { exception: 'Must not be negative width', entity: e } : undefined),
    shouldContainDefaultContent: e =>
      e.defaultContent() === undefined ? { exception: 'must contain default text', entity: e } : undefined,
    noNegativePrependPostpend: e =>
      e.prepend() < 0 || e.append() < 0
        ? {
            exception: 'Entity must have positive prepend and postpend values',
            entity: e,
          }
        : undefined,
  },
};
