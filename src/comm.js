// import {defaultPropsFE} from './constants/defaultPropsFE';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { address } from './address';

export const comm = {
  serialize: node => {
    // process this node and return public copy with props
    const props = node.properties();
    let children;
    if (props && props.children) {
      // process any children
      children = props.children.map(child => comm.serialize(child));
    }
    return { ...props, children };
  },

  unserialize: node => {
    // process this node and return public copy with props
    const props = address.resurrectEntity(node);
    if (node && (props instanceof Form || props instanceof FormSection)) {
      // process any children
      return props.setChildren(
        props.children().map(child => comm.unserialize(child))
      );
    }
    return props;
  },
};
