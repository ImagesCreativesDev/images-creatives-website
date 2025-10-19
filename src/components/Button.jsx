export default function Button({ children, href, onClick, variant = 'flame', className = '' }) {
  const baseClasses = variant === 'cool' ? 'btn-brand-cool' : 'btn-brand'
  const combinedClasses = `${baseClasses} ${className}`.trim()
  
  return href ? (
    <a href={href} className={combinedClasses}>{children}</a>
  ) : (
    <button onClick={onClick} className={combinedClasses}>{children}</button>
  )
}
