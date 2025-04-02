import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import EmailVerificationStep from '@/Components/Auth/EmailVerificationStep';
import PasswordStep from '@/Components/Auth/PasswordStep';
import StepTransition from '@/Components/Auth/StepTransition';
import SocialLoginButtons from '@/Components/Auth/SocialLoginButtons';
import { useState } from 'react';
import { authApiSlice } from '@/features/auth/authApiSlice';

export default function Login({ status, canResetPassword }) {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Only use loginMutation, remove useGetUserQuery since we don't need it on login page
  const [loginMutation, { isLoading: isLoginLoading }] =
    authApiSlice.useLoginMutation();

  const handleEmailVerified = userData => {
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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const credentials = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const result = await loginMutation(credentials).unwrap();
      // Handle successful login
      console.log('Login successful:', result);
    } catch (err) {
      // Handle error
      console.error('Failed to login:', err);
    }
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <div className="relative min-h-[250px]">
        <StepTransition
          step={step}
          isLoading={isLoading || isLoginLoading}
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

      <form onSubmit={handleSubmit}>{/* Your form elements here */}</form>

      <div className="mt-6">
        <SocialLoginButtons />
      </div>
    </GuestLayout>
  );
}
