const container = document.getElementById('companiesContainer');
let page = 1;
let ManagersArray;
getManagers().then(GetCompanies(page));

async function createCard(company) {
    const card = document.createElement('div');
    card.className = 'card shadow bg-body-tertiary rounded mb-3';
    card.innerHTML = `
        <div class="card-header p-3" data-bs-toggle="collapse" href="#info-${company.id}" id="${company.id}">
            <h5>${company.name}</h5>
        </div>
        <div class="collapse" id="info-${company.id}">
            <div class="list-group list-group-flush rounded">
                <li class="list-group-item">
                    <h6>Участники</h6>
                    <div class="container row row-cols-2 row-cols-md-4 justify-content-center" style="max-height: 300px; overflow-y: auto;">
                        ${ 'Managers' in company ?
                            company.Managers.map(manager => `
                            <div class="col p-1">
                                <div class="shadow-sm p-3 bg-body-tertiary rounded overflow" style="border: 2px solid ${generateColor(manager.name)}; box-sizing: border-box;">
                                    ${manager.name}
                                </div>
                            </div>
                        `).join('') :
                        `<div class="col p-1" style="display: flex; justify-content: center;">
                            Нет менеджеров или нет доступа
                    </div> `}
                    </div>
                </li>
                <li class="list-group-item">
                    <h6>Заявки</h6>
                    <div class="container justify-content-center" style="max-height: 300px; overflow-y: auto;">
                        ${ 'Applications' in company ?
                            company.Applications.map(application => `
                            <div class="col m-1 shadow-sm p-3 bg-body-tertiary rounded overflow d-flex justify-content-between align-items-center" id="${application.id}">
                                <span class="overflow">${application.name}</span>
                                <div>
                                    <button class="btn btn-link p-0 icon approve-button" title="Одобрить" id="approve-${application.id}">
                                        <img src="../images/islands-68.webp" alt="Одобрить" class="img-fluid" width="24" height="24">
                                    </button>
                                    <button class="btn btn-link p-0 icon delete-button" title="Удалить" id="delete-${application.id}">
                                        <img src="../images/image.png" alt="Удалить" class="img-fluid" width="24" height="24">
                                    </button>
                                </div>
                            </div>
                        `).join('') : 
                        `<div class="col p-1 container row row-cols-2 row-cols-md-4 justify-content-center" style="display: flex; justify-content: center;">
                        Нет заявок или нет доступа
                    </div> `}
                    </div>
                </li>
            </div>
        </div>
    `;

    container.appendChild(card);

    if ('Applications' in company) {
        company.Applications.map(application =>
        document.getElementById(`approve-${application.id}`).addEventListener('click', function() {
            const userId = this.id.replace("approve-", "");
            console.log('Одобрить нажато для ID:', userId);
            status(userId, 1);
        }));
        company.Applications.map(application =>
        document.getElementById(`delete-${application.id}`).addEventListener('click', function() {
            const userId = this.id.replace("delete-", "");
            console.log('Удалить нажато для ID:', userId);
            status(userId, 2);
        }));
    }

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


async function GetCompanies(page) {
    const url = `https://localhost:7088/api/Company/list?Page=${page}&Size=10`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        let companiesData;
        try {
            companiesData = JSON.parse(data);
        } catch (error) {
            console.error('Ошибка парсинга данных:', error);
            return;
        }
        console.log(companiesData);
        if (Array.isArray(companiesData.companies) && companiesData.companies.length > 0) {
            container.innerHTML = '';
            companiesData.companies.forEach((company) => {
                if (ManagersArray){
                // Поиск менеджеров
                const foundManagers = ManagersArray.find(item => (item.companyId === company.id) && (item.status == 1));
                if (foundManagers) {
                    if (!company.Managers) {
                        company.Managers = [];
                    }
                    company.Managers.push({ name: foundManagers.name, id: foundManagers.id });
                }
                // Поиск заявок
                const foundApplications = ManagersArray.find(item => (item.companyId === company.id) && (item.status == 0));
                if (foundApplications) {
                    if (!company.Applications) {
                        company.Applications = [];
                    }
                    company.Applications.push({ name: foundApplications.name, id: foundApplications.id });
                }
                }
                console.log(company);
                createCard(company);
                maxPagination = Math.ceil(companiesData.pagination.count/companiesData.pagination.size);
                updatePagination(maxPagination);
            });
        } else {
            console.log('Нет компаний');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function createcompany(data) {
    const url = 'https://localhost:7088/api/Company';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        location.reload();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function updatePagination(maxPagination) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
  
    const currentPage = parseInt(page); // текущая страница
    const totalPages = maxPagination; // общее количество страниц
    let startPage, endPage;
    if (totalPages <= 5) {
      // Если общее количество страниц меньше или равно 5, то отображаем все страницы
      startPage = 1;
      endPage = totalPages;
    } else {
      // Иначе вычисляем начальную и конечную страницы
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        console.log(currentPage + 2)
        console.log(totalPages)
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
  
    // Элементы для номеров страниц
    for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      const a = document.createElement('a');
      a.classList.add('page-link');
      a.href = '#';
      a.innerText = i;
      if (i === currentPage) {
        li.classList.add('active'); // выделяем текущую страницу
      }
      li.appendChild(a);
      pagination.appendChild(li);
    }
  
    const firstPageLink = document.createElement('a');
    firstPageLink.classList.add('page-link');
    firstPageLink.href = '#';
    firstPageLink.innerHTML = '&laquo;';
    const lastPageLink = document.createElement('a');
    lastPageLink.classList.add('page-link');
    lastPageLink.href = '#';
    lastPageLink.innerHTML = '&raquo;';
  
    const firstPageItem = document.createElement('li');
    firstPageItem.classList.add('page-item');
    firstPageItem.appendChild(firstPageLink);
    const lastPageItem = document.createElement('li');
    lastPageItem.classList.add('page-item');
    lastPageItem.appendChild(lastPageLink);
  
    pagination.insertBefore(firstPageItem, pagination.firstChild);
    pagination.appendChild(lastPageItem);
  }

  pagination.addEventListener('click', (event) => {
    event.preventDefault();
    const link = event.target;
    if (!link.classList.contains('page-link')) {
      return;
    }
    console.log(maxPagination);
    if (link.innerText === '«') {
      page = page - 1; // Получаем предыдущий номер страницы
      console.log(page);
    } else if (link.innerText === '»') {
      console.log(page);
      page = parseInt(page) + 1; // Получаем следующий номер страницы
      console.log(page);
    }
    if (page <= 1) {
      page = 1;
    } else if (page >= maxPagination) {
      page = maxPagination;
      console.log(page);
    }
    if (link.innerText >= 1 && link.innerText <= maxPagination) {
      page = link.innerText; // Получите номер страницы из текста ссылки
    }
    console.log(page)
  
    GetCompanies(page);
  });


  async function getManagers() {
    const url = 'https://localhost:7088/api/managers';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            try {
                data = JSON.parse(data);
            } catch (error) {
                console.error('Ошибка парсинга данных:', error);
                return;
            }
            ManagersArray = data;
            console.log(ManagersArray);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function status(id, status) {
    const url = `https://localhost:7088/api/managers/${id}/status`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(status)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        location.reload();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

const formCreate = document.getElementById("createCompany");
if (formCreate) {
    formCreate.addEventListener('submit', function (event) {
    event.preventDefault();
        const data = document.getElementById('CompanyName').value;
        createcompany(data);
});}