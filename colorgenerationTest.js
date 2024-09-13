// Функция для генерации цвета на основе названия компании
function generateColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash & 0x00FFFFFF) | 0x1000000).toString(16).slice(1)}`;
    return color;
}

function isDark(color) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}