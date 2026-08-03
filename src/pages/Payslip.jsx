
import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading"
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets.jsx"
import PayslipList from "../components/payslip/PayslipList.jsx"
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm.jsx"

const Payslip = () => {
  const [payslips, setPayslips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const isAdmin = true;
  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchPayslips()
  }, [fetchPayslips]) 
  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData)
  }, [isAdmin]) 
  
  if (loading) {
    return <Loading />
  }





  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row justify-between  sm:items-center items-start mb-8">
        <div>
          <h1 className="page-title">Payslip</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips" : "Your payslip history"} 
          </p>
        </div>
        {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips} />}
      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  )
}

export default Payslip