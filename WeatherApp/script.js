async function getweather() {
  const city = document.getElementById("city").value.trim();
  const { lat, lon } = await getGeoloc(city);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f3e9b2c8accd97a0af257f683eec7220`
  );
  const data = await response.json();

  document.getElementById("WeatherData").innerHTML=`<div class="text-white">
            <p class="fw-bold">Temperature: ${(data.main.temp - 273.14).toFixed(2)}℃</p>
            <p class="fw-bold">Humidity: ${data.main.humidity}%</p>
            <p class="fw-bold">Description:${data.weather[0].description}</p>
          </div>

          <img
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
            alt="weathericon"
            class="w-25 h-25"
          />`
}
async function getGeoloc(City) {
  console.log(City);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=f3e9b2c8accd97a0af257f683eec7220`
  );
  const data = await response.json();
  const lat = data[0].lat;
  const lon = data[0].lon;

  return { lat, lon };
}
