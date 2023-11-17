const apiKey = '455c33619df04d9cb2a94255231711';

// Получаем название города ( значение из формы )
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let city;

// Слушаем отправку формы 
form.onsubmit = function (e){
    //Отменяем отправку формы
    e.preventDefault();

    // БЕрем значение из input, обрезаем пробелы 
    city = input.value.trim();
    
    
    // Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Выполняем запрос погоды
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
    });
}