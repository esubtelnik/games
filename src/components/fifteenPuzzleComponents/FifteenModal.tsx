import React from 'react';

const WinOrLossModal = ({ resetGame, time, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div
            onClick={handleBackdropClick}
            className='fixed w-full h-full inset-0 flex flex-col items-center justify-center z-50 bg-violet-900/80'
        >
              <div className='bg-violet-200 py-1 px-3 rounded mb-7'>
                <h1 className='text-center text-[40px] font-bold text-violet-900'> You win!</h1>
            </div>
           <div className='bg-violet-200 py-1 px-3 rounded mb-7'>
                <h1 className='text-center text-2xl font-bold text-violet-900'> Your time: {time}</h1>
            </div>
            <div className='bg-violet-200 p-1 rounded w-28'>
                <button
                    onClick={resetGame}
                    className=' p-2 w-full  bg-violet-600 hover:bg-violet-700 text-white rounded'
                >
                    New game
                </button>
            </div>
            
        </div>
    );
};

export default WinOrLossModal;
