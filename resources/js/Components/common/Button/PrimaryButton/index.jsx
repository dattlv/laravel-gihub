import React from 'react';
import PropTypes from 'prop-types';
import { StyledPrimaryButton } from './PrimaryButton.styles';

export function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <StyledPrimaryButton {...props} className={className} disabled={disabled}>
      {children}
    </StyledPrimaryButton>
  );
}

PrimaryButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default PrimaryButton;
