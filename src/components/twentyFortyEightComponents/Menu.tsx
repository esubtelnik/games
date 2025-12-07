import React from "react";
import Dropdown from "@/ui/Dropdown";
import { TwentyFortyEightGameMode } from "@/constants/gameModes";

interface MenuProps {
   resetGame: () => void;
   gridSize: number;
   setGridSize: (size: number) => void;
   undoMove: () => void;
}

const Menu = ({ resetGame, gridSize, setGridSize, undoMove }: MenuProps) => {
   

   return (
      <div className="w-full flex mt-3 justify-end space-x-4">
         <button
            onClick={undoMove}
            className="text-center px-2 py-1 outline-none rounded-md bg-[#BBADA0] text-white "
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="size-7"
            >
               <path
                  fillRule="evenodd"
                  d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
                  clipRule="evenodd"
               />
            </svg>
         </button>
         <Dropdown
            className="h-full bg-[#BBADA0] rounded-md text-white text-2xl font-bold"
            dropdownClassName={{
               backgroundColor: "bg-[#BBADA0] text-2xl font-bold",
               textColor: "text-white",
               borderColor: "border-[#BBADA0]",
               selectedBackgroundColor: "bg-beige/60",
               hoverBackgroundColor: "hover:bg-beige/30",
            }}
            options={TwentyFortyEightGameMode}
            direction={"up"}
            selectedOption={gridSize}
            selectOption={(option: number) => setGridSize(option)}
          
         />
         <button
            onClick={resetGame}
            className="px-5 py-1 outline-none rounded-md bg-[#BBADA0] text-white text-2xl font-bold"
         >
            New Game
         </button>
      </div>
   );
};
export default Menu;
