/*import { generateColor } from '..colorgenerationTest.js';
import { isDark } from '..colorgenerationTest.js';*/
const eventsList = [];

async function Get() {
    await GetCompanies()
    eventsList.forEach((event) => {
        console.log(event);
        createCard(event, event.companyId);
    });
}

async function createCard(data, id) {
    const cardContainerWrapper = document.querySelector('.row.row-cols-md-4');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-col', 'mb-4', 'card-col');
    color = generateColor(id);
    cardContainer.innerHTML = `
        <div class="card">
            <botton type="button" id="eventInfoButton${data.id}" class="" data-bs-toggle="modal" data-bs-target="#eventInfo${data.id}">
            <div class="card-header" style="background-color: ${color};">
                <h5 id="Name" style="color: ${isDark(color) ? 'white' : 'black'}">
                    ${data.title}
                </h5>
                <div id="NameCompany" style="color: ${isDark(color) ? 'white' : 'black'}">
                    ${data.NameCompany}
                </div>
            </div>
            <div class="card-body">
                <p class="card-text" id="Description"
                    style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5;">
                        ${data.description}
                <div>
                    <b class="card-text">Организатор:</b>
                    <h7 class="card-text" id="UserName">${data.UserName}
                </div>
                <div>
                    <b class="card-text">Дата и время:</b>
                    <h7 class="card-text" id="Date">${formatDataTime(data.date)}
                </div>
            </div>
            </botton>
        </div>


    <div class="modal fade" id="eventInfo${data.id}" tabindex="-1" aria-labelledby="eventInfo${data.id}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" style="background-color: ${color};">
                    <h5 class="modal-title" id="eventInfo${data.id}Label"style="color: ${isDark(color) ? 'white' : 'black'}">${data.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>${data.description}</p>
                    <div>
                        <b class="card-text">Компания-организатор:</b>
                        <h7 class="card-text" id="UserName${data.id}">${data.NameCompany}
                    </div>
                    <div>
                        <b class="card-text">Организатор:</b>
                        <h7 class="card-text" id="NameCompany${data.id}">${data.UserName}
                    </div>
                    <div>
                        <b class="card-text">Дата и время мероприятия:</b>
                        <h7 class="card-text" id="Date${data.id}">${formatDataTime(data.date)}
                    </div>
                    <div>
                        <b class="card-text">Место проведения:</b>
                        <h7 class="card-text" id="Location${data.id}">${data.location}
                    </div>
                </div>
                <div class="modal-footer" id="ListUser${data.id}">
                    <div class="w-100">
                        <button class="btn body-tertiary w-100" data-bs-toggle="collapse"
                            data-bs-target="#ListUserCollapse${data.id}" aria-expanded="false" aria-controls="ListUserCollapse${data.id}">
                            Кто пойдёт
                        </button>
                        <div class="collapse" id="ListUserCollapse${data.id}">
                            <ul class="list-group" style="max-height: 150px; overflow-y: auto;" id="userList${data.id}">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between align-items-center">
                    <span id="deadline" class="ml-2">Дедлайн записи: ${formatDataTime(data.registrationDeadline)}</span>
                    <button type="button" class="btn" onclick="visit()" style="background-color: ${color}; color: ${isDark(color) ? 'white' : 'black'}";>Посетить</button>
                </div>
            </div>
        </div>
    </div>
    `;
    cardContainerWrapper.appendChild(cardContainer);

/*    if (data.registeredStudents) {
        generateUserList(data.registeredStudents, data.id);
    }*/

    /*  const addToCartButton = cardContainer.querySelector('.btn-primary');
      addToCartButton.addEventListener('click', () => {
          addToCart(data.id);
      });*/

    document.getElementById(`eventInfoButton${data.id}`).addEventListener('click', function () {
        console.log(data);
//         generateUserList(data.registeredStudents, data.id); // Для статичных данных
        getStudents(data.id); //Если бек будет готов
    });
}

async function generateUserList(users, id) {
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
        id: "c8e68bc9-fbd6-4a18-8f57-56205d4334d1",
        title: "Название мероприятия 1",
        description: "Описание мероприятия 1",
        companyId: "08a2be1d-0a52-4a42-ba6f-c8331e8c50ab",
        NameCompany: "Название компании 1",
        UserName: "Имя создателя 1",
        date: "2024-10-30T13:25:00.122Z",
        location: "Адрес места проведения 1",
        registrationDeadline: "2024-10-30T13:25:00.122Z",
        registeredStudents: [
            { name: "Пользователь 1" },
            { name: "Пользователь 2" }
        ]
    },
    {
        id: "6a790f87-c035-4d62-a0a5-b95e140d5a66",
        title: "Название мероприятия 2",
        description: "Описание мероприятия 2",
        companyId: "d9a8ba8d-de4b-4b84-9111-f92fcb595a9d",
        NameCompany: "компания 2",
        UserName: "Имя создателя 2",
        date: "2024-10-30T13:25:00.122Z",
        location: "Адрес места проведения 2",
        registrationDeadline: "2024-10-30T13:25:00.122Z",
        registeredStudents: [
            { name: "Пользователь 3" },
            { name: "Пользователь 4" }
        ]
    },
    {
        id: "8e08afd6-4879-4eea-800a-046ede14207a",
        title: "Название мероприятия 3",
        description: "Описание мероприятия 3",
        companyId: "16ab4454-4e7f-4d0a-9b58-9b4bd26691ae",
        NameCompany: "Хитс",
        UserName: "Имя создателя 3",
        date: "2024-10-30T13:25:00.122Z",
        location: "Адрес места проведения 3",
        registrationDeadline: "2024-10-30T13:25:00.122Z",
        registeredStudents: [
            { name: "Пользователь 5" },
            { name: "Пользователь 6" }
        ]
    }
];

async function GetCompanies() {
    let page = 1;
    let companiesData;

    while (true) {
        const url = `https://localhost:7088/api/Company/list?Page=${page}&Size=100`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.text();

            try {
                companiesData = JSON.parse(data);
            } catch (error) {
                console.error('Ошибка парсинга данных:', error);
                return;
            }

            console.log(companiesData);

            if (companiesData.companies.length === 0) {
                break;
            }
            companiesData.companies.forEach((event) => {
                GetEventsCompany(event);
                //createCard(event, event.id);
            })

            page++;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            break;
        }
    }
}

async function GetEventsCompany(event) {
    const url = `https://localhost:7088/api/events/companies/${event.id}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.text();
        let datas;
        try {
            datas = JSON.parse(data);
        } catch (error) {
            console.error('Ошибка парсинга данных:', error);
            return;
        }


        if (Array.isArray(datas)) {
            eventsList.push(...datas);
        } else {
            eventsList.push(datas);
        }

        console.log(eventsList); // Выводим текущий список событий
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function formatDataTime(originalDate) {
    const dateParts = originalDate.split("T")[0].split("-");
    const timeParts = originalDate.split("T")[1].split(":");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate;
}


const formCreate = document.getElementById("createEvent1");
if (formCreate) {
    formCreate.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('Name').value;
        const shortDescription = document.getElementById('Description').value;
        const eventDateTime = document.getElementById('Date').value;
        const location = document.getElementById('Location').value;

        const data = {
            title: title,
            shortDescription: shortDescription,
            eventDateTime: eventDateTime,
            location: location
        };

        console.log(data);
        makeEvent(data);
    });
}

async function getStudents(id) {
    const url = `https://localhost:7088/api/events/${id}/students`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.text();
        let datas;
        try {
            datas = JSON.parse(data);
        } catch (error) {
            console.error('Ошибка парсинга данных:', error);
            return;
        }
        UserList(id, datas);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function UserList(id, data) {
    console.log(data);
    const div = document.getElementById(`ListUser${id}`);
    div.innerHTML = '';
    console.log(div);
    const divContainer = document.createElement('div');
    divContainer.classList.add('w-100');
    if (data.length != 0) {
        divContainer.innerHTML = `
            <button class="btn body-tertiary w-100" data-bs-toggle="collapse"
                data-bs-target="#ListUserCollapse${id}" aria-expanded="false" aria-controls="ListUserCollapse${id}">
                Кто пойдёт
            </button>
            <div class="collapse" id="ListUserCollapse${id}">
                <ul class="list-group" style="max-height: 150px; overflow-y: auto;" id="userList${id}">
                </ul>
            </div>
`;
    }
    else {
        divContainer.innerHTML = `
            <div class="w-100" style="text-align: center;">
                Никто не записался
            </div>
            `
    }

    div.appendChild(divContainer);
    if (data.length != 0) {
        generateUserList(data, id);
    }
}

events.forEach((event) => {
    createCard(event, event.companyId);
});

Get();