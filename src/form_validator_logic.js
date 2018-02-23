import { address } from './address';
import { comm } from './comm';

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
    console.log(element);
    const node = element.properties();
    if (
      element.type() !== 'Form' &&
      (element.prepend() < 0 || element.append() < 0)
    ) {
      return 'bang';
    } else if (node.children != null) {
      var i;
      var result = null;
      for (i = 0; i < node.children.length; i++) {
        result = validateLogic.negativePrependPostpend(node.children[i]);
      }
      // return 'blooh';
    }
    return 'blah';
  },

  largerThanParent: (element, form) => {
    const total = element =>
      element.prepend() + element.width() + element.append();
    const _element = comm.serialize(element);
    console.log(_element.children, form);

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
        console.log(elementTotal, parentTotal);
        return elementTotal > parentTotal ? true : false;
      }
    };
    console.log(parentEntity(element));
    if (parentEntity(element)) {
      console.log('found it: ', 'element.uuid');
      return 'element.uuid';
    } else if (_element.children !== undefined) {
      var i;
      var result = undefined;
      for (i = 0; result == undefined && i < _element.children.length; i++) {
        result = validateLogic.largerThanParent(_element.children[i], form);
      }
      console.log('deeper');
      return result; // if nothing is found
    }
    console.log('final');
    return undefined;
  },

  largerThanParent2: (element, form) => {
    console.log(element, comm.serialize(element));
    const _element = comm.serialize(element);
    const total = element =>
      element.prepend() + element.width() + element.append();
    // const node = _element.properties();
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
        console.log(elementTotal, parentTotal);
        return elementTotal > parentTotal ? true : false;
      }
    };
    console.log(parentEntity(element));
    if (parentEntity(element)) {
      console.log('ppp found it: ', _element);
      return _element;
    } else if (_element.children != null) {
      var i;
      var result = undefined;
      for (i = 0; i < result == undefined && _element.children.length; i++) {
        result = validateLogic.largerThanParent(element.children()[i], form);
      }
      console.log('ppp going deeper');
      return result; // if nothing is found
    }
    console.log('ppp last');
    return 'undefined2';
  },
};
