interface buttonProps {
  text: string;
  handleSubmit: () => void;
}

const Button = (props: buttonProps) => {
  const text = props.text;
  const handleSubmit = props.handleSubmit;

  return (
    <div
      onClick={() => handleSubmit()}
      className="oerflow-hidden group relative inline-block h-12 w-full space-x-4 rounded bg-green-400 py-2 text-gray-700 hover:cursor-pointer"
    >
      <span className="absolute left-0 top-0 mr-0 flex h-full w-0 translate-y-0 transform rounded bg-green-500 opacity-90 transition-all duration-200 ease-out group-hover:w-full"></span>
      <span className="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center space-x-4 group-hover:text-black">
        <p>{text}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </span>
    </div>
  );
};

export default Button;
