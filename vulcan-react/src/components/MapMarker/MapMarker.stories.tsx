import React from 'react';

import MapMarkers from './MapMarker';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/MapMarker',
  decorators: [],
  component: MapMarkers,
};


export const Default = (props) => (
  <MapMarkers {...props}></MapMarkers>
);
