import { Link } from '@inertiajs/react';

export default function LanguageSwitcher() {
    return (
        <div className="flex space-x-4">
            <Link
                href={route('language.switch', 'en')}
                className="text-gray-600 hover:text-gray-900"
            >
                English
            </Link>
            <Link
                href={route('language.switch', 'vi')}
                className="text-gray-600 hover:text-gray-900"
            >
                Tiếng Việt
            </Link>
        </div>
    );
}
