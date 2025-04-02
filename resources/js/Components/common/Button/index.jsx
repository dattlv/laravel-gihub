import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonStyles } from './Button.styles';
import { useButtonLogic } from './useButton';

const StyledButton = styled(MuiButton)(ButtonStyles);

export function Button({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  ...props
}) {
  const { handleClick } = useButtonLogic({ onClick });

  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
