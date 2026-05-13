import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import API from "../api/axios";

const VerifyEmailPage = () => {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await API.get(`/employees/verify-email/${token}`);

        setSuccess(true);
        setMessage(res.data.message);
      } catch (error) {
        setSuccess(false);

        setMessage(error?.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {loading ? (
          <>
            <Loader2 className="mx-auto animate-spin mb-4" size={50} />
            <h2 className="text-xl font-semibold">Verifying Email...</h2>
          </>
        ) : success ? (
          <>
            <CheckCircle className="mx-auto text-green-500 mb-4" size={60} />

            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Email Verified
            </h2>

            <p className="text-slate-600">{message}</p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto text-red-500 mb-4" size={60} />

            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>

            <p className="text-slate-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
