"use client";
import React from "react";
import { Games } from "@/constants/enums";
import { Brain } from "lucide-react";
import MenuItem from "@/components/MenuItem";

const MenuPage = () => {
   return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-8">
         <div className="w-full max-w-5xl">
            <div className="text-center mb-12">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6 border-4 border-orange-200">
                  <Brain
                     className="w-10 h-10 text-orange-500"
                     strokeWidth={2}
                  />
               </div>
               <h1 className="text-6xl font-extrabold text-gray-800 mb-3">
                  Brain<span className="text-orange-500">Games</span>
               </h1>
               <p className="text-xl text-gray-600">
                  Train your mind with logic puzzles
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               {Games.map((game) => {
                  return <MenuItem key={game.id} game={game} />;
               })}
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
               <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                     <div className="text-3xl font-bold text-orange-600 mb-1">
                        1,234
                     </div>
                     <div className="text-sm text-gray-600">Games Played</div>
                  </div>
                  <div>
                     <div className="text-3xl font-bold text-orange-600 mb-1">
                        892
                     </div>
                     <div className="text-sm text-gray-600">Players Online</div>
                  </div>
                  <div>
                     <div className="text-3xl font-bold text-orange-600 mb-1">
                        4.8★
                     </div>
                     <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MenuPage;
