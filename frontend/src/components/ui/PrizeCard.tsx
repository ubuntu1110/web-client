// src/components/ui/PrizeCard.tsx
import React from 'react';
import Prizeipad from './Prizeipad';
import HeadphonesPrize from './HeadphonesPrize';
import GiftPrize from './GiftPrize';

interface Prize {
    id: number;
    type: 'ipad' | 'headphones' | 'gift';
    requiredPoints: number;
}

interface PrizeCardProps {
    prize: Prize;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ prize }) => {
    switch (prize.type) {
        case 'ipad':
            return <Prizeipad requiredPoints={prize.requiredPoints} />;
        case 'headphones':
            return <HeadphonesPrize requiredPoints={prize.requiredPoints} />;
        case 'gift':
            return <GiftPrize requiredPoints={prize.requiredPoints} />;
        default:
            return null;
    }
};

export default PrizeCard;
