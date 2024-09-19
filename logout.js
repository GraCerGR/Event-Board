var token = localStorage.getItem('refreshToken');

const logoutB = document.getElementById('logoutB');

logoutB.addEventListener('click', function() {
    logout();
});
async function logout() {
    try {
        const response = await fetch('https://176.209.128.63:7088/api/Auth/logout', {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: refreshToken })
        });

        if (!response.ok) {
            throw new Error('Ошибка при выходе: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Выход выполнен успешно:', result);
    } catch (error) {
        console.error('Ошибка:', error);
    }
    token = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiration');
    localStorage.removeItem('refreshTokenExpiration');
    window.location.href = '/login/login.html';
}