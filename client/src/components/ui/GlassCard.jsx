function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        bg-slate-900/50
        backdrop-blur-xl
        border
        border-slate-800
        rounded-3xl
        shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default GlassCard;
