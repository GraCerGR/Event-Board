const inputTel = document.getElementById('inputTel');

async function get(url) {
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(url);
      console.log(data);
      populateSpecialties(data.specialties);
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
}
const url = `https://176.209.128.63:7088/api/Company/list?Size=1000`;
get(url)

function populateSpecialties(specialties) {
  const selectSpecialties = document.getElementById('selectIdCompanyM');
  specialties.forEach(specialty => {
    const option = document.createElement('option');
    option.value = specialty.id;
    option.text = specialty.name;
    selectSpecialties.appendChild(option);
  });
}


async function registerPost(data) {
  const url = `https://176.209.128.63:7088/api/Auth/register/${user}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.textContent = '';

      if (result.message) {
        errorMessage.textContent = result.message;
        console.log(result.message);
      }

      /*if (result.title) {
        errorMessage.textContent = result.title;
        console.log(result.title);
      }*/

        if (result.accessToken) {
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          // Обновите время истечения токенов
          localStorage.setItem('accessTokenExpiration', result.accessTokenExpiration);
          localStorage.setItem('refreshTokenExpiration', result.refreshTokenExpiration);
          window.location.href = '../board/board.html';
      }
    })
    .catch(error => {
      console.error('Ошибка', error);
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.textContent = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.';
    });
}

const managerReg = document.getElementById("managerReg");
if (managerReg) {
  managerReg.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('inputNameM').value;
    const password = document.getElementById('inputPasswordM').value;
    const email = document.getElementById('EmailM').value;
    const idCompany = document.getElementById('idCompanyM').value;

    const data = {
      name: name,
      password: password,
      email: email,
      idCompany: idCompany
    };

    console.log(data);

    registerPost(data);
  });
}

const studentReg = document.getElementById("studentReg");
if (studentReg) {
  studentReg.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('inputNameS').value;
    const password = document.getElementById('inputPasswordS').value;
    const email = document.getElementById('EmailS').value;
    const studentCardId = document.getElementById('inputstudentCardIdS').value;

    const data = {
      name: name,
      password: password,
      email: email,
      studentCardId: studentCardId
    };

    console.log(data);

    registerPost(data);
  });
}

function handleLinkClick(linkName) {
  let user;
  if (linkName === 'student') {
    document.getElementById('managerReg').style.display = 'none';
    document.getElementById('studentReg').style.display = 'block';
    user = 'student';
} else if (linkName === 'manager') {
  document.getElementById('studentReg').style.display = 'none';
  document.getElementById('managerReg').style.display = 'block';
  user = 'manager';
}
}

