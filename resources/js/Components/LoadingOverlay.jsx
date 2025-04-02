export default function LoadingOverlay({ message = 'Đang xử lý...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
        <div className="relative flex h-12 justify-center">
          <div className="absolute h-12 w-12 rounded-full border-4 border-solid border-pink-200"></div>
          <div className="border-gradient-to-r absolute h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-transparent from-purple-600 to-pink-600"></div>
        </div>
        <div className="mt-4">
          <span className="text-lg font-bold text-purple-700">{message}</span>
        </div>
      </div>
    </div>
  );
}
