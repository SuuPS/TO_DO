import fs from 'fs';
import path from 'path';

// Получаем правильный путь к текущей директории
const dbFilePath = path.join(process.cwd(), 'db.json');  // Используем process.cwd() для получения текущей рабочей директории

// Данные, которые будут записаны в db.json
const defaultData = {
    users: [
        { id: 1, name: 'Жусуп Мунанбеков', email: 'jusup@example.com' },
        { id: 2, name: 'Алишер Кенжебаев', email: 'alisher@example.com' }
    ]
};

// Проверяем, существует ли файл db.json
if (!fs.existsSync(dbFilePath)) {
    console.log('Файл db.json не найден. Создаю новый файл с данными по умолчанию...');

    // Создаем файл db.json с данными по умолчанию
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2));

    console.log('Файл db.json успешно создан.');
} else {
    console.log('Файл db.json уже существует.');
}
