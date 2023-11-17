const apiKey = "455c33619df04d9cb2a94255231711";

// Элементы на странице
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// Слушаем отправку формы
form.onsubmit = function (e) {
  //Отменяем отправку формы
  e.preventDefault();

  // БЕрем значение из input, обрезаем пробелы
  let city = input.value.trim();

  // Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  // Выполняем запрос погоды
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Проверка на ошибку
      if (data.error) {
        // Если есть ошибка - выводим ее

        // Удаляем предыдущую карточку
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        const html = `<div class="card">${data.error.message}</div>`;
        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      } else {
        // Если ошибки нет - выводим карточку
        // Отображаем полученные данные в карточке
        // Удаляем предыдущую карточку
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();

        // Разметка для карточки
        const html = `
        <div class="card">
        <h2 class="card__city">${data.location.name}<span>${data.location.country}</span></h2>
        <div class="card__weather">
          <div class="card__value">${data.current.temp_c}<sup>°с</sup></div>

          <img class="card__img" src="./img/sun/8.png" alt="cloudy" />
        </div>
        <div class="card__discription">${data.current.condition.text}</div>
      </div>
      `;

        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
