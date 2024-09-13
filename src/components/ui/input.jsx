import React from 'react';

export const Input = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} className="border rounded px-2 py-1 w-full" />
));

export const Textarea = React.forwardRef((props, ref) => (
  <textarea ref={ref} {...props} className="border rounded px-2 py-1 w-full" />
));