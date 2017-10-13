import React from 'react'
import {
  backgroundPanelStyle,
  leftPanelStyle,
  middlePanelStyle,
  rightPanelStyle,
  headerPanelStyle,
  bodyPanelStyle
} from './styles/Layout'

// import PaletteBarHeader from './palette/PaletteBarHeader'
// import PaletteBarBody from './palette/PaletteBarBody'
// import PaletteBarFooter from './palette/PaletteBarFooter'

import DesignBoxHeader from './design/DesignBoxHeader'
// import DesignBoxGrid from './design/DesignBoxGrid'

import EditorBox from './editor/EditorBox'

const BackgroundPanel = () =>
  <div style={backgroundPanelStyle}>
    <LeftPanel />
    <MiddlePanel />
    <RightPanel />
  </div>

const LeftPanel = () =>
  <div style={leftPanelStyle}>
  </div>

const HeaderPanel = () =>
  <div style={headerPanelStyle}>
  </div>

const MiddlePanel = (props) =>
  <div style={middlePanelStyle}>
    <div style={{ ...headerPanelStyle, backgroundColor: "blue" }}>
      <DesignBoxHeader />
      </div>
  </div>

const RightPanel = () =>
  <div style={rightPanelStyle}>
  </div>

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
}

export default Layout;