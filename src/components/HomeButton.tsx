import { Routes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const HomeButton: FC<{bg: string}> = ({bg}) => {
    const router = useRouter();
    return (
        <div className='w-full z-30 absolute bottom-0 right-0 flex justify-end py-2 pr-40'>
            <button className={`${bg} rounded-xl cursor-pointer bg-opacity-70 flex justify-center items-center size-20`} onClick={() => router.push(Routes.HOME)}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='#ffffff'
                    className='size-10'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                    />
                </svg>
            </button>
        </div>
    );
};

export default HomeButton;
