import React from 'react';

interface TitleProps {
    score: number;
}

const Title = ({ score }: TitleProps) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
                <h1 className='text-beige text-[70px] font-bold'>2048</h1>
                <div className='text-beige text-xl font-bold'>Play 2048 Game </div>
                <div className='text-beige text-base'>Join the numbers and get to the <span className='font-bold'>2048</span></div>
            </div>

                <div className='flex flex-col items-center px-5 py-1 rounded-xl bg-[#BBADA0]'>
                    <span className='text-[#EEE4DA] text-base font-bold'>
                        SCORE
                    </span>
                    <span className='text-white text-2xl font-bold'>
                        {score}
                    </span>
                </div>
             

        </div>
    );
};

export default Title;
