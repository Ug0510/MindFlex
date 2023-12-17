import React from 'react';
import '../assets/css/style.css';

const WoodInput = ({ value, onChange, placeholder, style }) => {
  return (
    <input
      type="text"
      className="wood-border"
      style={{ maxWidth: '30vw', ...style }}
      placeholder={placeholder}
      value={value}
      onChange={onChange || (() => {})} // Use onChange if provided, otherwise use an empty function
    />
  );
};


export default WoodInput;
