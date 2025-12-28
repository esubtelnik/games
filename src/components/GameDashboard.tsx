import React from "react";
import { cn, formatTime } from "@/utils/utils";

interface GameDashboardProps {
   bestScore: number;
   showBestScore?: boolean;
   bestTime: number;
   className?: string;
   textClassName?: string;
   valueClassName?: string;
}

const GameDashboard = ({
   bestScore,
   showBestScore = true,
   bestTime,
   className,
   textClassName,
   valueClassName,
}: GameDashboardProps) => {


   return (
      <div className="w-full flex justify-center absolute top-0 left-0 z-10 pointer-events-none">
         <div
            className={cn(
               "relative gap-5 h-16 rounded-b-[50px] shadow-md border-b-4 flex items-center justify-around px-6 pt-2 pb-4 pointer-events-auto",
               className
            )}
         >
            {showBestScore && (
               <div className="flex flex-col items-center w-20">
                  <span
                     className={cn(
                        "text-xs text-slate-400 uppercase font-bold tracking-wider",
                        textClassName
                     )}
                  >
                     Best Score
                  </span>
                  <span className={cn("text-2xl font-bold", valueClassName)}>
                     {bestScore}
                  </span>
               </div>
            )}

            <div className="flex flex-col items-center w-20">
               <span
                  className={cn(
                     "text-xs text-slate-400 uppercase font-bold tracking-wider",
                     textClassName
                  )}
               >
                  Best Time
               </span>
               <span className={cn("text-2xl font-bold", valueClassName)}>
                  {formatTime(bestTime)}
               </span>
            </div>
         </div>
      </div>
   );
};

export default GameDashboard;
