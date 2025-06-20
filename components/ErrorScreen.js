import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorScreen({ onRetry }) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-6">
      <div className="text-center max-w-sm">
        <div className="mb-6">
          <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 text-sm">
            We couldn't load the videos. Please check your connection and try again.
          </p>
        </div>
        <button
          onClick={onRetry}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
