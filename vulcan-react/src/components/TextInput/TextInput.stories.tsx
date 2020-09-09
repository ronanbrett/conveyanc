import React from 'react';

import TextInput from './TextInput';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/TextInput',
  decorators: [],
  component: TextInput,
};

const SimpleTextInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => {
    setValue(event.target.value)
  };

  return (
        <div>
          <TextInput value={value} onChange={onChange} />
           <p>value: {value}</p>
        </div>
  );
};


export const Default = (props) => (
  <SimpleTextInput {...props}></SimpleTextInput>
);
