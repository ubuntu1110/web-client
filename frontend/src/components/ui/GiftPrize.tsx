// src/components/ui/GiftPrize.tsx
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import giftImage from '../../assets/gift.png'; // Убедитесь, что изображение находится по этому пути
import { motion } from 'framer-motion';

interface GiftPrizeProps {
    requiredPoints: number;
}

const GiftPrize: React.FC<GiftPrizeProps> = ({ requiredPoints }) => {
    return (
        <motion.div
            className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Изображение подарка */}
            <div className="w-full h-64 bg-gradient-to-tr from-gray-100 to-white flex items-center justify-center">
                <img
                    src={giftImage}
                    alt="Подарочный Сертификат"
                    className="w-3/4 h-auto object-contain drop-shadow-lg"
                />
            </div>

            {/* Секция с информацией */}
            <div className="p-6">
                {/* Название приза */}
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Подарочный Сертификат</h3>

                {/* Описание приза */}
                <p className="text-gray-600 mb-4">
                    Подарочный сертификат на сумму 1000₽ для любых покупок.
                </p>

                {/* Требуемые баллы */}
                <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span className="text-lg font-semibold text-primary">
            Требуется: {requiredPoints} баллов
          </span>
                </div>
            </div>
        </motion.div>
    );
};

export default GiftPrize;
