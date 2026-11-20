import BrandLogo from './BrandLogo';

interface LoadingIndicatorProps {
  label: string;
  fullScreen?: boolean;
  showLogo?: boolean;
}

export default function LoadingIndicator({
  label,
  fullScreen = false,
  showLogo = false,
}: LoadingIndicatorProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? 'min-h-screen bg-[#F8FAFB]' : 'min-h-[12rem]'
      }`}
      role="status"
      aria-live="polite"
    >
      {showLogo && <BrandLogo size={72} className="animate-pulse-slow" />}
      <span className={`font-brand ${showLogo ? 'text-xl text-[#2F4858]' : 'text-sm text-slate-500'}`}>
        {label}
      </span>
      <div className="mf-loading-bar" aria-hidden="true">
        <div className="mf-loading-bar__indicator" />
      </div>
    </div>
  );
}
