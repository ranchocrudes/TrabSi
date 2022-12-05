type props = {
  children: any;
  className: string;
  onClick: () => void;
};
const Button = ({ children, className, onClick }: props) => {
  return (
    <button
      className={`p-2 rounded-md hover:ring-2 hover:ring-gray-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
