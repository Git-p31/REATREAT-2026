function loadCountries() {
    fetch('countries.txt')
        .then(response => response.text())
        .then(data => {
            const countries = data.split('\n').map(country => country.trim()).filter(country => country !== '');
            displayCountries(countries);
        })
        .catch(error => console.error('Ошибка при загрузке списка стран:', error));
}

// Функция для отображения стран в выпадающем списке
function displayCountries(countries) {
    var select = document.getElementById('country');
    countries.sort(); // Сортируем страны по алфавиту
    for (var i = 0; i < countries.length; i++) {
        var option = document.createElement('option');
        option.value = countries[i];
        option.textContent = countries[i];
        select.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Обработчик события на клик кнопки "Участвовать"
    document.getElementById('payButton').addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем стандартное действие формы

        // Получаем параметры из формы
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const middleName = document.getElementById('middleName').value;
        const birthDate = document.getElementById('birthDate').value;
        const church = document.getElementById('church').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const country = document.getElementById('country').value; // Получаем выбранную страну
        const city = document.getElementById('city').value;
        const morningSessions = getCheckedSessions('morningSession');
        const eveningSessions = getCheckedSessions('eveningSession');
        const needTranslation = document.getElementById('needTranslationYes').checked ? 'yes' : 'no';

        // Рассчитываем стоимость
        const morningSessionCost = 100;
        const eveningSessionCost = 50;
        const translationCost = needTranslation === 'yes' ? 50 : 0;
        const totalCost = (morningSessions.length * morningSessionCost) + (eveningSessions.length * eveningSessionCost) + translationCost;

        // Строим URL для перенаправления на oplata.html с параметрами
        let redirectURL = `oplata.html?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&middleName=${encodeURIComponent(middleName)}&birthDate=${encodeURIComponent(birthDate)}&church=${encodeURIComponent(church)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&service=${encodeURIComponent(service)}&country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}&needTranslation=${needTranslation}&totalCost=${totalCost}`;

        // Добавляем параметры выбранных сессий
        morningSessions.forEach(session => {
            redirectURL += `&morningSession=${encodeURIComponent(session)}`;
        });
        eveningSessions.forEach(session => {
            redirectURL += `&eveningSession=${encodeURIComponent(session)}`;
        });

        // Перенаправляем пользователя на oplata.html
        window.location.href = redirectURL;
    });
    
    // Загрузка и отображение списка стран при загрузке страницы
    loadCountries();
    
    // Инициализация ввода телефона с использованием intl-tel-input
    const phoneInput = document.querySelector('#phone');
    intlTelInput(phoneInput, {
        initialCountry: "UA",
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
});

// Функция для получения выбранных сессий
function getCheckedSessions(sessionType) {
    const sessions = document.querySelectorAll(`input[name="${sessionType}"]:checked`);
    const sessionValues = [];
    sessions.forEach(session => {
        sessionValues.push(session.value);
    });
    return sessionValues;
}
