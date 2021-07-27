function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  for (let i = 1; i < 6; i++) {
    let forecast = response.data.daily[i];
    let forecastElement = document.querySelector(`.ul${i}`);
    let forecastHTML = `<li><strong>${formatDay(
      forecast.dt
    )}</strong></li><li class="icon"><img
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></li><li><span class="s${2 * i - 1}"> ${Math.round(
      forecast.temp.max
    )} </span>° &nbsp &nbsp <span class="s${2 * i}">${Math.round(
      forecast.temp.min
    )}</span>°</li>`;

    forecastElement.innerHTML = forecastHTML;
  }
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
document.querySelector("#time1").innerHTML = `${day}  ${hours}:${minutes}`;

function far(event) {
  event.preventDefault();
  let vl = document.querySelector(".sp1").title;
  if (vl === "0") {
    let deg1 = document.querySelector(".sp7").innerHTML;
    deg1 = parseInt(deg1);
    let convert1 = (deg1 * 9) / 5 + 32;
    document.querySelector(".sp7").innerHTML = Math.round(convert1) + "°";

    let farenh = (document.querySelector(".sp2").style.background =
      "rgb(190, 187, 187)");
    let Celci = (document.querySelector(".sp1").style.background = "white");
    document.querySelector(".sp1").title = "1";
  }
  for (let i = 1; i < 11; i++) {
    let dg = document.querySelector(`.s${i}`).innerHTML;
    dg = parseInt(dg);
    let ct1 = (dg * 9) / 5 + 32;
    document.querySelector(`.s${i}`).innerHTML = Math.round(ct1);
  }
}
function cels(event) {
  event.preventDefault();
  let vl = document.querySelector(".sp1").title;
  if (vl === "1") {
    document.querySelector(".sp7").innerHTML = Math.round(temperature) + "°";
    let Celci = (document.querySelector(".sp1").style.background =
      "rgb(190, 187, 187)");
    let farenh = (document.querySelector(".sp2").style.background = "white");
    document.querySelector(".sp1").title = "0";
    for (let i = 1; i < 11; i++) {
      let dg = document.querySelector(`.s${i}`).innerHTML;
      dg = parseInt(dg);
      dg = (dg - 32) / 1.8;
      document.querySelector(`.s${i}`).innerHTML = Math.round(dg);
    }
  }
}
let temperature = null;
let farenh = document.querySelector(".sp2");
let Celci = document.querySelector(".sp1");
farenh.addEventListener("click", far);
Celci.addEventListener("click", cels);

function showWeather(response) {
  let city = document.querySelector(".sp5");
  let temp = document.querySelector(".sp7");
  let humid = document.querySelector(".sp9");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let weatherElement = document.querySelector("#wdescription");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  temperature = response.data.main.temp;
  city.innerHTML = `${response.data.name}`;
  weatherElement.innerHTML = `${response.data.weather[0].description}`;
  temp.innerHTML = ` ${Math.round(temperature)}°`;
  humid.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = Math.round(`${response.data.wind.speed}`) + " km/h";
  getForecast(response.data.coord);
}
function clocation(position) {
  let apiKey = "bfdd861f9265c95fc960cea47df40ab7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
  let Celci = (document.querySelector(".sp1").style.background =
    "rgb(190, 187, 187)");
  let farenh = (document.querySelector(".sp2").style.background = "white");
  document.querySelector(".sp1").title = "0";
  getForecast(response.data.coord);
}
function al(event) {
  navigator.geolocation.getCurrentPosition(clocation);
}

let buttonc = document.querySelector("#cl2");
buttonc.addEventListener("click", al);

function subc1(event) {
  event.preventDefault();

  let inp = document.querySelector("#query");
  let city = inp.value;
  let apiKey = "bfdd861f9265c95fc960cea47df40ab7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);

  let newinp = (document.querySelector(".sp5").innerHTML = city);
  let Celci = (document.querySelector(".sp1").style.background =
    "rgb(190, 187, 187)");
  let farenh = (document.querySelector(".sp2").style.background = "white");
  document.querySelector(".sp1").title = "0";
}
let fs = document.querySelector("#forms");
fs.addEventListener("submit", subc1);

function defaultcity(dcity) {
  let inp = document.querySelector("#query");
  let city = dcity;
  let apiKey = "bfdd861f9265c95fc960cea47df40ab7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getForecast(coordinates) {
  let apiKey = "bfdd861f9265c95fc960cea47df40ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
defaultcity("london");
