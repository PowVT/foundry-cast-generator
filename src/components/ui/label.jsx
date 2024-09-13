import React from 'react';

export const Label = ({ children, ...props }) => (
  <label {...props} className="block mb-1">{children}</label>
);