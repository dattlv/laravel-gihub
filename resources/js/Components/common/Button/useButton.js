import { useCallback } from 'react';

export const useButtonLogic = ({ onClick }) => {
  const handleClick = useCallback(
    event => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick],
  );

  return {
    handleClick,
  };
};
