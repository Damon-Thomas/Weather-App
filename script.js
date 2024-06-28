const main = document.querySelector("#main");
const content = document.querySelector(".content")
const input = document.getElementById("city-input");
const submit = document.querySelector(".submit");
const city = document.querySelector(".city-content");
const country = document.querySelector(".country-content");
const time = document.querySelector(".time-content");
const current = document.querySelector(".current-content");
const icon = document.querySelector(".icon-content");
const tempC = document.querySelector(".tempC-content");
const tempF = document.querySelector(".tempF-content");
const humidity = document.querySelector(".humidity-content");
const prompt = document.querySelector(".error-prompt")

submit.addEventListener("click", function (e) {
  e.preventDefault();
  
  getWeatherData(input.value);
});
async function getWeatherData(location) {
  try {
    const weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=973bf25b6ed14106835134638242606&q=${location}&aqi=no`,
      { mode: "cors" }
    );
    const rawData = await weather.json();
    const weatherObj = dataProcessor(rawData);
    countryProcessor(weatherObj);
    cityProcessor(weatherObj);
    timeProcessor(weatherObj);
    currentProcessor(weatherObj);
    iconProcessor(weatherObj);
    tempCProcessor(weatherObj);
    tempFProcessor(weatherObj);
    humidityProcessor(weatherObj);
    prompt.textContent = ''
  } catch(err) {
    prompt.textContent = 'invalid input try again'
    
  }
}

function dataProcessor(rawData) {
  weatherObject = {
    country: rawData.location.country,
    city: rawData.location.name,
    time: rawData.location.localtime,
    current: rawData.current.condition.text,
    icon: rawData.current.condition.icon,
    tempC: rawData.current.temp_c,
    tempF: rawData.current.temp_f,
    humidity: rawData.current.humidity,
  };
  
  main.className = "";
  if (weatherObject.current.includes("lear")) {
    main.classList.add("clear");
  } else if (weatherObject.current.includes("rain")) {
    main.classList.add("rain");
  } else if (weatherObject.current.includes("unny")) {
    main.classList.add("sunny");
  } else if (
    weatherObject.current.includes("vercast") ||
    weatherObject.current.includes("loud")
  ) {
    main.classList.add("cloud");
  }
  content.style.visibility = 'visible'

  
  return weatherObject;
}

function countryProcessor(weatherObj) {
  const string = weatherObj.country;
  country.textContent = string;
}

function cityProcessor(weatherObj) {
  const string = weatherObj.city;
  city.textContent = string;
}

function timeProcessor(weatherObj) {
  const string = weatherObj.time;
  time.textContent = string;
}
function currentProcessor(weatherObj) {
  const string = weatherObj.current;
  current.textContent = string;
}
function iconProcessor(weatherObj) {
  const string = weatherObj.icon;
  icon.src = string;
}
function tempCProcessor(weatherObj) {
  const string = weatherObj.tempC;
  tempC.textContent = `Temp(C):  ${string}`;
}
function tempFProcessor(weatherObj) {
  const string = weatherObj.tempF;
  tempF.textContent = `Temp(F):  ${string}`;
}
function humidityProcessor(weatherObj) {
  const string = weatherObj.humidity;
  humidity.textContent = `Humidity:  ${string}`;
}
