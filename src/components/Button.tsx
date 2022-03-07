import { IButtonProps } from '../lib/interfaces';

const Button = ({ text }: IButtonProps) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center px-8 py-3 pb-3 mb-2 font-bold leading-tight text-white transition duration-150 ease-in-out bg-orange-500 rounded animate-bounce hover:bg-orange-600 focus:outline-none focus:ring-0 dark:bg-orange-700"
    >
      {text} &rarr;
    </button>
  );
};

export default Button;
