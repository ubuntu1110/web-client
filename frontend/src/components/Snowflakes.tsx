// src/components/Snowflakes.tsx
import React from 'react';

const Snowflakes: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, index) => (
                <div
                    key={index}
                    className="absolute bg-white opacity-50 rounded-full"
                    style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}
            {/* Добавьте ключевые кадры в CSS */}
            <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(0);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(100vh);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default Snowflakes;
