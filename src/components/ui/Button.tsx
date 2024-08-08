import { ButtonProps } from "../../interfaces/props/ButtonProps";

const Button = ({ children, classes }: ButtonProps) => {
  return (
    <button
      className={`w-full md:w-auto mb-2 rounded bg-blue-600 hover:bg-blue-800 px-4 py-2 md:mr-3 text-white ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
