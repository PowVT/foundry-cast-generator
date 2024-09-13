import React from 'react';

export const Card = ({ children, ...props }) => (
  <div {...props} className="border rounded p-4 mb-4">{children}</div>
);

export const CardHeader = ({ children, ...props }) => (
  <div {...props} className="mb-2">{children}</div>
);

export const CardTitle = ({ children, ...props }) => (
  <h2 {...props} className="text-xl font-bold">{children}</h2>
);

export const CardContent = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);