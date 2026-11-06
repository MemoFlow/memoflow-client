import BrandLogo from './BrandLogo';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer className="w-full border-t border-black/[0.03] py-10 px-8 bg-transparent mt-auto">
      <div className="max-w-6xl w-full mx-auto flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-6">
        <div className="flex flex-col gap-1.5 text-left">
          <span className="flex items-center gap-2">
            <BrandLogo size={26} />
            <span className="font-brand text-[1.1rem] font-semibold text-brand-green-dark tracking-tight">MemoFlow</span>
          </span>
          <p className="font-sans text-[0.75rem] text-slate-500">
            © 2024 MemoFlow. Clarté et excellence académique.
          </p>
        </div>
        
        <div className="flex gap-6 flex-wrap max-md:gap-4 max-md:w-full items-center">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="font-sans text-[0.75rem] text-slate-500 font-normal hover:text-brand-green-dark hover:underline bg-transparent border-none p-0 cursor-pointer"
          >
            Politique de confidentialité
          </button>
          <button
            type="button"
            onClick={onOpenTerms}
            className="font-sans text-[0.75rem] text-slate-500 font-normal hover:text-brand-green-dark hover:underline bg-transparent border-none p-0 cursor-pointer"
          >
            Conditions d'utilisation
          </button>
        </div>
      </div>
    </footer>
  );
}
