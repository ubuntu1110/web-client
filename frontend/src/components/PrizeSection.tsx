import React, { useEffect, useState } from 'react';
import { FaPiggyBank } from 'react-icons/fa';
import { motion } from 'framer-motion';
import piggyBankImage from '../assets/piggy-bank.png';

const PrizeSection: React.FC = () => {
    const [totalPrize, setTotalPrize] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalPrize = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/total-prize`);
                if (!response.ok) {
                    throw new Error(`Ошибка сети: ${response.status}`);
                }

                const data = await response.json();
                setTotalPrize(data.totalPrize);
            } catch (error: any) {
                console.error('Ошибка при загрузке данных:', error.message);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalPrize();

        const interval = setInterval(fetchTotalPrize, 5000);
        return () => clearInterval(interval);
    }, []);

    const MAX_SUM = 10000;
    const fillPercentage = Math.min((totalPrize / MAX_SUM) * 100, 100);

    return (
        <div className="container mx-auto p-4 mt-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Сумма для розыгрыша</h2>
            {error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : loading ? (
                <p className="text-center">Загрузка данных...</p>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-64">
                        <img src={piggyBankImage} alt="Банка" className="w-full h-full object-contain" />
                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-green-500 opacity-70"
                            initial={{ height: 0 }}
                            animate={{ height: `${fillPercentage}%` }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            style={{ zIndex: -1, borderRadius: '0 0 50% 50%' }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <FaPiggyBank className="text-green-500 mb-2 animate-bounce" size={40} />
                            <p className="text-xl font-semibold text-white">$ {totalPrize}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-lg text-center">
                        Общая сумма розыгрыша: <span className="font-bold">$ {totalPrize}</span>
                    </p>
                    <p className="mt-2 text-sm text-center text-gray-600">(Максимальная сумма: $ {MAX_SUM})</p>
                </div>
            )}
        </div>
    );
};

export default PrizeSection;
