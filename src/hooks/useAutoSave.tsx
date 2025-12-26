import { useRef } from "react";
import { api } from "@/lib/api-client";
import { GameType } from "@/types/entities";
import { ITwentyFortyEight } from "@/types/progress";

export const useAutoSave = () => {
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const save = (payload: ITwentyFortyEight) => {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
         api.post("/api/user/progress", {
            gameData: payload,
            gameType: GameType.TWENTY48,
         });
      }, 1000);
   };

   return save;
};
