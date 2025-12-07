import { FC } from 'react';

interface IModalProps {
    text: string;
    onClose: () => void;
    restart: () => void;
    state: string;
}

const Modal: FC<IModalProps> = ({ text, onClose, restart, state }) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleRestart = () => {
        restart();
        onClose();
    };
    return (
        <div
            onClick={handleBackdropClick}
            className='fixed w-full h-full inset-0 flex items-center justify-center z-50 bg-dark-blue/50 '
        >
            <div className='bg-white p-10 text-center text-xl text-dark-blue font-bold rounded-xl flex flex-col items-center justify-center gap-y-5'>
                {text}
                {state === 'win' && (
                    <button
                        onClick={handleRestart}
                        className='px-4 py-2 bg-dark-blue text-white rounded hover:bg-turquoise outline-none relative flex items-center justify-center'
                    >
                        New Game
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;
