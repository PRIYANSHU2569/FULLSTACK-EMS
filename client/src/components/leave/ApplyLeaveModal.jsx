import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";
import React from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
 
  const [loading, setLoading] = React.useState(false);
  const today = new Date();
  const tommorrow = new Date(today);
  tommorrow.setDate(today.getDate() + 1);
  const minDate = tommorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    try{
      await api.post('/leave',data)
      onSuccess()
      onClose();
    }catch(error){
      console.log("LEAVE ERROR STATUS:", error.response?.status);
  console.log("LEAVE ERROR DATA:", error.response?.data);

  toast.error(
    error.response?.data?.error || "Failed to apply for leave"
  );
    }
  };
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Apply for Leave
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Submit your leave request for approval
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
         {/**----Form------ */}
         <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/**----leave type------ */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <FileText className="w-4 h-4 text-slate-400"/>
              Leave Type
            </label>
            <select name="type" required>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>
          {/**----duration------ */}
          <div>
             <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <CalendarDays className="w-4 h-4 text-slate-400"/>
              Duaration
            </label>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-slate-400">
                          From
                  </span>
                  <input type="date" name="startDate" required min={minDate} />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                          To
                  </span>
                  <input type="date" name="endDate" required min={minDate} />
                </div>
            </div>
          </div>
          {/**----reason------ */}
          <div>
             <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              Reason
            </label>
            <textarea name="reason" required rows={3} className="resize-none" placeholder="Briefy describe why you need this leave..."></textarea>
          </div>
          {/**----buttons------ */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} type="button" className="btn-secondary flex-1">
              Cancel
            </button>
             <button disabled={loading}type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">

              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
              {loading ? "Submitting...": "Submit"}
            </button>
          </div>
         </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
