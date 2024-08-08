import { InputProps } from "../../interfaces/props/InputProps";

const Input = ({ label, id, classes, showRequired, ...props }: InputProps) => {
  return (
    <div className={classes}>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} {showRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      />
    </div>
  );
};

export default Input;
