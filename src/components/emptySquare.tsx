interface EmptySquareProps {
  key: number;
}

function EmptySquare({ key }: EmptySquareProps) {
  return <div key={key} className="border h-32 w-32 border-primary"></div>;
}

export default EmptySquare;
