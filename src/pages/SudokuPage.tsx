"use client";
import React, { useEffect, useState } from "react";
import SudokuGrid from "@/components/sudokuComponents/SudokuGrid";
import {
   generatePuzzle,
   generateSolvedSudoku,
} from "@/utils/sudokuUtils/SudokuGenerator";
import { cloneDeep } from "lodash";
import SudokuMenu from "@/components/sudokuComponents/SudokuMenu";
import BackgroundWrapper from "@/components/sudokuComponents/BackgroundWrapper";
import { sudokuGameMode } from "@/constants/gameModes";
import Modal from "@/components/sudokuComponents/Modal";
import HomeButton from "@/components/HomeButton";
import { SudokuGridType } from "@/types/sudoku";
import { validateGrid } from "@/utils/sudokuUtils/Validation";
import { ISudokuProgress } from "@/types/progress";
import { useAutoSave } from "@/hooks/useAutoSave";
import { GameType } from "@/types/entities";
import { api } from "@/lib/api-client";

interface Props {
   initialData: ISudokuProgress | null;
}

const SudokuPage = ({ initialData }: Props) => {
   console.log(initialData);
   const [grid, setGrid] = useState<SudokuGridType>(initialData?.grid || [[]]);
   const [userGrid, setUserGrid] = useState<SudokuGridType>(
      initialData?.userGrid || [[]]
   );
   const [initialEditableCells, setInitialEditableCells] = useState<
      boolean[][]
   >(initialData?.initialEditableCells || [[]]);
   const [gameMode, setGameMode] = useState(initialData?.gameMode || 20);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalText, setModalText] = useState("");
   const [modalState, setModalState] = useState("");

   const isInitialMount = React.useRef(true);

   const findHintsAmountByValue = (value: number) => {
      const mode = sudokuGameMode.find((mode) => mode.value === value);
      return mode ? mode.hintsAmount : null;
   };

   const [hintsAmount, setHintsAmount] = useState<number>(
      initialData?.hintsAmount || findHintsAmountByValue(gameMode) || 0
   );

   const autoSave = useAutoSave<ISudokuProgress>({
      gameType: GameType.SUDOKU,
      delay: 0,
   });

   const initialize = () => {
      const solvedGrid = generateSolvedSudoku();
      setGrid(cloneDeep(solvedGrid || []));
      const puzzleGrid = generatePuzzle(solvedGrid, gameMode);
      setUserGrid(cloneDeep(puzzleGrid));
      const editableCells = puzzleGrid.map((row: number[]) =>
         row.map((cell: number) => cell === 0)
      );
      setInitialEditableCells(editableCells);
      // setHintsAmount(findHintsAmountByValue(gameMode));
   };

   useEffect(() => {
      if (isInitialMount.current) {
         isInitialMount.current = false;
         
         if (!userGrid || userGrid.length <= 1) {
            initialize();
         }
         return;
      }
   
      initialize();
   
   }, [gameMode]);

   useEffect(() => {
      const handler = () => {
         const payload = {
            grid: grid,
            userGrid: userGrid,
            initialEditableCells: initialEditableCells,
            gameMode: gameMode,
            hintsAmount: hintsAmount,
         };

         navigator.sendBeacon(
            "/api/user/progress",
            JSON.stringify({
               gameData: payload,
               gameType: GameType.SUDOKU,
            })
         );
      };

      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
   }, [grid, userGrid, initialEditableCells, gameMode, hintsAmount]);

   useEffect(() => {
      if (!grid.length || !userGrid.length) return;

      autoSave({
         grid,
         userGrid,
         initialEditableCells,
         gameMode,
         hintsAmount,
      });
   }, [grid, userGrid, initialEditableCells, gameMode, hintsAmount]);

   const handleReset = () => {
      initialize();
   };

   const handleCellChange = (row: number, col: number, value: number) => {
      const updatedGrid = cloneDeep(userGrid);
      updatedGrid[row][col] = value ? value : 0;
      setUserGrid(updatedGrid);
   };

   // const validateSolution = () => {
   //    for (let row = 0; row < 9; row++) {
   //       for (let col = 0; col < 9; col++) {
   //          if (
   //             parseInt(userGrid[row][col], 10) !== parseInt(grid[row][col], 10)
   //          ) {
   //             return false;
   //          }
   //       }
   //    }
   //    return true;
   // };

   const isBoardComplete = () => {
      if (
         !userGrid ||
         userGrid.length !== 9 ||
         userGrid.some((row: number[]) => row.length !== 9)
      ) {
         return false;
      }

      for (let row = 0; row < 9; row++) {
         for (let col = 0; col < 9; col++) {
            if (userGrid[row][col] === 0) return false;
         }
      }
      return true;
   };

   const handleShowSolution = () => {
      if (userGrid.length === 0 || grid.length === 0) return;

      setUserGrid(cloneDeep(grid));
      setInitialEditableCells(
         Array.from({ length: 9 }, () => Array<boolean>(9).fill(false))
      );
   };

   const handleHint = () => {
      if (hintsAmount <= 0) return;

      const updatedGrid = cloneDeep(userGrid);
      const updatedEditableCells = cloneDeep(initialEditableCells);
      let hintApplied = false;

      for (let row = 0; row < 9; row++) {
         for (let col = 0; col < 9; col++) {
            if (updatedEditableCells[row][col]) {
               const userValue = updatedGrid[row][col];
               const correctValue = grid[row][col];
               if (userValue !== correctValue) {
                  updatedGrid[row][col] = correctValue;
                  updatedEditableCells[row][col] = false;
                  hintApplied = true;
                  break;
               }
            }
         }
         if (hintApplied) break;
      }

      if (hintApplied) {
         setUserGrid(updatedGrid);
         setInitialEditableCells(updatedEditableCells);
         setHintsAmount((hintsAmount && hintsAmount - 1) || 0);
      }
   };

   const handleCheckSolution = () => {
      if (userGrid.length === 0 || grid.length === 0) return;

      if (isBoardComplete()) {
         const isCorrect = validateGrid(userGrid);
         if (isCorrect) {
            setModalText("The solution is correct. Victoty!");
            setModalState("win");
            setIsModalOpen(true);
         } else {
            setModalText("The solution is wrong, try again");
            setModalState("loss");

            setIsModalOpen(true);
         }
      } else {
         setModalText("Fill in all boxes before checking!");
         setModalState("fill");

         setIsModalOpen(true);
      }
   };
   return (
      <BackgroundWrapper>
         <div className="flex justify-center items-center h-screen flex-col z-10">
            <div className="grid grid-cols-[1fr_auto_1fr]">
               <div className="col-span-1"></div>
               <div className="col-span-1 flex flex-col items-center justify-center">
                  <SudokuGrid
                     grid={userGrid}
                     onCellChange={handleCellChange}
                     initialEditableCells={initialEditableCells}
                  />
                  <SudokuMenu
                     gameMode={gameMode}
                     setGameMode={setGameMode}
                     checkSolution={handleCheckSolution}
                     showSolution={handleShowSolution}
                     hintsAmount={hintsAmount || 0}
                     handleHint={handleHint}
                     restart={handleReset}
                  />
               </div>
               <div className="col-span-1"></div>
            </div>
         </div>
         <HomeButton bg="bg-dark-blue" />

         {isModalOpen && (
            <Modal
               text={modalText}
               onClose={() => setIsModalOpen(false)}
               state={modalState}
               restart={handleReset}
            />
         )}
      </BackgroundWrapper>
      // </BackgroundWrapper>
   );
};

export default SudokuPage;
