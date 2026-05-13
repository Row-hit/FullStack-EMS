import { useEffect, useState } from "react";
import { dummyProfileData } from "../assets/assets";
import Loading from "../components/ui/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../components/settings_page/ProfileForm";
import ChangePasswordModal from "../components/settings_page/ChangePasswordModal";
import toast from "react-hot-toast";
import API from "../api/axios";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await API.get("/profile");
      const profile = res.data;
      if (profile) setProfile(profile);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      {profile && (
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />
      )}

      {/* password reset manager   */}

      <div className="card flex items-center justify-between p-4 bg-white   rounded-xl shadow-sm max-w-md">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            <Lock className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Password</h3>
            <p className="text-xs text-gray-500">
              {" "}
              Update your account password
            </p>
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="btn-secondary text-sm cursor-pointer"
        >
          Change
        </button>
      </div>
      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Settings;
