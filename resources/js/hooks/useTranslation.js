import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { props } = usePage();
    const translations = props.translations || {};

    return {
        t: (key) => translations[key] || key,
    };
}
