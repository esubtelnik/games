"use client";
import { FC, useState } from "react";
import { IGame } from "@/types/entities";
import { PlayCircleIcon, RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { colorVariants } from "@/constants/colorVariants";
import ConfirmModal from "./ConfirmModal";

interface IMenuItemProps {
   game: IGame;
   activeSave: boolean;
}

const MenuItem: FC<IMenuItemProps> = ({ game, activeSave }) => {
   const Icon = game.icon as React.ElementType;
   const [showModal, setShowModal] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const router = useRouter();

   const theme = colorVariants[game.color] || colorVariants.sky;

   const handleNavigation = (path: string) => {
      router.push(path);
   };

   const handleResetProgress = async () => {
      setIsDeleting(true);
      try {
         const response = await fetch('/api/user/progress/new', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameType: game.type }),
         });

         if (!response.ok) {
            throw new Error('Failed to delete progress');
         }

         setShowModal(false);
         handleNavigation(game.route);
         
         router.refresh();
      } catch (error) {
         console.error('Error deleting progress:', error);
         alert('Error deleting progress. Please try again.');
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <>
         <div
            key={game.id}
            className={`${theme.bg} ${theme.border} ${theme.borderHover} border-2 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl flex items-center gap-10`}
         >
            <div className="flex items-start justify-between">
               <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <Icon className={`w-12 h-12 ${theme.icon}`} />
               </div>
            </div>

            <div className="flex flex-col items-start flex-1">
               <h3 className={`text-3xl font-bold ${theme.text} mb-2`}>
                  {game.name}
               </h3>
               <p className="text-gray-600 text-sm mb-6">{game.description}</p>

               <div className="flex gap-4 w-full">
                  <button
                     disabled={!activeSave}
                     onClick={() => handleNavigation(`${game.route}`)}
                     className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all shadow-md
                     ${
                        activeSave
                           ? `${theme.buttonBg} ${theme.buttonHover} text-white`
                           : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                     }`}
                  >
                     <PlayCircleIcon className="w-5 h-5" />
                     Continue
                  </button>

                  <button
                     onClick={() => {
                        if (activeSave) {
                           setShowModal(true);
                        } else {
                           handleNavigation(`${game.route}`);
                        }
                     }}
                     className={`flex items-center gap-2 py-2 px-4 bg-white border-2 ${theme.outlineBorder} ${theme.outlineText} rounded-xl text-sm font-bold ${theme.outlineHover} transition-all active:scale-95`}
                  >
                     <RotateCcwIcon className="w-5 h-5" />
                     New Game
                  </button>
               </div>
            </div>
         </div>
         <ConfirmModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
               handleResetProgress();
            }}
            title="Reset Progress?"
            description="You have an active game session in"
            gameName={game.name}
            theme={theme}
            isDeleting={isDeleting}
         />
      </>
   );
};

export default MenuItem;
