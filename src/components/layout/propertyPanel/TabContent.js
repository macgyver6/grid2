import EntityProperty from "./EntityProperty";
import FormProperty from "./FormProperty";
import React from 'react'

const tabContent = {
      EntityProperty: EntityProperty,
      FormProperty: FormProperty,
      default: () => <p>Please select an entity to view property</p>
  }

export const TabContent = ({ activeTab, ...props }) => {
  const TabContent = tabContent[activeTab] || tabContent['default'];
  return <TabContent {...props} />;
};