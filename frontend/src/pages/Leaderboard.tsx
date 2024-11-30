import React, { useEffect, useState } from 'react';

const Leaderboard: React.FC = () => {
    const [users, setUsers] = useState<{ name: string; points: number }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных.');
                }

                const data = await response.json();

                // Преобразуем объект в массив, если API возвращает объект
                if (data.users && typeof data.users === 'object') {
                    const usersArray = Object.entries(data.users).map(([name, points]) => ({
                        name,
                        points: Number(points),
                    }));
                    setUsers(usersArray);
                } else {
                    setUsers([]);
                }
            } catch (err: any) {
                console.error('Ошибка загрузки пользователей:', err.message);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p className="text-center">Загрузка данных...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!users.length) {
        return <p className="text-center">Нет данных для отображения.</p>;
    }

    return (
        <div className="container mx-auto p-4 mt-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Таблица лидеров</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Имя</th>
                    <th className="border px-4 py-2">Баллы</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="border px-4 py-2 text-center">{user.name}</td>
                        <td className="border px-4 py-2 text-center">{user.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
