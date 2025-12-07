import React from "react";
import { FifteenGameMode } from "@/constants/gameModes";
import Dropdown from "@/ui/Dropdown";

interface FifteenMenuProps {
   rows: number;
   cols: number;
   handleSizeChange: (newRows: number, newCols: number) => void;
   gameMode: number;
   setGameMode: (mode: number) => void;
   elapsedTime: number;
   formatTime: (time: number) => string;
   togglePause: () => void;
}

const FifteenMenu = ({
   rows,
   cols,
   handleSizeChange,
   gameMode,
   setGameMode,
   elapsedTime,
   formatTime,
   togglePause,
}: FifteenMenuProps) => {
   const incrementRows = () => {
      if (rows < 10) handleSizeChange(rows + 1, cols);
   };

   const decrementRows = () => {
      if (rows > 2) handleSizeChange(rows - 1, cols);
   };

   const incrementCols = () => {
      if (cols < 10) handleSizeChange(rows, cols + 1);
   };

   const decrementCols = () => {
      if (cols > 2) handleSizeChange(rows, cols - 1);
   };

   return (
      <div className="grid grid-cols-2 gap-4">
         <div className="col-span-1 flex flex-col items-start space-y-2">
            <div className="flex items-center w-11/12 justify-between bg-violet-200 p-1 rounded">
               <span className="font-bold text-sm">Rows:</span>
               <div>
                  <button
                     onClick={decrementRows}
                     className="px-2 py-2 text-sm bg-violet-400 rounded hover:bg-violet-500"
                  >
                     -
                  </button>
                  <span className="px-3">{rows}</span>
                  <button
                     onClick={incrementRows}
                     className="px-2 py-2 text-sm bg-violet-400 rounded hover:bg-violet-500"
                  >
                     +
                  </button>
               </div>
            </div>
            <div className="flex items-center w-11/12 justify-between bg-violet-200 p-1 rounded">
               <span className="font-bold text-sm">Cols:</span>
               <div>
                  <button
                     onClick={decrementCols}
                     className="px-2 py-2  text-sm bg-violet-400 rounded hover:bg-violet-500"
                  >
                     -
                  </button>
                  <span className="px-3">{cols}</span>
                  <button
                     onClick={incrementCols}
                     className="px-2 py-2 text-sm bg-violet-400 rounded hover:bg-violet-500"
                  >
                     +
                  </button>
               </div>
            </div>
         </div>
         <div className="flex flex-col items-start space-y-2">
            <div className="bg-violet-200 p-1 rounded relative">
               <Dropdown
                  className="bg-violet-600 text-white rounded hover:bg-violet-700 outline-none text-sm font-medium w-36"
                  dropdownClassName={{
                     backgroundColor: "bg-violet-600 w-full",
                     textColor: "text-white",
                     borderColor: "border-violet-200",
                     selectedBackgroundColor: "bg-violet-700",
                     hoverBackgroundColor: "hover:bg-violet-700/80",
                  }}
                  options={FifteenGameMode}
                  direction={"down"}
                  selectedOption={gameMode}
                  selectOption={(option: string | number) =>
                     setGameMode(option as number)
                  }
               />
            </div>
            <div className="bg-violet-200 p-1 rounded">
               <div className="flex items-center justify-between px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 outline-none text-sm font-medium w-36">
                  Time: {formatTime(elapsedTime)}
                  <button onClick={togglePause}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#ffffff"
                        className="size-5 ml-2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FifteenMenu;
