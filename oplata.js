document.addEventListener("DOMContentLoaded", function() {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);

    // Заполняем личную информацию
    document.getElementById('fullName').textContent = `${urlParams.get('firstName') || ''} ${urlParams.get('lastName') || ''} ${urlParams.get('middleName') || ''}`;
    document.getElementById('birthDate').textContent = urlParams.get('birthDate') || '';
    document.getElementById('church').textContent = urlParams.get('church') || '';
    document.getElementById('email').textContent = urlParams.get('email') || '';
    document.getElementById('phone').textContent = urlParams.get('phone') || '';
    document.getElementById('service').textContent = urlParams.get('service') || '';
    document.getElementById('city').textContent = urlParams.get('city') || '';

    // Заполняем дни участия
    const morningSessions = urlParams.getAll('morningSession');
    const eveningSessions = urlParams.getAll('eveningSession');
    const sessionsList = document.getElementById('sessionsList');

    morningSessions.forEach(session => {
        const li = document.createElement('li');
        li.textContent = `Утренняя сессия: ${session}`;
        sessionsList.appendChild(li);
    });

    eveningSessions.forEach(session => {
        const li = document.createElement('li');
        li.textContent = `Вечерняя сессия: ${session}`;
        sessionsList.appendChild(li);
    });

    // Заполняем информацию о переводе
    const needTranslation = urlParams.get('needTranslation') === 'yes' ? 'Да' : 'Нет';
    document.getElementById('translation').textContent = needTranslation;

    // Отображаем итоговую стоимость
    document.getElementById('totalCost').textContent = urlParams.get('totalCost') || '0';

    // Элементы модального окна
    const modal = document.getElementById('paymentModal');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCodeImage = document.getElementById('qrCode');
    const payNowButton = document.getElementById('payNowButton');
    const cashPaymentButton = document.getElementById('cashPaymentButton');
    const cardPaymentButton = document.getElementById('cardPaymentButton');
    const closeModalButton = document.querySelector('.close-button');

    // Показ модального окна по нажатию на кнопку "Оплатить сейчас"
    payNowButton.addEventListener('click', () => {
        modal.style.display = 'block';
        setTimeout(() => modal.querySelector('.modal-content').classList.add('show'), 0); // Показываем с анимацией
    });

    // Закрытие модального окна по нажатию на кнопку закрытия
    closeModalButton.addEventListener('click', () => {
        modal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300); // Закрываем с задержкой для анимации
    });

    // Обработка оплаты наличными
    cashPaymentButton.addEventListener('click', () => {
        const qrData = `
            Имя: ${urlParams.get('firstName') || ''} ${urlParams.get('lastName') || ''} ${urlParams.get('middleName') || ''}
            Дата рождения: ${urlParams.get('birthDate') || ''}
            Церковь/Община: ${urlParams.get('church') || ''}
            Email: ${urlParams.get('email') || ''}
            Телефон: ${urlParams.get('phone') || ''}
            Служение: ${urlParams.get('service') || ''}
            Город: ${urlParams.get('city') || ''}
            Дни участия: ${morningSessions.join(', ')} ${eveningSessions.join(', ')}
            Нужен перевод: ${needTranslation}
            Итоговая сумма: ${urlParams.get('totalCost') || '0'} грн
            Статус: Ожидает оплаты наличными
        `.trim();

        // Генерация QR-кода
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
        qrCodeImage.src = qrCodeURL;
        qrCodeContainer.classList.remove('hidden');
    });

    // Обработка оплаты картой (для будущей реализации)
    cardPaymentButton.addEventListener('click', () => {
        alert('Вы будете перенаправлены на страницу оплаты картой.');
        // Перенаправление на платёжный сервис в будущем
    });
});
