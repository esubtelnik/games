import { useRef } from "react";
import { api } from "@/lib/api-client";
import { GameType } from "@/types/entities";
import { ISudokuProgress, ITwentyFortyEightProgress } from "@/types/progress";

interface UseAutoSaveOptions {
  gameType: GameType;
  delay?: number;
}

export const useAutoSave = <T extends ITwentyFortyEightProgress | ISudokuProgress>(options: UseAutoSaveOptions) => {
  const { gameType, delay = 1000 } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const save = (payload: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      api.post("/api/user/progress", {
        gameType,
        gameData: payload,
      });
    }, delay);
  };

  return save;
};
