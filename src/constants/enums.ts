import { Brain } from "lucide-react";
import SudokuIcon from "@/assets/SudokuIcon.svg";
import Twenty48Icon from "@/assets/Twenty48Icon.svg";
import FifteenPuzzleIcon from "@/assets/FifteenPuzzleIcon.svg";
import { Routes } from "./routes";

export const Games = [
   {
      id: 1,
      name: "2048",
      icon: Twenty48Icon,
      route: Routes.GAMES.TWENTY48,
      description: "Combine tiles to reach 2048",
      color: "bg-amber-100 border-amber-300 hover:border-amber-400",
   },
   {
      id: 2,
      name: "Sudoku",
      icon: SudokuIcon,
      route: Routes.GAMES.SUDOKU,
      description: "Fill the grid with numbers",
      color: "bg-emerald-100 border-emerald-300 hover:border-emerald-400",
   },
   {
      id: 3,
      name: "15 Puzzle",
      icon: FifteenPuzzleIcon,
      route: Routes.GAMES.FIFTEEN_PUZZLE,
      description: "Slide tiles to solve the puzzle",
      color: "bg-sky-100 border-sky-300 hover:border-sky-400",
   },
   {
      id: 4,
      name: "Memory Game",
      icon: Brain,
      description: "Match pairs of cards",
      route: Routes.GAMES.MEMORY_GAME,
      color: "bg-purple-100 border-purple-300 hover:border-purple-400",
   },
];

export const ARROW_KEYS = {
   UP: 38,
   DOWN: 40,
   LEFT: 37,
   RIGHT: 39,
};

