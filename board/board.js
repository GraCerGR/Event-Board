/*import { generateColor } from '..colorgenerationTest.js';
import { isDark } from '..colorgenerationTest.js';*/

function createCard(data, id) {
    const cardContainerWrapper = document.querySelector('.row.row-cols-md-4');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-col','mb-4','card-col');
    color = generateColor(data.NameCompany);
    cardContainer.innerHTML = `
        <div class="card">
            <botton type="button" id="eventInfoButton${id}" class=""
            data-bs-toggle="modal" data-bs-target="#eventInfo${id}">
            <div class="card-header" style="background-color: ${generateColor(data.NameCompany)};">
                <h5 id="Name" style="color: ${isDark(color) ? 'white' : 'black'}">
                    ${data.Name}
                </h5>
                <div id="NameCompany" style="color: ${isDark(color) ? 'white' : 'black'}">
                    ${data.NameCompany}
                </div>
            </div>
            <div class="card-body">
                <p class="card-text" id="Description"
                    style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5;">
                        ${data.Description}
                <div>
                    <b class="card-text">Организатор:</b>
                    <h7 class="card-text" id="UserName">${data.UserName}
                </div>
                <div>
                    <b class="card-text">Дата и время:</b>
                    <h7 class="card-text" id="Date">${data.Date}
                </div>
            </div>
            </botton>
        </div>


        <div class="modal fade" id="eventInfo${id}" tabindex="-1" aria-labelledby="eventInfo${id}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="background-color: ${color};">
                    <h5 class="modal-title" id="eventInfo${id}Label"style="color: ${isDark(color) ? 'white' : 'black'}">${data.Name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${data.Description}</p>
                    <div>
                        <b class="card-text">Компания-организатор:</b>
                        <h7 class="card-text" id="UserName${id}">${data.UserName}
                    </div>
                    <div>
                        <b class="card-text">Организатор:</b>
                        <h7 class="card-text" id="NameCompany${id}">${data.NameCompany}
                    </div>
                    <div>
                        <b class="card-text">Дата и время мероприятия:</b>
                        <h7 class="card-text" id="Date${id}">${data.Date}
                    </div>
                    <div>
                        <b class="card-text">Место проведения:</b>
                        <h7 class="card-text" id="Location${id}">${data.Location}
                    </div>
                </div>
                <div class="modal-footer" id="ListUser${id}">
                    <div class="w-100">
                        <button class="btn body-tertiary w-100" data-bs-toggle="collapse"
                            data-bs-target="#ListUserCollapse${id}" aria-expanded="false" aria-controls="ListUserCollapse${id}">
                            Кто пойдёт
                        </button>
                        <div class="collapse" id="ListUserCollapse${id}">
                            <ul class="list-group" style="max-height: 150px; overflow-y: auto;" id="userList${id}">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between align-items-center">
                    <span id="deadline" class="ml-2">Дедлайн записи: ${data.Deadline}</span>
                    <button type="button" class="btn" onclick="visit()" style="background-color: ${color}; color: ${isDark(color) ? 'white' : 'black'}";>Посетить</button>
                </div>
            </div>
        </div>
    </div>
    `;
    cardContainerWrapper.appendChild(cardContainer);
    generateUserList(data.Students, id);

  /*  const addToCartButton = cardContainer.querySelector('.btn-primary');
    addToCartButton.addEventListener('click', () => {
        addToCart(data.id);
    });*/
}

function generateUserList(users, id) {
    const userList = document.getElementById(`userList${id}`);
    userList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = user.name;
        userList.appendChild(listItem);
    });
}

const events = [
    {
        Name: "Название мероприятия 1",
        Description: "Описание мероприятия 1",
        NameCompany: "Название компании 1",
        UserName: "Имя создателя 1",
        Date: "31.12.2023 12:30",
        Location: "Адрес места проведения 1",
        Deadline: "30.12.2023",
        Students: [
            { name: "Пользователь 1" },
            { name: "Пользователь 2" }
        ]
    },
    {
        Name: "Название мероприятия 2",
        Description: "Описание мероприятия 2",
        NameCompany: "компания 2",
        UserName: "Имя создателя 2",
        Date: "01.01.2024 14:00",
        Location: "Адрес места проведения 2",
        Deadline: "31.12.2023",
        Students: [
            { name: "Пользователь 3" },
            { name: "Пользователь 4" }
        ]
    },
    {
        Name: "Название мероприятия 3",
        Description: "Описание мероприятия 3",
        NameCompany: "Хитс",
        UserName: "Имя создателя 3",
        Date: "02.01.2024 16:00",
        Location: "Адрес места проведения 3",
        Deadline: "01.01.2024",
        Students: [
            { name: "Пользователь 5" },
            { name: "Пользователь 6" }
        ]
    },
    {
        Name: "Название мероприятия 1",
        Description: "Описание мероприятия 1",
        NameCompany: "Цвет 30000",
        UserName: "Имя создателя 1",
        Date: "31.12.2023 12:30",
        Location: "Адрес места проведения 1",
        Deadline: "30.12.2023",
        Students: [
            { name: "Пользователь 1" },
            { name: "Пользователь 2" }
        ]
    },
    {
        Name: "Название мероприятия 1",
        Description: "Описание мероприятия 1",
        NameCompany: "Название компании 1",
        UserName: "Имя создателя 1",
        Date: "31.12.2023 12:30",
        Location: "Адрес места проведения 1",
        Deadline: "30.12.2023",
        Students: [
            { name: "Пользователь 1" },
            { name: "Пользователь 2" }
        ]
    },
];

events.forEach((event, index) => {
    createCard(event,index);
  });