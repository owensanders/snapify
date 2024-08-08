import { InputProps } from "../../interfaces/auth/InputProps";

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      />
    </>
  );
};

export default Input;
