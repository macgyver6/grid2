import { address } from './address';

export const validateLogic = {
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
    const elementCheck = element => {
      if (element.type() !== 'Form') {
        return element.prepend() < 0 || element.append() < 0;
      } else {
        return false;
      }
    };
    if (element.type() !== 'Form' && elementCheck(element)) {
      return true;
    } else if (element.type() === 'FormSection' || element.type() === 'Form') {
      var i;
      var result = undefined;
      for (i = 0; result === undefined && i < element.children().length; i++) {
        result = validateLogic.negativePrependPostpend(element.children()[i]);
      }
      return result;
    }
    return undefined;
  },

  largerThanParent: (element, form) => {
    const total = element =>
      element.prepend() + element.width() + element.append();
    const parentEntity = element => {
      if (address.bySample(element, form).length < 2) {
        return false;
      } else {
        const parentTotal = total(
          address.byPath(
            form,
            address
              .bySample(element, form)
              .slice(0, address.bySample(element, form).length - 1)
          )
        );
        const elementTotal = total(element);
        return elementTotal > parentTotal ? true : false;
      }
    };
    if (parentEntity(element)) {
      return true;
    } else if (element.type() === 'FormSection' || element.type() === 'Form') {
      var i;
      var result = undefined;
      for (i = 0; result === undefined && i < element.children().length; i++) {
        result = validateLogic.largerThanParent(element.children()[i], form);
      }
      return result;
    }
    return undefined;
  },
};
