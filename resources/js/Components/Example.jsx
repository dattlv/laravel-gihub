import { useTranslation } from '../hooks/useTranslation';

export default function Example() {
    const { t } = useTranslation();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{t('welcome')}</h1>
            <div className="space-y-4">
                <p>{t('dashboard')}</p>
                <p>{t('profile')}</p>
                <p>{t('settings')}</p>
            </div>
        </div>
    );
}
