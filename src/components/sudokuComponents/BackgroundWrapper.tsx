'use client';
import React, { useEffect, useRef } from 'react';

interface BackgroundWrapperProps {
    children: React.ReactNode;
}

interface Petal {
    x: number;
    y: number;
    speed: number;
    swayAmplitude: number;
    swaySpeed: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    element: HTMLImageElement;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
    const petalsRef = useRef<Petal[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createPetal = () => {
            const petal = document.createElement('img');
            petal.src = '/petal.png';
            petal.className = 'absolute w-6 h-6 pointer-events-none';
            petal.style.willChange = 'transform, opacity';

            const x = Math.random() * window.innerWidth;
            const y = -20;
            const speed = 0.5 + Math.random() * 1;
            const swayAmplitude = 30 + Math.random() * 50;
            const swaySpeed = 0.02 + Math.random() * 0.03;
            const rotationSpeed = (Math.random() - 0.5) * 3;
            const opacity = 0.6 + Math.random() * 0.4;

            petal.style.left = `${x}px`;
            petal.style.top = `${y}px`;
            petal.style.opacity = `${opacity}`;

            containerRef.current?.appendChild(petal);

            petalsRef.current.push({
                x,
                y,
                speed,
                swayAmplitude,
                swaySpeed,
                rotation: Math.random() * 360,
                rotationSpeed,
                opacity,
                element: petal,
            });
        };

        const animate = () => {
            petalsRef.current = petalsRef.current.filter((petal) => {
                petal.y += petal.speed;

                const swayOffset = Math.sin(petal.y * petal.swaySpeed) * petal.swayAmplitude;
                
                petal.rotation += petal.rotationSpeed;

                if (petal.y > window.innerHeight - 100) {
                    petal.opacity -= 0.01;
                }

                petal.element.style.transform = `
                    translate(${swayOffset}px, 0px) 
                    rotate(${petal.rotation}deg)
                `;
                petal.element.style.top = `${petal.y}px`;
                petal.element.style.opacity = `${petal.opacity}`;

                if (petal.y > window.innerHeight + 20 || petal.opacity <= 0) {
                    petal.element.remove();
                    return false;
                }

                return true;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const petalInterval = setInterval(() => {
            const petalsPerTick = 1;
            for (let i = 0; i < petalsPerTick; i++) {
                createPetal();
            }
        }, 700);
        
        animate();

        return () => {
            clearInterval(petalInterval);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            petalsRef.current.forEach((petal) => petal.element.remove());
            petalsRef.current = [];
        };
    }, []);

    return (
        <div
            className='relative flex justify-center items-center h-screen flex-col'
            style={{
                backgroundImage: "url('/sakura.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                ref={containerRef}
                className='absolute inset-0 overflow-hidden pointer-events-none'
            />
            {children}
        </div>
    );
};

export default BackgroundWrapper;