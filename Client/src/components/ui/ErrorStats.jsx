import { RefreshCw } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const ErrorState = ({ onRetry, retryHide = false }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-red-500/10">
            <RefreshCw className="text-red-400" size={28} />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-xl font-semibold text-gray-600 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-400 text-sm mb-6">We couldn’t find the data.</p>

        {/* Retry Button */}
        <button
          hidden={retryHide}
          onClick={onRetry}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
