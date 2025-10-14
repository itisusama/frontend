const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles = "btn rounded-full"; // shared styles
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
