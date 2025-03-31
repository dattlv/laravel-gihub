import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import EmailVerificationStep from '@/Components/Auth/EmailVerificationStep';
import PasswordStep from '@/Components/Auth/PasswordStep';
import StepTransition from '@/Components/Auth/StepTransition';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState(null);

    const handleEmailVerified = (userData) => {
        setUser(userData);
        setStep(2);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="relative min-h-[250px]">
                <StepTransition step={step}>
                    {step === 1 ? (
                        <EmailVerificationStep onEmailVerified={handleEmailVerified} />
                    ) : (
                        <PasswordStep user={user} canResetPassword={canResetPassword} />
                    )}
                </StepTransition>
            </div>
        </GuestLayout>
    );
}
