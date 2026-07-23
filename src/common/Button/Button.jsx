import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Button Component
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'icon'
 * @param {string} size    - 'sm' | '' | 'lg'
 * @param {string} to      - react-router link path (renders <Link>)
 * @param {string} href    - external link (renders <a>)
 * @param {boolean} arrow  - show trailing arrow icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = '',
  to,
  href,
  arrow = false,
  className = '',
  loading = false,
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    loading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {children}
      {arrow && <span className="btn-arrow">→</span>}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} {...props}>{content}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;
  }

  return (
    <button className={classes} disabled={loading} {...props}>
      {content}
    </button>
  );
}
