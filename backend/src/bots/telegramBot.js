const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

// Укажите токен вашего Telegram-бота
const BOT_TOKEN = '7603670216:AAG17BZBaH8Iy6-5NiM-a1mBJ1OK71xxTJc';
if (!BOT_TOKEN) {
    throw new Error('Токен бота не указан. Укажите BOT_TOKEN.');
}

// Создаем экземпляр бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// URL API-сервера
const SERVER_URL = 'http://localhost:5000/api/users';

// Обработчик команды /add
bot.onText(/\/add (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
        const input = match[1].trim();
        const parts = input.split(' ');

        if (parts.length < 2) {
            return bot.sendMessage(chatId, 'Некорректный формат команды. Используйте: /add имя баллы');
        }

        const name = parts.slice(0, -1).join(' ');
        const points = parseInt(parts[parts.length - 1], 10);

        if (isNaN(points)) {
            return bot.sendMessage(chatId, 'Некорректное значение баллов. Убедитесь, что указано число.');
        }

        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, points }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Ошибка сервера:', errorData.message);
            return bot.sendMessage(chatId, `Ошибка сервера: ${errorData.message}`);
        }

        bot.sendMessage(chatId, `Участник "${name}" успешно добавлен с ${points} баллами.`);
    } catch (error) {
        console.error('Ошибка при обработке команды:', error.message);
        bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
    }
});

// Обработка остановки бота
process.once('SIGINT', () => bot.stopPolling());
process.once('SIGTERM', () => bot.stopPolling());
