"use client";
import { FC } from "react";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";

interface IConfirmModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   description: string;
   gameName: string;
   theme: {
      bg: string;
      icon: string;
      buttonBg: string;
      buttonHover: string;
   };
   isDeleting: boolean;
}

const ConfirmModal: FC<IConfirmModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   title,
   description,
   gameName,
   theme,
   isDeleting,
}) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
         <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className={`p-6 ${theme.bg} flex justify-center`}>
               <div className="p-4 bg-white rounded-full shadow-sm">
                  {isDeleting ? (
                     <Loader2Icon className={`w-8 h-8 animate-spin ${theme.icon}`} />
                  ) : (
                     <AlertTriangleIcon className={`w-8 h-8 ${theme.icon}`} />
                  )}
               </div>
            </div>

            <div className="p-8 text-center">
               <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {title}
               </h2>
               <p className="text-gray-600 mb-8">
                  {description} <strong>{gameName}</strong>.
               </p>

               <div className="flex flex-col sm:flex-row gap-3">
                  <button
                     onClick={onClose}
                     className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={onConfirm}
                     className={`flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg ${theme.buttonBg} ${theme.buttonHover} transition-all active:scale-95`}
                  >
                     Yes, Start New
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmModal;
