import EntityExplorer from './EntityExplorer';
import React from 'react';

const tabContent = {
  EntityExplorer: EntityExplorer,
  default: () => <p>Please select an entity to view property</p>,
};

export const EntityProperty = ({ activeTab, ...props }) => {
  const TabContent = tabContent[activeTab] || tabContent['default'];
  return <TabContent {...props} />;
};
