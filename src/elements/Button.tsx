import "./Button.css";

function Button({...buttonProps}) {
  return (
    <button
      className={`btn ${buttonProps.margin ? "btnMargin" : ""}`}
      {...buttonProps}
    >
      {buttonProps.text}
    </button>
  );
}

export default Button