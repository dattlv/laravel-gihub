import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function TextInput({
  type = 'text',
  className = '',
  isFocused = false,
  ...props
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
        className
      }
      ref={input}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
};
