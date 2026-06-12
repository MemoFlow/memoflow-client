export default function Footer() {
  return (
    <footer className="w-full border-t border-black/[0.03] py-10 px-8 bg-transparent mt-auto">
      <div className="max-w-6xl w-full mx-auto flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-6">
        <div className="flex flex-col gap-1.5 text-left">
          <span className="font-brand text-[1.1rem] font-semibold text-brand-green-dark tracking-tight">MemoFlow</span>
          <p className="font-sans text-[0.75rem] text-slate-500">
            © 2024 MemoFlow. Empowering academic clarity.
          </p>
        </div>
        
        <div className="flex gap-6 flex-wrap max-md:gap-4 max-md:w-full">
          <a href="#privacy" className="font-sans text-[0.75rem] text-slate-500 font-normal hover:text-brand-green-dark hover:underline">Privacy Policy</a>
          <a href="#terms" className="font-sans text-[0.75rem] text-slate-500 font-normal hover:text-brand-green-dark hover:underline">Terms of Service</a>
          <a href="#institutional" className="font-sans text-[0.75rem] text-slate-500 font-normal hover:text-brand-green-dark hover:underline">Institutional Access</a>
          <a href="#support" className="font-sans text-[0.75rem] text-slate-500 font-normal hover:text-brand-green-dark hover:underline">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
