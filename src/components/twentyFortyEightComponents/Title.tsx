import React from "react";
import Timer from "../Timer";

interface TitleProps {
   score: number;
   time: string;
   isPaused: boolean;
   togglePause: () => void;
}

const Title = ({ score, time, isPaused, togglePause }: TitleProps) => {
   return (
      <div className="flex flex-col w-full items-start">
         <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
               <h1 className="text-beige text-[70px] font-bold">2048</h1>
               <div className="text-beige text-xl font-bold">
                  Play 2048 Game{" "}
               </div>
            </div>

            <div className="flex flex-col items-center px-5 py-1 h-16 rounded-xl bg-[#BBADA0]">
               <span className="text-[#EEE4DA] text-base font-bold">SCORE</span>
               <span className="text-white text-2xl font-bold">{score}</span>
            </div>
            <Timer
               time={time}
               isPaused={isPaused}
               togglePause={togglePause}
               className="bg-[#BBADA0] flex flex-col items-center px-5 py-1.5 h-16 rounded-xl outline-none text-md font-medium w-22"
               textClassName="text-white font-bold"
               showTime={false}  
               iconClassName="fill-[#EEE4DA] text-[#EEE4DA]"
            />
         </div>
         <div className="text-beige text-base">
            Join the numbers and get to the{" "}
            <span className="font-bold">2048</span>
         </div>
      </div>
   );
};

export default Title;
