import { useEffect } from 'react';
import Checkbox from '@/components/UI/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { authApiSlice } from '../../features/auth/authApiSlice';
import EmailVerificationStep from '@/components/Auth/EmailVerificationStep';
import StepTransition from '@/components/Auth/StepTransition';
import SocialLoginButtons from '@/components/Auth/SocialLoginButtons';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Only use loginMutation, remove useGetUserQuery since we don't need it on login page
  const [loginMutation, { isLoading: isLoginLoading }] =
    authApiSlice.useLoginMutation();

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const handleEmailVerified = userData => {
    setIsLoading(true);
    setUser(userData);

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
      return result;
    } catch (err) {
      return err;
    }
  };

  const submit = e => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
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

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={e => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={e => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={e => setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot your password?
            </Link>
          )}

          <PrimaryButton className="ml-4" disabled={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-6">
        <SocialLoginButtons />
      </div>
    </GuestLayout>
  );
}
