"use client";
import { FC } from "react";

import { IGame } from "@/types/entities";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface IMenuItemProps {
   game: IGame;
}
const MenuItem: FC<IMenuItemProps> = ({ game }) => {
   const Icon = game.icon as React.ElementType;
   const router = useRouter();
   return (
      <button
         key={game.id}
         onClick={() => router.push(game.route)}
         className={`${game.color} border-2 rounded-3xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left group flex items-center gap-10`}
      >
         <div className="flex items-start justify-between mb-4">
            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
               <Icon className="w-12 h-12 text-gray-700" />
            </div>
            {/* <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full text-gray-600 shadow-sm">
                    {game.difficulty}
                  </span> */}
         </div>
         <div className="flex flex-col items-start justify-between">
            <h3 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
               {game.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{game.description}</p>

            <div className="flex items-center text-orange-600 font-semibold text-sm">
               <span>Play Now</span>

               <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 stroke-3 transition-transform duration-300" />
            </div>
         </div>
      </button>
   );
};

export default MenuItem;
