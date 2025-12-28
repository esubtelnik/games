
import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { GameType } from "@/types/entities";
import { IBestScore, IBestScoreRequest, IBestScoreResponse } from "@/types/bestScore";

interface UseBestScoreOptions {
   gameType: GameType;
   gameConfig?: string;
}

export const useBestScore = ({ gameType, gameConfig }: UseBestScoreOptions) => {
   const [bestScore, setBestScore] = useState<number | null>(null);
   const [bestTime, setBestTime] = useState<number | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetchBestScore();
   }, [gameType, gameConfig]);

   const fetchBestScore = async () => {
      try {
         setIsLoading(true);
         const params = new URLSearchParams({ gameType });
         if (gameConfig) params.append("gameConfig", gameConfig);

         const result = await api.get<[IBestScore]>(
            `/api/user/best-score?${params.toString()}`
         );
         console.log(result);

         if (result.successful && result.data && result.data.length > 0 && result.data[0]) {
            const record = result.data[0];
            setBestScore(record.score ?? 0);
            setBestTime(record.time ?? 0);
         } else {
            setBestScore(0);
            setBestTime(0);
         }
      } catch (error) {
         console.error("Failed to fetch best score:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const updateBestScore = async (score: number | undefined, time: number) => {
      try {
         const payload: IBestScoreRequest = {
            gameType,
            gameConfig,
            score,
            time,
         };

         const result = await api.post<IBestScoreResponse, IBestScoreRequest>(
            "/api/user/best-score",
            payload
         );

         if (result.successful && result.data) {
            setBestScore(result.data.bestScore.score || null);
            setBestTime(result.data.bestScore.time);
            return result.data.isNewRecord;
         }

         return false;
      } catch (error) {
         console.error("Failed to update best score:", error);
         return false;
      }
   };

   return {
      bestScore,
      bestTime,
      isLoading,
      updateBestScore,
      refetch: fetchBestScore,
   };
};