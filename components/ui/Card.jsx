/**
 * Reusable card wrapper.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {string}  [props.className]
 * @param {boolean} [props.hover] - Adds a hover shadow lift effect
 */
export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-md ${
        hover
          ? 'transition-shadow duration-300 hover:shadow-xl'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
