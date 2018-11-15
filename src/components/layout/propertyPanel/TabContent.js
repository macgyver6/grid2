import EntityExplorer from './EntityProperty/EntityExplorer';
import FormProperty from './FormProperty';
import React from 'react';

const tabContent = {
  EntityExplorer: EntityExplorer,
  FormProperty: FormProperty,
  default: () => <p>Please select an entity to view property</p>,
};

export const TabContent = ({ activeTab, ...props }) => {
  const TabContent =
    (props.model && tabContent[activeTab]) || tabContent['default'];
  return <TabContent {...props} />;
};
