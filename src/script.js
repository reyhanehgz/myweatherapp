let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
    let convert1 = (deg1 * 9) / 5 + 32 ;
    
    document.querySelector(".sp7").innerHTML = Math.round(convert1)+"°";
    /*let deg2 = document.querySelector(".sp8").innerHTML;
        deg2 = parseInt(deg2);
        let convert2 = (deg2 * 9) / 5 + 32 + "°";
        document.querySelector(".sp8").innerHTML = convert2;*/
    let farenh = (document.querySelector(".sp2").style.background =
      "rgb(190, 187, 187)");
    let Celci = (document.querySelector(".sp1").style.background = "white");
    document.querySelector(".sp1").title = "1";
  }
}
function cels(event) {
   event.preventDefault();
  let vl = document.querySelector(".sp1").title;
  if (vl === "1") {
    document.querySelector(".sp7").innerHTML = Math.round(temperature ) + "°";
    let Celci = (document.querySelector(".sp1").style.background =
      "rgb(190, 187, 187)");
    let farenh = (document.querySelector(".sp2").style.background = "white");
    document.querySelector(".sp1").title = "0";
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
  weatherElement.innerHTML =`${response.data.weather[0].description}`;
  temp.innerHTML = ` ${ Math.round(temperature)}°`;
  humid.innerHTML=`${response.data.main.humidity}%`;
  wind.innerHTML = Math.round(`${response.data.wind.speed}`)+ " km/h";
  
  
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
defaultcity("tehran")