function Button({ children, variant = "primary", onClick, type = "button" }) {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",

    secondary:
      "border border-slate-700 bg-slate-900/40 backdrop-blur-lg text-white hover:bg-slate-800/40",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-xl
        transition-all
        duration-300
        font-medium
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
