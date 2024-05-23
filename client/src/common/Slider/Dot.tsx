const CustomDot: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  index?: number;
}> = ({ onClick, index }) => (
  <button
    type='button'
    onClick={onClick}
  >
    {index! + 1}
  </button>
);

export default CustomDot;
