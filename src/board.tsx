import React, { useEffect, useState } from "react";
import { Types } from "./typings";
import { getCol, getRow } from "./util";
import Cell from "./Cell";

type Props = {
  nCols: number;
  nRows: number;
  nMines: number;
};
function Board({ nCols, nRows, nMines }: Props) {
  const [board, setBoard] = useState<Types.Cell[]>(
    Array(nRows * nCols)
      .fill(0)
      .map((_) => ({
        adjMines: 0,
        hidden: true,
        isMine: false,
        flag: false,
      }))
  );
  const [gameover, setGameover] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setBoard((prev) => {
      const newBoard = prev.map((cell) => ({ ...cell })); // Proper copy
      const dirs = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];
      let mines = nMines;
      while (mines > 0) {
        const loc = Math.floor(Math.random() * nRows * nCols);
        if (!newBoard[loc].isMine) {
          newBoard[loc].isMine = true;
          mines--;
          // increment neighbor mine count
          for (const dir of dirs) {
            if (
              (dir[0] === -1 && loc % nCols === 0) ||
              (dir[0] === 1 && (loc + 1) % nCols === 0) ||
              (dir[1] === -1 && loc < nCols) ||
              (dir[1] === 1 && loc > nRows * nCols - nCols)
            ) {
              continue;
            }
            newBoard[loc + dir[0] + nCols * dir[1]].adjMines++;
          }
        }
      }
      return newBoard;
    });
  }, []);

  useEffect(() => {
    if (board.every((cell) => !cell.hidden || cell.isMine)) {
      setGameWon(true);
      setGameover(true);
    }
  }, [board]);

  const dfs = (index: number, visited: boolean[], board: Types.Cell[]) => {
    if (visited[index] || board[index].adjMines > 0) {
      board[index].hidden = false;
      return;
    }

    visited[index] = true;
    board[index].hidden = false;
    const dirs = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];
    for (const dir of dirs) {
      if (
        (dir[0] === -1 && index % nCols === 0) ||
        (dir[0] === 1 && (index + 1) % nCols === 0) ||
        (dir[1] === -1 && index < nCols) ||
        (dir[1] === 1 && index > nRows * nCols - nCols - 1)
      ) {
        continue;
      }
      dfs(index + dir[0] + nCols * dir[1], visited, board);
    }
  };

  const onClickCell = (index: number, isCtrlClick: boolean = false) => {
    if (isCtrlClick && board[index].hidden) {
      setBoard((prev) => {
        const newBoard = prev.map((cell) => ({ ...cell }));
        newBoard[index].flag = true;
        return newBoard;
      });
      return;
    }
    if (board[index].isMine) {
      setBoard((prev) => {
        const newBoard = prev.map((cell) => ({ ...cell }));
        for (let i = 0; i < nRows * nCols; i++) {
          if (newBoard[i].isMine) {
            newBoard[i].hidden = false;
          }
        }
        return newBoard;
      });
      setGameover(true);
    } else {
      const visited = Array(nRows * nCols).fill(false);
      const newBoard = board.map((cell) => ({ ...cell }));
      dfs(index, visited, newBoard);
      setBoard(newBoard);
    }
  };

  return (
    <>
      {gameover && (
        <>
          {gameWon ? (
            <span className="text-xl text-green-500">Victory!</span>
          ) : (
            <span className="text-xl text-red-500">Kaboom!</span>
          )}
        </>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${nCols}, 1fr)`,
          gap: "5px",
          padding: "10px",
        }}
      >
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            cellData={{ ...cell }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              onClickCell(idx, e.ctrlKey)
            }
          />
        ))}
      </div>
    </>
  );
}

export default Board;
