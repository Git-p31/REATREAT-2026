document.addEventListener("DOMContentLoaded", () => {
    const countryCodeSelect = document.getElementById("countryCode");
    const countrySelect = document.getElementById("country");

    // Функция для подгрузки стран и кодов
    const loadCountryCodes = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const countries = await response.json();

            // Загрузим страны в поле "Страна"
            countries.forEach(country => {
                if (country.independent) {
                    const option = document.createElement("option");
                    option.value = country.cca2;  // код страны
                    option.textContent = country.name.common;  // имя страны
                    countrySelect.appendChild(option);
                }
            });

            // Загрузим телефонные коды в поле "Телефон"
            countries.forEach(country => {
                if (country.idd) {
                    const option = document.createElement("option");
                    const countryCode = country.idd.root + country.idd.suffixes.join(", ");
                    option.value = countryCode;
                    option.textContent = `${country.name.common} (${countryCode})`;
                    countryCodeSelect.appendChild(option);
                }
            });
        } catch (error) {
            console.error("Ошибка при загрузке списка стран:", error);
        }
    };

    // Загружаем страны и коды при загрузке страницы
    loadCountryCodes();
});
