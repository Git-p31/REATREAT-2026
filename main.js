document.addEventListener("DOMContentLoaded", function () {
    // Обработчик события на клик кнопки "Участвовать"
    document.getElementById('payButton').addEventListener('click', function (event) {
        event.preventDefault(); // Отменяем стандартное действие формы

        // Получаем параметры из формы
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const middleName = document.getElementById('middleName').value.trim();
        const birthDate = document.getElementById('birthDate').value.trim();
        const church = document.getElementById('church').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim(); // Телефон
        const service = document.getElementById('service').value.trim();
        const country = document.getElementById('country').value.trim();
        const city = document.getElementById('city').value.trim();
        const morningSessions = getCheckedSessions('morningSession');
        const eveningSessions = getCheckedSessions('eveningSession');
        const needTranslation = document.getElementById('needTranslationYes').checked ? 'yes' : 'no';

        // Проверка обязательных полей
        if (!phone) {
            alert("Пожалуйста, укажите телефон.");
            return;
        }

        // Стоимость за сессии и перевод
        const morningSessionCost = 100;
        const eveningSessionCost = 50;
        const translationCost = needTranslation === 'yes' ? 50 : 0;

        // Рассчитываем стоимость
        const morningSessionTotalCost = morningSessions.length * morningSessionCost;
        const eveningSessionTotalCost = eveningSessions.length * eveningSessionCost;
        const totalCost = morningSessionTotalCost + eveningSessionTotalCost + translationCost;

        // Строим URL для перенаправления на oplata.html с параметрами
        let redirectURL = `oplata.html?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&middleName=${encodeURIComponent(middleName)}&birthDate=${encodeURIComponent(birthDate)}&church=${encodeURIComponent(church)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&service=${encodeURIComponent(service)}&country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}&needTranslation=${needTranslation}&totalCost=${totalCost}`;

        // Добавляем параметры выбранных сессий
        morningSessions.forEach(session => {
            redirectURL += `&morningSession=${encodeURIComponent(session)}`;
        });
        eveningSessions.forEach(session => {
            redirectURL += `&eveningSession=${encodeURIComponent(session)}`;
        });

        // Добавляем стоимость за сессии
        redirectURL += `&morningSessionCost=${morningSessionTotalCost}&eveningSessionCost=${eveningSessionTotalCost}&translationCost=${translationCost}`;

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
