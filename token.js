// Функция для обновления accessToken
async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch('https://176.209.128.63:7088/api/Auth/refresh', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: refreshToken })
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении токена: ' + response.statusText);
        }

        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        // Обновите время истечения токенов
        localStorage.setItem('accessTokenExpiration', result.accessTokenExpiration);
        localStorage.setItem('refreshTokenExpiration', result.refreshTokenExpiration);
        
        console.log('Токены успешно обновлены');
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Проверка на истечение токена
function checkAccessTokenExpiration() {
    const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');
    
    if (accessTokenExpiration) {
        const expirationDate = new Date(accessTokenExpiration);
        const currentDate = new Date();

        // Если токен истек, обновляем его
        if (expirationDate <= currentDate) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                refreshAccessToken(refreshToken);
            } else {
                console.error('Refresh token отсутствует');
            }
        } else {
            console.log('Токен еще действителен');
        }
    } else {
        console.error('Access token expiration отсутствует');
    }
}

// Запускаем проверку
checkAccessTokenExpiration();