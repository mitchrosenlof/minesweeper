import React from "react";
import { Types } from "./typings";
import { BugAntIcon, FlagIcon } from "@heroicons/react/24/solid";
import { numberColors } from "./constants";

type Props = {
  cellData: Types.Cell;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
function Cell({ cellData, onClick }: Props) {
  return (
    <>
      <div
        className={`flex items-center justify-center h-10 w-10 bg-gray-600 ${
          numberColors[cellData.adjMines]
        }`}
        onClick={onClick}
      >
        {!cellData.hidden ? (
          <>
            {cellData.isMine ? (
              <BugAntIcon className="h-5 w-5 text-red-900" />
            ) : (
              <div>{cellData.adjMines}</div>
            )}
          </>
        ) : (
          <>{cellData.flag && <FlagIcon className="h-5 w-5 text-blue-500" />}</>
        )}
      </div>
    </>
  );
}

export default Cell;
