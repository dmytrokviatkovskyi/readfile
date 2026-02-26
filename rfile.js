// Підключення модуля для роботи з файлами
const fs = require('fs');

// Отримання назви файлу з аргументів командного рядка
const filePath = process.argv[2];

// Перевірка, чи вказано файл
if (!filePath) {
    console.log('Вкажіть назву файлу: node rfile.js book.txt');
    process.exit(1);
}

try {
    // Читання тексту з файлу
    const text = fs.readFileSync(filePath, 'utf-8');

    // Підготовка тексту (нижній регістр, видалення розділових знаків)
    const cleanedText = text
        .toLowerCase()
        .replace(/[^\w\sа-яіїєґ]/gi, '');

    // Розбиття тексту на слова
    const words = cleanedText
        .split(/\s+/)
        .filter(word => word.length > 0);

    // Загальна кількість слів
    const totalWords = words.length;

    // Підрахунок частоти кожного слова
    const wordCount = {};
    for (const word of words) {
        wordCount[word] = (wordCount[word] || 0) + 1;
    }

    // Пошук найпопулярнішого слова
    let mostPopularWord = '';
    let maxCount = 0;

    for (const word in wordCount) {
        if (wordCount[word] > maxCount) {
            maxCount = wordCount[word];
            mostPopularWord = word;
        }
    }

    // Виведення результатів
    console.log(`Файл: ${filePath}`);
    console.log(`Загальна кількість слів: ${totalWords}`);
    console.log(`Найпопулярніше слово: "${mostPopularWord}" (${maxCount} разів)`);

} catch (error) {
    // Обробка помилки (наприклад, якщо файл не знайдено)
    console.error('Помилка:', error.message);
}
