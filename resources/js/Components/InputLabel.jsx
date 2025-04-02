import React from 'react';
import PropTypes from 'prop-types';

export default function InputLabel({
  value,
  htmlFor,
  className = '',
  children,
  ...props
}) {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={`block font-medium text-sm text-gray-700 ${className}`}
    >
      {value || children}
    </label>
  );
}

InputLabel.propTypes = {
  value: PropTypes.string,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
