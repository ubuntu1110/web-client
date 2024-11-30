// src/components/ui/AdditionalPrizes.tsx
import React from 'react';
import PrizeCard from './PrizeCard';
import CountdownTimer from './CountdownTimer';

const prizes = [
    {
        id: 1,
        type: 'ipad',
        requiredPoints: 500,
    },
    {
        id: 2,
        type: 'headphones',
        requiredPoints: 300,
    },
    {
        id: 3,
        type: 'gift',
        requiredPoints: 100,
    },
];

const AdditionalPrizes: React.FC = () => {
    return (
        <div className="container mx-auto p-4 mt-16">
            {/* Обратный Отсчёт */}
            <CountdownTimer />

            {/* Заголовок раздела призов */}
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Дополнительные Призы</h2>

            {/* Сетка карточек призов */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {prizes.map((prize) => (
                    <PrizeCard key={prize.id} prize={prize} />
                ))}
            </div>
        </div>
    );
};

export default AdditionalPrizes;
