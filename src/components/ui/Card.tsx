import { CardProps } from "../../interfaces/props/CardProps";

const Card: React.FC<CardProps> = ({ count, title, className }) => {
  return (
    <div
      className={`border w-1/3 rounded-md p-4 shadow-md bg-blue-400 ${
        className || ""
      }`}
    >
      <h1 className="text-4xl font-bold mb-7 text-white">{count}</h1>
      <h1 className="text-lg font-bold text-white">{title}</h1>
    </div>
  );
};

export default Card;
