import { FC } from "react";

interface ISudokuCellProps {
   value: number;
   onChange: (row: number, col: number, value: number) => void;
   row: number;
   col: number;
   editable: boolean;
}

const SudokuCell: FC<ISudokuCellProps> = ({
   value,
   onChange,
   row,
   col,
   editable,
}) => {
   return (
      <input
         type="text"
         maxLength={1}
         className={`${
            editable
               ? value !== 0
                  ? "text-turquoise bg-[#34b3cd]/20"
                  : "text-turquoise"
               : "text-dark-blue"
         } size-16 font text-center border border-dark-blue/40 text-3xl font-semibold focus:outline-none`}
         value={value ? value.toString() : ""}
         onChange={
            editable
               ? (e) => onChange(row, col, parseInt(e.target.value))
               : undefined
         }
         readOnly={!editable}
      />
   );
};

export default SudokuCell;
