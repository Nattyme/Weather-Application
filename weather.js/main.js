import conditions from "./conditions.js";
const apiKey = "42d93d553a52487d9b0105850240306";
// Элементы на странице
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML("afterend", html);
}

function showCard({name, country, temp, imgPath, condition}) {
  // Разметка для карточки
  const html = `
    <div class="card">
    <h2 class="card__city">${name}<span>${country}</span></h2>
    <div class="card__weather">
      <div class="card__value">${temp}<sup>°с</sup></div>

      <img class="card__img" src="${imgPath}" alt="cloudy" />
    </div>
    <div class="card__discription">${condition}</div>
  </div>
  `;
  // Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  // Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}


// Слушаем отправку формы
form.onsubmit = async function (e) {
  //Отменяем отправку формы
  e.preventDefault();
  // Берем значение из input, обрезаем пробелы
  let city = input.value.trim();
  // Получаем данные с сервера
  const data = await getWeather(city);

  if(data.error) {
    removeCard();
    showError(data.error.message);
  } else {
    removeCard();
    console.log(data.current.condition.code)
    
    const info = conditions.find((obj) => obj.code === data.current.condition.code);
    console.log(info)
    console.log(info.languages)

    const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
    const fileName = (data.current.is_day ? info.day : info.night) + '.png';
    const imgPath = filePath + fileName;
    console.log(imgPath);
    
    // Получаем условие 
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.is_day ? info.languages[23]['day_text'] 
      : info.languages[23]['night_text'],
      imgPath,
    };

    showCard(weatherData);
  }

};

// // Выполняем запрос 
// fetch(url)
// .then((response) => {
//     return response.json();
// })
// .then((data) => {
//     console.log(data);
// });

