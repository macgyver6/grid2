import React from 'react';
import { PaletteEntityStyle } from '../auxillary/styles/PaletteBar';

const PaletteEntity = ({ title, type, backgroundColor, connectDragSource }) => {
  <div style={{ ...PaletteEntityStyle, backgroundColor }}>{title}</div>;
};

module.exports = PaletteEntity;
