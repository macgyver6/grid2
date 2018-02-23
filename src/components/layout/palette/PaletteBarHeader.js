import React from 'react';
import { PaletteBarHeaderStyle } from '../auxillary/styles/PaletteBar';
class PaletteBarHeader extends React.Component {
  render() {
    return (
      <div style={PaletteBarHeaderStyle}>
        <div style={{ marginTop: '10%' }}>Palette</div>
      </div>
    );
  }
}

module.exports = PaletteBarHeader;
