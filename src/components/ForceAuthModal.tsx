"use client";
import { FC } from "react";
import { Lock, UserPlus, LogIn } from "lucide-react";

interface IForceAuthModalProps {
   isOpen: boolean;
   gameName: string;
   onClose?: () => void;
   onConfirm: () => void;
}

const ForceAuthModal: FC<IForceAuthModalProps> = ({ isOpen, gameName, onClose, onConfirm }) => {
   if (!isOpen) return null;

   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         onClose?.();
      }
   };

   return (
      <div
         onClick={handleBackdropClick}
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      >
         <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-center">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Lock className="w-10 h-10 text-white" />
               </div>
               <h2 className="text-3xl font-bold text-white mb-2">
                  Sign In Required
               </h2>
               <p className="text-white/90">
                  To play <strong>{gameName}</strong>, you need an account
               </p>
            </div>

            <div className="p-8">
               <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                     <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">1</span>
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                           Save Your Progress
                        </h4>
                        <p className="text-sm text-gray-600">
                           Never lose your game saves
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                     <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2</span>
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                           Track Statistics
                        </h4>
                        <p className="text-sm text-gray-600">
                           See your wins, losses, and improvements
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                     <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">3</span>
                     </div>
                     <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                           Compete Globally
                        </h4>
                        <p className="text-sm text-gray-600">
                           Join leaderboards and challenge others
                        </p>
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <button
                     onClick={onConfirm}
                     className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                     <UserPlus className="w-5 h-5" />
                     Create Account
                  </button>

                  <button
                     onClick={onConfirm}
                     className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                     <LogIn className="w-5 h-5" />
                     Already Have Account
                  </button>

                  <button
                     onClick={onClose}
                     className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
                  >
                     Back to Menu
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ForceAuthModal;