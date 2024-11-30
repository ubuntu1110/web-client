// src/components/ui/CongratulationsModal.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaTrophy } from 'react-icons/fa';

interface User {
    id: string;
    name: string;
    points: number;
}

interface CongratulationsModalProps {
    winners: User[];
    onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ winners, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Кнопка закрытия */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <FaTimes size={24} />
                </button>

                {/* Заголовок */}
                <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center text-primary">
                    <FaTrophy className="mr-2" /> Поздравляем победителей!
                </h2>

                {/* Список победителей */}
                <ul>
                    {winners.map((winner, index) => (
                        <li key={winner.id} className="flex items-center mb-4">
                            <span className="text-2xl mr-4 text-yellow-500">{index + 1}.</span>
                            <div>
                                <p className="text-xl font-semibold text-gray-800">{winner.name}</p>
                                <p className="text-gray-600">Баллы: {winner.points}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Кнопка подтверждения */}
                <div className="mt-6 text-center">
                    <button
                        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-300"
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CongratulationsModal;
