import * as React from "react";

type SquareValue = "X" | "O" | null;

// Square Component
function Square({
  value,
  onSquareClick,
  isWinner,
}: {
  value: SquareValue;
  onSquareClick: () => void;
  isWinner: boolean;
}) {
  const colors = value === "X" ? "text-[#FFB800]" : "text-slate-100";

  return (
    <button
      className={`h-24 w-24 text-4xl font-black rounded-2xl transition-all duration-300 border-2
      ${isWinner ? "bg-[#FFB800]/20 border-[#FFB800] scale-95" : "bg-[#1e3a3a] border-[#2d5a5a] hover:border-[#FFB800]/50 hover:bg-[#244646] shadow-lg"} 
      ${colors}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Game() {
  const [squares, setSquares] = React.useState<SquareValue[]>(
    Array(9).fill(null),
  );
  const [xIsNext, setXIsNext] = React.useState<boolean>(true);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.player;
  const winningLine = winnerInfo?.line || [];
  const isDraw = !winner && squares.every((s) => s !== null);

  function handleClick(i: number) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="min-h-screen bg-[#0d1f1f] flex flex-col items-center justify-center p-6 font-sans">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
          TIC<span className="text-[#FFB800]">TAC</span>TOE
        </h1>
        <div className="h-1 w-20 bg-[#FFB800] mx-auto rounded-full"></div>
      </div>

      {/* Game Board */}
      <div className="relative group">
        <div className="grid grid-cols-3 gap-4 p-5 bg-[#142b2b] rounded-4xl border border-[#2d5a5a] shadow-2xl">
          {squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onSquareClick={() => handleClick(i)}
              isWinner={winningLine.includes(i)}
            />
          ))}
        </div>
      </div>

      {/* Footer Info & Controls */}
      <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-xs">
        <div
          className={`text-lg font-bold tracking-widest uppercase transition-all
          ${winner || isDraw ? "text-[#FFB800] scale-110" : "text-slate-400"}`}
        >
          {winner
            ? `Winner: ${winner}`
            : isDraw
              ? "Match Draw"
              : `Player ${xIsNext ? "X" : "O"}'s Turn`}
        </div>

        <button
          onClick={handleReset}
          className="group relative flex items-center justify-center w-full py-4 bg-[#FFB800] hover:bg-[#ffcc33] text-[#0d1f1f] font-black rounded-xl transition-all shadow-[0_4px_20px_rgba(255,184,0,0.3)] active:scale-95"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          RESET GAME
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares: SquareValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
