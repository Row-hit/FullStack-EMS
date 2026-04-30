import { Loader2, Save, User } from "lucide-react";
import { useState } from "react";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-white border rounded-xl shadow-sm p-6 max-w-4xl mx-auto my-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-gray-600" />
        <h2 className="text-sm font-semibold text-gray-800">Public Profile</h2>
      </div>

      {/* Errors   */}
      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-20 mb-6 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
          {error}
        </div>
      )}

      {/* message   */}
      {message && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border border-emerald-200 mb-6 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          {message}
        </div>
      )}

      {/* Form */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-c0ls-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              disabled
              value={`${initialData.firstName}  ${initialData.lastName}`}
              className="bg-slate-50 text-slate-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              disabled
              value={initialData.email}
              className="bg-slate-50 text-slate-400 cursor-not-allowed"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Position
            </label>
            <input
              disabled
              value={initialData.position}
              className="bg-slate-50 text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Bio
          </label>
          <textarea
            disabled={initialData.isDeleted}
            name="bio"
            defaultValue={initialData.bio}
            placeholder="Write a brief bio. "
            className={`resize-none  ${initialData.isDeleted ? "bg-slate-50 text-slate-400 cursor-not-allowed" : ""} `}
          />
          <p className="text-xs text-slate-400 mt-1.5">
            This will be displayed on your profile.
          </p>
        </div>
        {initialData.isDeleted ? (
          <div className="pt-2">
            <div className="p-4 bg-rose-50 border border-rose-20 rounded-xl text-center">
              <p className="text-rose-600 font-medium tracking-tight">
                Account Deactivated
              </p>
              <p className="text-sm text-rose-50 mt-Ø.5">
                You can no longer update your profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4 animate-pulse" />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
