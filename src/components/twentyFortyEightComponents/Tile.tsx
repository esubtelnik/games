import React from 'react';

const Tile = ({ num }) => {
    const tileColors = {
        0: 'bg-[#EEE4DA59]',
        2: 'bg-[#FAF8EF]',
        4: 'bg-[#EDE0C8]',
        8: 'bg-[#f2b179]',
        16: 'bg-[#F59563]',
        32: 'bg-[#F67C58]',
        64: 'bg-[#F65E3B]',
        128: 'bg-[#EDCF72]',
        256: 'bg-[#EDCC61]',
        512: 'bg-[#EDC850]',
        1024: 'bg-[#EDC53F]',
        2048: 'bg-[#EDC22E]',
    };

    return (
        <div
            className={`tile flex items-center rounded-md justify-center text-4xl font-bold ${num === 2 || num === 4 ? `text-beige` : `text-white`}  h-20 w-20 ${
                tileColors[num] || 'bg-black'
            }`}
            style={{
                transition: 'all 0.2s ease',
            }}
        >
            {num !== 0 ? num : ''}
        </div>
    );
};

export default Tile;
