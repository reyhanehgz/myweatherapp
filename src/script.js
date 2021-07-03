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

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
document.querySelector("#time1").innerHTML = `${day}  ${hours}:${minutes}`;

function far() {
  let vl = document.querySelector(".sp1").title;
  if (vl === "0") {
    let deg1 = document.querySelector(".sp7").innerHTML;
    deg1 = parseInt(deg1);
    let convert1 = (deg1 * 9) / 5 + 32 + "°";
    document.querySelector(".sp7").innerHTML = convert1;
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
function cels() {
  let vl = document.querySelector(".sp1").title;
  if (vl === "1") {
    let deg1 = document.querySelector(".sp7").innerHTML;
    deg1 = parseInt(deg1);
    let convert1 = ((deg1 - 32) * 5) / 9 + "°";
    document.querySelector(".sp7").innerHTML = convert1;
    /*let deg2 = document.querySelector(".sp8").innerHTML;
        deg2 = parseInt(deg2);
        let convert2 = ((deg2 - 32) * 5) / 9 + "°";
        document.querySelector(".sp8").innerHTML = convert2; */
    let Celci = (document.querySelector(".sp1").style.background =
      "rgb(190, 187, 187)");
    let farenh = (document.querySelector(".sp2").style.background = "white");
    document.querySelector(".sp1").title = "0";
  }
}
let farenh = document.querySelector(".sp2");
let Celci = document.querySelector(".sp1");
farenh.addEventListener("click", far);
Celci.addEventListener("click", cels);

function showWeather(response) {
  let city = document.querySelector(".sp5");
  let temp = document.querySelector(".sp7");
  let temperature = Math.round(response.data.main.temp);
  city.innerHTML = `${response.data.name}`;
  temp.innerHTML = ` ${temperature}°`;
}
function clocation(position) {
  let apiKey = "bfdd861f9265c95fc960cea47df40ab7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
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

  let newinp = (document.querySelector(".sp5").innerHTML = newinp);
}
let fs = document.querySelector("#forms");
fs.addEventListener("submit", subc1);
