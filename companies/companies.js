function createCard(company) {
    const card = document.createElement('div');
    card.className = 'card shadow bg-body-tertiary rounded mb-3';
    card.innerHTML = `
        <div class="card-header p-3" data-bs-toggle="collapse" href="#info-${company.Name}">
            <h5>${company.Name}</h5>
        </div>
        <div class="collapse" id="info-${company.Name}">
            <div class="list-group list-group-flush rounded">
                <li class="list-group-item">
                    <h6>Участники</h6>
                    <div class="container row row-cols-2 row-cols-md-4 justify-content-center" style="max-height: 300px; overflow-y: auto;">
                        ${company.Managers.map(manager => `
                            <div class="col p-1">
                                <div class="shadow-sm p-3 bg-body-tertiary rounded overflow" style="border: 2px solid ${generateColor(manager.name)}; box-sizing: border-box;">
                                    ${manager.name}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </li>
                <li class="list-group-item">
                    <h6>Заявки</h6>
                    <div class="container justify-content-center" style="max-height: 300px; overflow-y: auto;">
                        ${company.Applications.map(application => `
                            <div class="col m-1 shadow-sm p-3 bg-body-tertiary rounded overflow d-flex justify-content-between align-items-center">
                                <span class="overflow">${application.name}</span>
                                <div>
                                    <button class="btn btn-link p-0 icon" title="Одобрить">
                                        <img src="../images/islands-68.webp" alt="Одобрить" class="img-fluid" width="24" height="24">
                                    </button>
                                    <button class="btn btn-link p-0 icon" title="Удалить">
                                        <img src="../images/image.png" alt="Удалить" class="img-fluid" width="24" height="24">
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </li>
            </div>
        </div>
    `;

    container.appendChild(card);
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

const companies = [
    {
        Name: "Тинькофф",
        Managers: [
            { name: "Пользователь asddas1" },
            { name: "Пользователь 2" }
        ],
        Applications: [
            { name: "Пользователь 5" },
            { name: "Пользователь 6" }
        ]
    },
    {
        Name: "ВТБ",
        Managers: [
            { name: "Пользователь 3" },
            { name: "Пользователь xcxcv" },
            { name: "Пользователь 3sdfxcv" },
            { name: "Пользователь e3" },
            { name: "Пользователь 3cvx" },
            { name: "Пользователь 4" }
        ],
        Applications: [
            { name: "Пользователь 7" },
            { name: "Пользователь 8" }
        ]
    }
];

const container = document.getElementById('companiesContainer');
companies.forEach((company) => {
    createCard(company);
  });