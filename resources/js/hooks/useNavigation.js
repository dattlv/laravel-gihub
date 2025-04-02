import { usePage } from '@inertiajs/react';

export const useNavigation = () => {
  const { url } = usePage();

  const isActive = path => url.startsWith(path);

  return { isActive };
};
