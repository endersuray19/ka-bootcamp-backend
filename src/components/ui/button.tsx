type ButtonProps = {
  icon?: React.ReactNode;
  style?: string;
  text?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({
  icon,
  style,
  text,
  onClick,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || false}
      type={type || "button"}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-3 py-1 ${style} transition-opacity duration-200`}
    >
      {icon}
      {text}
    </button>
  );
};
