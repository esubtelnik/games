import { useRef } from "react";
import { api } from "@/lib/api-client";
import { GameType } from "@/types/entities";
import {
   ISudokuProgress,
   ITwentyFortyEightProgress,
   IFifteenPuzzleProgress,
   IMinesweeperProgress,
   IMemoryGameProgress,
} from "@/types/progress";
import { encryptData } from "@/lib/client-encription";

interface UseAutoSaveOptions {
   gameType: GameType;
   delay?: number;
}

export const useAutoSave = <
   T extends
      | ITwentyFortyEightProgress
      | ISudokuProgress
      | IFifteenPuzzleProgress
      | IMinesweeperProgress
      | IMemoryGameProgress
>(  
   options: UseAutoSaveOptions
) => {
   const { gameType, delay = 1000 } = options;
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const save = (payload: T) => {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
         const encryptedPayload = await encryptData(payload);
         api.post("/api/user/progress", {
            gameType,
            encryptedData: encryptedPayload,
         });
      }, delay);
   };

   return save;
};
