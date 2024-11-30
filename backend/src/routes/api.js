const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Путь к файлу с данными
const dataFilePath = path.join(__dirname, '..', '..', 'data.json');

// Максимальная сумма выигрыша
const MAX_SUM = 10000;

// Призы
const PRIZES = {
    first: 3000,
    second: 2000,
    third: 1000,
    fourth: 500,
    fifth: 500,
};

// Чтение данных
const getUsers = () => {
    if (!fs.existsSync(dataFilePath)) {
        return { users: {} };
    }
    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
};

// Запись данных
const setUsers = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Рассчитать сумму выигрыша
const calculateTotalPrize = (sortedUsers) => {
    let prizeSum = 0;
    if (sortedUsers[0]) prizeSum += PRIZES.first;
    if (sortedUsers[1]) prizeSum += PRIZES.second;
    if (sortedUsers[2]) prizeSum += PRIZES.third;
    if (sortedUsers[3]) prizeSum += PRIZES.fourth;
    if (sortedUsers[4]) prizeSum += PRIZES.fifth;
    return Math.min(prizeSum, MAX_SUM);
};

// Эндпоинт для получения пользователей
router.get('/users', (req, res) => {
    try {
        const data = getUsers();
        res.json(data);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

// Эндпоинт для добавления/обновления пользователя
router.post('/users', (req, res) => {
    try {
        const { name, points } = req.body;

        if (!name || typeof points !== 'number') {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        const data = getUsers();
        const users = data.users || {};

        if (users[name]) {
            users[name] += points;
        } else {
            users[name] = points;
        }

        setUsers({ users });

        const sortedUsers = Object.values(users).sort((a, b) => b - a);
        const totalPrize = calculateTotalPrize(sortedUsers);

        res.json({ message: 'Данные обновлены', totalPrize });
    } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

// Эндпоинт для расчета суммы выигрыша
router.get('/total-prize', (req, res) => {
    try {
        const data = getUsers();
        const sortedUsers = Object.values(data.users || {}).sort((a, b) => b - a);
        const totalPrize = calculateTotalPrize(sortedUsers);
        res.json({ totalPrize });
    } catch (error) {
        console.error('Ошибка при расчете суммы выигрыша:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;
