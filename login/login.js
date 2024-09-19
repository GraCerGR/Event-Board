let accessToken;

async function post(url, data = null) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.accessToken) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        // Обновите время истечения токенов
        localStorage.setItem('accessTokenExpiration', result.accessTokenExpiration);
        localStorage.setItem('refreshTokenExpiration', result.refreshTokenExpiration);
        window.location.href = '../board/board.html';
      } else {
        alert(data.message || 'Неверный логин или пароль');
      }
      localStorage.setItem('token', token);
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
}
const url = "https://176.209.128.63:7088/api/Auth/login";
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const email = document.getElementById('Email').value;
    const password = document.getElementById('password').value;
    const data = {
      email: email,
      password: password
    };

    console.log(data);
    post(url, data);
    console.log(accessToken);
  });
}
