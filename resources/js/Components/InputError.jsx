import React from 'react';
import PropTypes from 'prop-types';

export default function InputError({ message, className = '' }) {
  return message ? (
    <p className={`text-sm text-red-600 ${className}`}>{message}</p>
  ) : null;
}

InputError.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};
