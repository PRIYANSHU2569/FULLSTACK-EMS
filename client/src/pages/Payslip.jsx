import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets.jsx";
import PayslipList from "../components/payslip/PayslipList.jsx";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import { toast } from "react-hot-toast";

const Payslip = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const fetchPayslips = useCallback(async () => {
    try {
      const res = await api.get("/payslips");

      const data = Array.isArray(res.data) ? res.data : res.data.data || [];

      setPayslips(data);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);
  useEffect(() => {
    if (isAdmin)
      api
        .get("/employees")
        .then((res) => setEmployees(res.data.filter((e) => !e.isDeleted)))
        .catch(() => {});
  }, [isAdmin]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row justify-between  sm:items-center items-start mb-8">
        <div>
          <h1 className="page-title">Payslip</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>
        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={fetchPayslips}
          />
        )}
      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslip;
