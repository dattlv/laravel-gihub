import { useForm } from '@inertiajs/react';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Link } from '@inertiajs/react';
import LoadingOverlay from '@/components/UI/LoadingOverlay';
import Checkbox from '@/components/UI/Checkbox/index';
export default function PasswordStep({ user, canResetPassword }) {
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    email: user.email,
    password: '',
    remember: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
      onError: errors => {
        setError(
          'password',
          errors.password ||
            errors.email ||
            'Thông tin đăng nhập không chính xác',
        );
      },
    });
  };

  return (
    <>
      {processing && <LoadingOverlay message="Đang đăng nhập..." />}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Nhập mật khẩu</h2>
        <p className="mt-2 text-sm text-gray-600">
          Vui lòng nhập mật khẩu để đăng nhập
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="pl-10 block w-full bg-gray-100"
              autoComplete="username"
              disabled
            />
          </div>
        </div>

        <div>
          <InputLabel htmlFor="password" value="Mật khẩu" />
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="pl-10 block w-full"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu của bạn"
              onChange={e => setData('password', e.target.value)}
            />
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={e => setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">
              Ghi nhớ đăng nhập
            </span>
          </div>
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Quên mật khẩu?
            </Link>
          )}
        </div>

        <div className="flex items-center justify-end">
          <PrimaryButton
            className="w-full justify-center"
            disabled={processing}
          >
            Đăng nhập
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
