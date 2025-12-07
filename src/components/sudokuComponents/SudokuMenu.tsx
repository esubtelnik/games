import React, { FC } from "react";
import Dropdown from "@/ui/Dropdown";
import { sudokuGameMode } from "@/constants/gameModes";

interface ISudokuMenuProps {
   gameMode: number;
   setGameMode: (mode: number) => void;
   checkSolution: () => void;
   showSolution: () => void;
   hintsAmount: number;
   handleHint: () => void;
   restart: () => void;
}

const SudokuMenu: FC<ISudokuMenuProps> = ({
   gameMode,
   setGameMode,
   checkSolution,
   showSolution,
   hintsAmount,
   handleHint,
   restart,
}: ISudokuMenuProps) => {
 

   

   return (
      <div className="flex space-x-3 justify-center w-full mt-4">
         <Dropdown
            className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-turquoise outline-none text-md font-medium"
            dropdownClassName={{
               backgroundColor: 'bg-dark-blue',
               textColor: 'text-white',
               borderColor: 'border-dark-blue',
               hoverBackgroundColor: 'hover:bg-turquoise/50',
            }}
            options={sudokuGameMode.map((mode) => ({
               value: mode.value,
               label: mode.label,
            }))}
            direction={"up"}
            selectedOption={gameMode}
            selectOption={(option: string | number) => setGameMode(option as number)}
         />
         <button
            onClick={checkSolution}
            className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-turquoise outline-none text-md font-medium"
         >
            Check Solution
         </button>
         <button
            onClick={showSolution}
            className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-turquoise outline-none text-md font-medium"
         >
            Show Solution
         </button>
         <button
            onClick={handleHint}
            className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-turquoise outline-none relative flex items-center justify-center"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="size-8"
            >
               <path d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 .572.729 6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483 9.066 9.066 0 0 0 2.726 0 .75.75 0 0 0-.226-1.483 7.553 7.553 0 0 1-2.274 0Z" />
            </svg>
            <span className="absolute text-red-400 text-sm font-bold top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               {hintsAmount < 0 ? "" : hintsAmount}
            </span>
         </button>
         <button
            onClick={restart}
            className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-turquoise outline-none relative flex items-center justify-center"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="size-6"
            >
               <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                  clipRule="evenodd"
               />
            </svg>
         </button>
      </div>
   );
};

export default SudokuMenu;
