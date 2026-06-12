interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="w-full h-20 flex items-center bg-transparent border-b border-black/[0.03] px-8 z-10 max-sm:px-4 max-sm:h-16">
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
        <button className="bg-none border-none p-0 cursor-pointer flex items-center" onClick={onLogoClick} aria-label="MemoFlow Accueil">
          <span className="font-brand text-[1.35rem] font-medium text-brand-green-dark tracking-tight">MemoFlow</span>
        </button>
        
        <div className="flex items-center gap-4">
          <a href="#help" className="font-sans text-[0.85rem] text-slate-500 font-normal tracking-wide hover:text-brand-green-dark hover:no-underline">Help</a>
          <div className="flex items-center justify-center text-brand-green-dark">
            <svg
              className="stroke-brand-green-dark"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
