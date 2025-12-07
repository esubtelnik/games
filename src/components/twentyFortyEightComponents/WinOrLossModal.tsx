import React from 'react';

interface WinOrLossModalProps {
    resetGame: () => void;
    result: string;
    score: number;
    onClose: () => void;
}

const WinOrLossModal = ({ resetGame, result, score, onClose }: WinOrLossModalProps) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div
            onClick={handleBackdropClick}
            className='fixed w-full h-full inset-0 flex flex-col items-center justify-center z-50 bg-[#bbada0]/80'
        >
            <div className=' text-beige text-[60px] font-bold mb-2'>
                {result === 'Loss' ? 'Game over!' : 'You win!'}
            </div>
            <div className=' text-beige text-[30px] font-bold mb-3'>
                Your score: {score}
            </div>
            <button
                onClick={resetGame}
                className='px-5 py-2 outline-none rounded-md bg-beige text-white text-2xl font-bold'
            >
                Try Again
            </button>
        </div>
    );
};

export default WinOrLossModal;
