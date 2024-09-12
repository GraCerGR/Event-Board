// Функция для генерации цвета на основе названия компании
function generateColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash & 0x00FFFFFF) | 0x1000000).toString(16).slice(1)}`;
    return color;
}

// Функция для определения яркости цвета
function isDark(color) {
    // Убираем символ # и преобразуем цвет в RGB
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    // Используем формулу для определения яркости
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128; // Если яркость меньше 128, то цвет темный
}