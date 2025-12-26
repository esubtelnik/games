import { Brain } from "lucide-react";
import SudokuIcon from "@/assets/SudokuIcon.svg";
import Twenty48Icon from "@/assets/Twenty48Icon.svg";
import FifteenPuzzleIcon from "@/assets/FifteenPuzzleIcon.svg";
import { Routes } from "./routes";
import { GameType } from "@/types/entities";

export const Games = [
   {
      id: 1,
      type: GameType.TWENTY48,
      name: "2048",
      icon: Twenty48Icon,
      route: Routes.GAMES.TWENTY48,
      description: "Combine tiles to reach 2048",
      color: "amber",
   },
   {
      id: 2,
      type: GameType.SUDOKU,
      name: "Sudoku",
      icon: SudokuIcon,
      route: Routes.GAMES.SUDOKU,
      description: "Fill the grid with numbers",
      color: "emerald",
   },
   {
      id: 3,
      type: GameType.FIFTEEN_PUZZLE,
      name: "15 Puzzle",
      icon: FifteenPuzzleIcon,
      route: Routes.GAMES.FIFTEEN_PUZZLE,
      description: "Slide tiles to solve the puzzle",
      color: "sky",
   },
   {
      id: 4,
      type: GameType.MEMORY_GAME,
      name: "Memory Game",
      icon: Brain,
      description: "Match pairs of cards",
      route: Routes.GAMES.MEMORY_GAME,
      color: "purple",
   },
   {
      id: 5,
      type: GameType.MEMORY_GAME,
      name: "Memory Game",
      icon: Brain,
      description: "Match pairs of cards",
      route: Routes.GAMES.MEMORY_GAME,
      color: "pink",
   },
];

export const ARROW_KEYS = {
   UP: 38,
   DOWN: 40,
   LEFT: 37,
   RIGHT: 39,
};

