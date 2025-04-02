import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from './Input.styles';

export const Input = forwardRef(
  ({ type = 'text', className = '', isFocused = false, ...props }, ref) => (
    <StyledInput
      {...props}
      type={type}
      className={className}
      ref={ref}
      autoFocus={isFocused}
    />
  ),
);

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
};

export default Input;
