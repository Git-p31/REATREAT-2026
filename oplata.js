document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

    const getField = (param, defaultValue = "Не указано") => urlParams.get(param) || defaultValue;

    document.getElementById('fullName').textContent = `${getField('firstName')} ${getField('lastName')} ${getField('middleName')}`;
    document.getElementById('birthDate').textContent = getField('birthDate');
    document.getElementById('church').textContent = getField('church');
    document.getElementById('email').textContent = getField('email');
    document.getElementById('phone').textContent = getField('phone');
    document.getElementById('service').textContent = getField('service');
    document.getElementById('city').textContent = getField('city');

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

    const needTranslation = getField('needTranslation') === 'yes' ? 'Да' : 'Нет';
    document.getElementById('translation').textContent = needTranslation;

    const morningSessionCost = parseInt(getField('morningSessionCost', '100'), 10);
    const eveningSessionCost = parseInt(getField('eveningSessionCost', '50'), 10);
    const translationCost = needTranslation === 'Да' ? 50 : 0;

    const totalCost = (morningSessions.length * morningSessionCost) +
                      (eveningSessions.length * eveningSessionCost) +
                      translationCost;

    document.getElementById('totalCost').textContent = `${totalCost} грн`;
    document.getElementById('morningSessionsCost').textContent = `${morningSessions.length * morningSessionCost} грн`;
    document.getElementById('eveningSessionsCost').textContent = `${eveningSessions.length * eveningSessionCost} грн`;
    document.getElementById('translationCostDisplay').textContent = `${translationCost} грн`;

    const modal = document.getElementById('paymentModal');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCodeImage = document.getElementById('qrCode');

    document.getElementById('payNowButton').addEventListener('click', () => {
        modal.style.display = 'block';
        setTimeout(() => modal.querySelector('.modal-content').classList.add('show'), 0);
    });

    document.querySelector('.close-button').addEventListener('click', () => {
        modal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    });

    document.getElementById('cashPaymentButton').addEventListener('click', () => {
        const qrData = `
            Имя: ${getField('firstName')} ${getField('lastName')} ${getField('middleName')}
            Дата рождения: ${getField('birthDate')}
            Церковь/Община: ${getField('church')}
            Email: ${getField('email')}
            Телефон: ${getField('phone')}
            Дни участия: ${morningSessions.join(', ')} ${eveningSessions.join(', ')}
            Нужен перевод: ${needTranslation}
            Итоговая сумма: ${totalCost} грн
        `.trim();

        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
        qrCodeImage.src = qrCodeURL;
        qrCodeContainer.classList.remove('hidden');
    });
});
