const variantStyles = {
  gold: 'bg-gold/10 text-gold border border-gold/20',
  navy: 'bg-navy/10 text-navy border border-navy/20',
  gray: 'bg-mid-gray text-charcoal border border-mid-gray',
};

/**
 * Simple badge / tag component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'gold'|'navy'|'gray'} [props.variant='gold']
 * @param {string} [props.className]
 */
export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        variantStyles[variant] || variantStyles.gold
      } ${className}`}
    >
      {children}
    </span>
  );
}
