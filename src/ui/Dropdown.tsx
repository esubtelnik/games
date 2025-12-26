"use client";
import { FC, useRef, useState } from "react";
import clsx from "clsx";

interface IDropdownProps {
   className?: string;
   dropdownClassName?: {
      backgroundColor?: string;
      textColor?: string;
      borderColor?: string;
      selectedBackgroundColor?: string;
      hoverBackgroundColor?: string;
   };
   options: { value: number | string; label: string }[];
   direction?: "up" | "down";
   selectedOption: number | string;
   selectOption: (option: number | string) => void;
}

const Dropdown: FC<IDropdownProps> = ({
   className = "",
   dropdownClassName = {
      backgroundColor: "bg-white",
      selectedBackgroundColor: "bg-gray-200",
      textColor: "text-black",
      borderColor: "border-gray-200",
      hoverBackgroundColor: "hover:bg-gray-100",
   },
   options,
   direction = "down",
   selectedOption,
   selectOption,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const selectedLabel =
      options.find((o) => o.value === selectedOption)?.label || "Select";

   return (
      <div className="relative inline-block" ref={dropdownRef}>
         <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={clsx(
               "flex items-center h-full justify-between px-4 py-2 outline-none",
               className
            )}
         >
            {selectedLabel}
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="w-4 h-4 ml-2"
            >
               <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
               />
            </svg>
         </button>

         {isOpen && (
            <div
               className={clsx(
                  "absolute rounded-lg shadow-xl border z-10",
                  dropdownClassName.backgroundColor,
                  dropdownClassName.textColor,
                  dropdownClassName.borderColor,
                  direction === "up" ? "bottom-full mb-2" : "top mt-1"
               )}
            >
               <ul className="py-1">
                  {options.map((option) => {
                     const isSelected = option.value === selectedOption;
                     return (
                        <li
                           key={option.value}
                           onClick={() => {
                              selectOption(option.value);
                              setIsOpen(false);
                           }}
                           className={clsx(
                              "px-4 py-2 cursor-pointer",
                              isSelected
                                 ? dropdownClassName.selectedBackgroundColor
                                 : dropdownClassName.backgroundColor,
                              !isSelected &&
                                 dropdownClassName.hoverBackgroundColor
                           )}
                        >
                           {option.label}
                        </li>
                     );
                  })}
               </ul>
            </div>
         )}
      </div>
   );
};

export default Dropdown;
