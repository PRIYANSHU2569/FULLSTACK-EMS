const LoginLeftSide = () => {
  return (
      <div className="relative hidden min-h-screen w-1/2 items-center overflow-hidden bg-indigo-950 px-12 text-white md:flex">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative z-10">
          <h1 className="mb-6 text-4xl font-medium leading-tight tracking-tight lg:text-5xl">
            Employee<br />Management System
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-slate-300">
            Streamline your workforce operations, track attendance, manage payroll, and empower your team securely.
          </p>
        </div>
      </div>
  )
}

export default LoginLeftSide
