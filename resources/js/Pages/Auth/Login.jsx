import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import EmailVerificationStep from '@/Components/Auth/EmailVerificationStep';
import PasswordStep from '@/Components/Auth/PasswordStep';
import StepTransition from '@/Components/Auth/StepTransition';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailVerified = (userData) => {
        setIsLoading(true);
        setUser(userData);

        // Simulate a small delay to show loading state
        setTimeout(() => {
            setStep(2);
            setIsLoading(false);
        }, 800); // Increased delay for better visibility
    };

    const handlePrevious = () => {
        setStep(1);
        setUser(null);
    };

    const handleSwipeNext = () => {
        if (user) {
            handleEmailVerified(user);
        }
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
                <StepTransition
                    step={step}
                    isLoading={isLoading}
                    onNext={handleSwipeNext}
                    onPrevious={handlePrevious}
                >
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
