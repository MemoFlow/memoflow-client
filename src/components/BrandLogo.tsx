import logoDark from '../assets/logo-dark-192.webp';
import logoLight from '../assets/logo-light-128.webp';

interface BrandLogoProps {
  /** Displayed size in px */
  size?: number;
  className?: string;
  variant?: 'dark' | 'light';
}

/**
 * MemoFlow logo. The dark version (default) provides strong contrast and high visibility
 * on white and light backgrounds.
 */
export default function BrandLogo({ size = 36, className = '', variant = 'dark' }: BrandLogoProps) {
  const src = variant === 'light' ? logoLight : logoDark;

  return (
    <img
      src={src}
      alt="MemoFlow Logo"
      width={size}
      height={size}
      draggable={false}
      className={`flex-shrink-0 rounded-[22%] select-none shadow-xs ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
