import { useForm } from '@inertiajs/react';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import LoadingOverlay from '@/components/UI/LoadingOverlay';
import axios from 'axios';

export default function EmailVerificationStep({ onEmailVerified }) {
  const { data, setData, processing, errors, setError } = useForm({
    email: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(route('api.verify-account'), {
        email: data.email,
      });
      onEmailVerified(response.data.user);
    } catch (error) {
      setError(
        'email',
        error.response?.data?.errors?.email?.[0] || 'Không tìm thấy tài khoản',
      );
    }
  };

  return (
    <>
      {processing && <LoadingOverlay message="Đang xử lý..." />}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Đăng nhập</h2>
        <p className="mt-2 text-sm text-gray-600">
          Vui lòng nhập email của bạn để tiếp tục
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
              className="pl-10 block w-full"
              autoComplete="username"
              isFocused={true}
              placeholder="example@email.com"
              onChange={e => setData('email', e.target.value)}
            />
          </div>
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a
              href={route('register')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký ngay
            </a>
          </div>
          <PrimaryButton className="ml-4" disabled={processing}>
            Tiếp tục
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
