let locationInput = "los angeles";
let data = [];
let unit = "°F";
const errMsg = document.querySelector('.errMsg');
getData(locationInput);

async function getData(location){
    try{
        errMsg.style.display = 'none';
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=08ebf9b0e8398ffe661ac4bcae054cda";
        const response = await fetch(url, {mode: 'cors'});
        const allData = await response.json();
        const weatherData = await sortData(allData);
        document.querySelector('.icon').src = 'http://openweathermap.org/img/wn/' + data[5] + '@2x.png';
        const render = await renderDisplay(data);
    } catch (error) {
        errMsg.style.display = 'block';
        errMsg.textContent = "Please input proper city name.";
    } 
}

function sortData(allData){
    let feelsLike, temp, tempMax, tempMin;
    if (unit == "°F"){
        feelsLike = ((allData.main.feels_like - 273.15)*9/5+32).toFixed(0);
        temp = ((allData.main.temp - 273.15)*9/5+32).toFixed(0);
        tempMax = ((allData.main.temp_max - 273.15)*9/5+32).toFixed(0);
        tempMin = ((allData.main.temp_min - 273.15)*9/5+32).toFixed(0);
    } else {
        feelsLike = (allData.main.feels_like - 273.15).toFixed(0);
        temp = (allData.main.temp - 273.15).toFixed(0);
        tempMax = (allData.main.temp_max - 273.15).toFixed(0);
        tempMin = (allData.main.temp_min - 273.15).toFixed(0);
    }

    let description = allData.weather[0].description;
    let icon = allData.weather[0].icon;

    let humidity = allData.main.humidity;
    let pressure = allData.main.pressure;
    let windSpeed = allData.wind.speed;
    
    data = [feelsLike, temp, tempMax, tempMin, description, icon, humidity, pressure, windSpeed];

    return data;
}

function renderDisplay(data){
    let words = locationInput.split(' ');
    let capLocation = words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
    document.querySelector('.unit').textContent = unit;
    document.querySelector('.location').textContent = capLocation;
    document.querySelector('.feelsLike').textContent = `Feels Like: ${data[0]}°`;
    document.querySelector('.temp').textContent = data[1];
    document.querySelector('.tempMax').textContent = `High: ${data[2]}°`;
    document.querySelector('.tempMin').textContent = `Low: ${data[3]}°`;
    document.querySelector('.description').textContent = data[4];
    document.querySelector('.humidity').textContent = `Humidity: ${data[6]} %`;
    document.querySelector('.pressure').textContent = `Pressure: ${data[7]} hPa`;
    document.querySelector('.windSpeed').textContent = `Wind Speed: ${data[8]} m/s`;
}

const enter = document.querySelector('.enter');
enter.addEventListener('click', (e)=>{
    e.preventDefault();
    locationInput = document.getElementById('searchLocation').value;
    getData(locationInput);
});

const unitToggle = document.querySelector('.unitToggle');
unitToggle.addEventListener('click', ()=>{
    unit = unit == "°F" ? "°C" : "°F";
    getData(locationInput);
});