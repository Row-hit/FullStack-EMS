import React, { useState } from "react";
import Loading from "../ui/Loading";
import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";

const LeaveApplyModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-CA"); //  YYYY-MM-DD
  };
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = formatDate(tomorrow);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  if (!open) return null;
  if (loading) return <Loading />;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 animate-in fade-in zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Apply for Leave
            </h2>
            <p className="text-sm text-slate-500">
              Submit your leave request for approval
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Leave Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
              <FileText className="w-4 h-4 text-slate-400" />
              Leave Type
            </label>
            <select
              name="type"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              Duration
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-slate-400 mb-1">From</span>
                <input
                  type="date"
                  name="startDate"
                  required
                  min={minDate}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <span className="block text-xs text-slate-400 mb-1">To</span>
                <input
                  type="date"
                  name="endDate"
                  required
                  min={minDate}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Reason
            </label>
            <textarea
              name="reason"
              required
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Briefly describe why you need this leave..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 rounded-lg py-2 text-sm hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplyModal;
