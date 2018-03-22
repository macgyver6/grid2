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
    willBeIssue: e => {
      return { exception: 'This is an issue' };
    },
  },
  FormSection: {
    sumChildrenLessSection: section => {
      var increment = 0;
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
    shoudNotBeNegativeWidth: e =>
      e.width() < 0
        ? { exception: 'Must not be negative width', entity: e }
        : undefined,
    shouldContainDefaultContent: e =>
      e.defaultContent() == undefined
        ? { exception: 'must contain default text', entity: e }
        : undefined,
    noNegativePrependPostpend: e => {
      return e.prepend() < 0 || e.append() < 0
        ? {
            exception: 'Entity must have positive prepend and postpend values',
            entity: e,
          }
        : undefined;
    },
  },
};
