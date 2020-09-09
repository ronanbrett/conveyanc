import React from 'react';

import MapMarker from './MapMarker';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/MapMarker',
  decorators: [],
  component: MapMarker,
};


export const Default = (props) => (
  <MapMarker {...props}></MapMarker>
);
