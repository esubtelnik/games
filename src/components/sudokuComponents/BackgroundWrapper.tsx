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
    size: number;
    color: string;
    element: SVGSVGElement;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
    const petalsRef = useRef<Petal[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createPetal = () => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const size = 20 + Math.random() * 15;
            svg.setAttribute('width', `${size}`);
            svg.setAttribute('height', `${size}`);
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.style.position = 'absolute';
            svg.style.pointerEvents = 'none';
            svg.style.willChange = 'transform';

            const colors = ['##FF5F60','#FFB7C5', '#FFC0CB', '#FFD4E5', '#FFEEF5'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15');
            path.setAttribute('stroke', color);
            path.setAttribute('fill', color);
            path.setAttribute('fill-opacity', '0.3');
            svg.appendChild(path);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '12');
            circle.setAttribute('cy', '12');
            circle.setAttribute('r', '1');
            circle.setAttribute('fill', color);
            svg.appendChild(circle);

            const x = Math.random() * window.innerWidth;
            const y = -30;
            const speed = 1 + Math.random() * 1.5;
            const swayAmplitude = 40 + Math.random() * 60;
            const swaySpeed = 0.015 + Math.random() * 0.01;
            const rotationSpeed = (Math.random() - 0.5) * 4;
            const opacity = 0.7 + Math.random() * 0.3;

            svg.style.left = `${x}px`;
            svg.style.top = `${y}px`;
            svg.style.opacity = `${opacity}`;

            containerRef.current?.appendChild(svg);

            petalsRef.current.push({
                x,
                y,
                speed,
                swayAmplitude,
                swaySpeed,
                rotation: Math.random() * 360,
                rotationSpeed,
                opacity,
                size,
                color,
                element: svg,
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
            if (petalsRef.current.length < 50) {
                createPetal();
            }
        }, 400);
        
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