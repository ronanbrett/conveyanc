import React, { useState } from 'react';

import Select from '../Select';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Select',
  decorators: [],
  component: Select,
};


const SimpleSelect = ({ ...rest }) => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('one');
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: "center", alignItems: "center"}}>
      <Select
        id="select"
        name="select"
        placeholder="Select"
        value={value}
        disabled={[2, 6]}
        options={options}
        onChange={({ option }) => setValue(option)}
      /></div>
  );
};
const defaultOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
}


export const Default = (props) => (
  <SimpleSelect {...props}></SimpleSelect>
);


const SearchSelect = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState('');

  return (
    <Select
        id="select"
        name="select"
        placeholder="Select"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
        onClose={() => setOptions(defaultOptions)}
        onSearch={text => {
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');
          const opts = defaultOptions.filter(o => exp.test(o));

          setOptions(opts);
        }}
      />
  )
  
}

export const Seach = () => (<SearchSelect />)