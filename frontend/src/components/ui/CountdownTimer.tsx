// src/components/ui/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CongratulationsModal from './CongratulationsModal';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

interface User {
    id: string;
    name: string;
    points: number;
}

const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [winners, setWinners] = useState<User[]>([]);

    // Функция для расчёта времени до следующего Нового года
    const calculateTimeLeft = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const nextYear = currentYear + 1;
        const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
        const difference = newYearDate.getTime() - now.getTime();

        return difference > 0 ? difference : 0;
    };

    useEffect(() => {
        // Устанавливаем начальное время
        setTimeLeft(calculateTimeLeft());

        // Создаём интервал для обновления времени каждую секунду
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft === 0) {
                clearInterval(timer);
                selectWinners();
            }
        }, 1000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(timer);
    }, []);

    // Функция для выборки трёх случайных победителей
    const selectWinners = async () => {
        try {
            // Получаем список пользователей с API
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
            if (!response.ok) {
                throw new Error('Ошибка сети при получении пользователей');
            }

            const data: { users: User[] } = await response.json();

            if (!data.users || data.users.length < 3) {
                throw new Error('Недостаточно пользователей для выбора победителей');
            }

            // Сортируем пользователей по баллам (если необходимо)
            const sortedUsers = data.users.sort((a, b) => b.points - a.points);

            // Выбираем трёх случайных пользователей
            const shuffled = sortedUsers.sort(() => 0.5 - Math.random());
            const selectedWinners = shuffled.slice(0, 3);

            setWinners(selectedWinners);
            setShowModal(true);

            // (Опционально) Отправляем информацию о победителях на сервер
            // await fetch(`${import.meta.env.VITE_API_URL}/winners`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ winners: selectedWinners }),
            // });
        } catch (error: any) {
            console.error('Ошибка при выборе победителей:', error.message);
            // (Опционально) Показываем уведомление об ошибке пользователю
        }
    };

    // Функция для форматирования оставшегося времени
    const formatTimeLeft = () => {
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTimeLeft();

    return (
        <div className="container mx-auto p-4 mt-16 text-center">
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-4 text-gray-800 flex items-center justify-center">
                    <FaCalendarAlt className="mr-2 text-primary" /> Обратный Отсчёт до Нового Года
                </h2>
                <div className="flex justify-center space-x-6">
                    <div>
                        <span className="block text-4xl font-semibold text-gray-800">{days}</span>
                        <span className="text-gray-600">Дней</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-semibold text-gray-800">{hours}</span>
                        <span className="text-gray-600">Часов</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-semibold text-gray-800">{minutes}</span>
                        <span className="text-gray-600">Минут</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-semibold text-gray-800">{seconds}</span>
                        <span className="text-gray-600">Секунд</span>
                    </div>
                </div>
                <div className="mt-4">
                    <FaClock className="inline-block text-gray-600 mr-2" />
                    <span className="text-gray-600">Переходите в раздел призов и набирайте баллы!</span>
                </div>
            </motion.div>

            {/* Модальное окно для поздравления победителей */}
            {showModal && <CongratulationsModal winners={winners} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default CountdownTimer;
