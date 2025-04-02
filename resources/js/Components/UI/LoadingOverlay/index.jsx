export default function LoadingOverlay({ message = 'Đang xử lý...' }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg">
        <div className="relative flex justify-center h-12">
          <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-pink-200"></div>
          <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
        </div>
        <div className="mt-4">
          <span className="text-purple-700 font-bold text-lg">{message}</span>
        </div>
      </div>
    </div>
  );
}
