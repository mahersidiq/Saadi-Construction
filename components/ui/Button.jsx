import Link from 'next/link';
import Spinner from './Spinner';

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
};

/**
 * Reusable button / link component.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary']
 * @param {string}  [props.href]      - If provided, renders as next/link
 * @param {Function} [props.onClick]
 * @param {string}  [props.className]
 * @param {string}  [props.type]      - Button type attribute
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.loading]   - Shows spinner and disables interaction
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    variantClasses[variant] || variantClasses.primary
  } ${className}`;

  const content = (
    <>
      {loading && <Spinner size="sm" />}
      {children}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
