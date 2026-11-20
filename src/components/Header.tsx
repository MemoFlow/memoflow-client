import BrandLogo from './BrandLogo';
import Link from './Link';
import { ROUTES } from '../services/router';

export default function Header() {
  return (
    <header className="w-full h-20 flex items-center bg-transparent border-b border-black/[0.03] px-8 z-10 max-sm:px-4 max-sm:h-16">
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
        <Link to={ROUTES.home} className="flex items-center gap-2.5 no-underline" aria-label="MemoFlow, accueil">
          <BrandLogo size={36} />
          <span className="font-brand text-[1.35rem] font-medium text-brand-green-dark tracking-tight">MemoFlow</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to={ROUTES.home} className="font-sans text-[0.85rem] text-slate-500 font-normal tracking-wide no-underline hover:text-brand-green-dark">Découvrir MemoFlow</Link>
        </div>
      </div>
    </header>
  );
}
