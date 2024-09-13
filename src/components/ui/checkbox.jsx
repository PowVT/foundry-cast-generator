import React from 'react';

export const Checkbox = React.forwardRef((props, ref) => (
  <input type="checkbox" ref={ref} {...props} />
));