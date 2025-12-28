"use client";
import React, { useEffect, useState } from "react";
import { Games } from "@/constants/enums";
import { Brain, LogIn, LogOut } from "lucide-react";
import MenuItem from "@/components/MenuItem";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { IActiveSave } from "@/types/entities";
import { IStatsResponse } from "@/types/gameStats";

interface IMenuPageProps {
   isLoggedIn: boolean;
   activeSaves: IActiveSave;
}

const MenuPage = ({
   isLoggedIn,
   activeSaves,
}: IMenuPageProps) => {
   const [stats, setStats] = useState<IStatsResponse>({
      userGamesPlayed: 0,
      totalGamesPlayed: 0,
      totalUsers: 0,
   });
   const router = useRouter();

   console.log(activeSaves);

   const handleAuthAction = async () => {
      if (isLoggedIn) {
         const res = await api.post("/api/auth/logout", {});

         if (res.successful) {
            router.refresh();
         }
      } else {
         router.push("/auth");
      }
   };


   useEffect(() => {
      const fetchStats = async () => {
         const response = await api.get<IStatsResponse>("/api/stats");
         if (response.successful && response.data) {
            setStats(response.data);
         }
      };

      fetchStats();
   }, []);
   return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-8">
         <button
            onClick={handleAuthAction}
            className={`absolute top-8 right-8 px-6 py-3 font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
               isLoggedIn
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200"
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200"
            }`}
         >
            {isLoggedIn ? (
               <>
                  <LogOut className="w-5 h-5" />
                  Logout
               </>
            ) : (
               <>
                  <LogIn className="w-5 h-5" />
                  Login
               </>
            )}
         </button>
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
                  return (
                     <MenuItem
                        key={game.id}
                        game={game}
                        activeSave={activeSaves[game.type]}
                     />
                  );
               })}
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
               <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                     <div className="text-3xl font-bold text-orange-600 mb-1">
                        {isLoggedIn ? stats.userGamesPlayed : "—"}
                     </div>
                     <div className="text-sm text-gray-600">
                        {isLoggedIn ? "Your Games" : "Login to Track"}
                     </div>
                  </div>
                  <div>
                     <div className="text-3xl font-bold text-orange-600 mb-1">
                        {stats.totalGamesPlayed}
                     </div>
                     <div className="text-sm text-gray-600">Total Games</div>
                  </div>
                  <div>
                     <div className="text-3xl font-bold text-orange-600 mb-1">
                        {stats.totalUsers}
                     </div>
                     <div className="text-sm text-gray-600">Total Players</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MenuPage;
