import React from 'react';
import {
  backgroundPanelStyle,
  leftPanelStyle,
  middlePanelStyle,
  rightPanelStyle,
  headerPanelStyle,
  bodyPanelStyle,
} from './styles/Layout';

// import PaletteBarHeader from './palette/PaletteBarHeader'
// import PaletteBarBody from './palette/PaletteBarBody'
// import PaletteBarFooter from './palette/PaletteBarFooter'

import DesignBoxHeader from './design/DesignBoxHeader';
// import DesignBoxGrid from './design/DesignBoxGrid'

import EditorBox from './editor/EditorBox';

const BackgroundPanel = () => (
  <div style={backgroundPanelStyle}>
    <LeftPanel />
    <MiddlePanel model={props.model} form={props.form} />
    <RightPanel />
  </div>
);

const LeftPanel = () => <div style={leftPanelStyle} />;

const HeaderPanel = () => <div style={headerPanelStyle} />;

const MiddlePanel = props => (
  <div style={middlePanelStyle} model={props.model} form={props.form}>
    <DesignBoxHeader
      model={props.model}
      form={props.form}
      mutate={props.mutate}
    />
  </div>
);

const RightPanel = () => <div style={rightPanelStyle} />;

const Layout = () => {
  return (
    <div>
      <BackgroundPanel />

      {/* <div style={{ ...headerPanelStyle, backgroundColor: "green" }}>
          <DesignBoxHeader tabs={tabs} selected_tab={selected_tab} handleApplicationAction={handleApplicationAction} />
        </div>
        <div style={{ ...bodyPanelStyle, backgroundColor: "#DDDDDD" }}>
          <DesignBoxGrid
            entities={entities}
            entityIsResizing={entityIsResizing}
            handleApplicationAction={handleApplicationAction} />
        </div> */}

      {/*
        <EditorBox
          formId={selected_form_entity.id}
          editorViewId={editorViewId}
          attributesViewId={attributesViewId}
          attributes={attribute}
          validators={validators}
          composites={composites}
          composite={composite}
          handleApplicationAction={handleApplicationAction} /> */}
    </div>
  );
};

export default Layout;
