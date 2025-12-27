import React from "react";
import { PauseIcon } from "lucide-react";
import { PlayIcon } from "lucide-react";
import { cn } from "@/utils/utils";

interface TimerProps {
   time: string;
   isPaused: boolean;
   togglePause: () => void;
   className?: string;
   textClassName?: string;
   iconClassName?: string;
   showTime?: boolean;
}

const Timer = ({ time, isPaused, togglePause, className, textClassName, iconClassName, showTime = true }: TimerProps) => {
   return (
      <div
         className={cn(
            "flex items-center justify-between px-4 py-2 outline-none text-sm font-medium w-fit",
            className
         )} 
      >
         <span className={cn(textClassName)}>{showTime ? "Time: " : ""}{time}</span>
         <button onClick={togglePause}>
            {isPaused ? (
               <PlayIcon className={cn("size-5", iconClassName)} />
            ) : (
               <PauseIcon className={cn("size-5", iconClassName)} />
            )}
         </button>
      </div>
   );
};

export default Timer;
