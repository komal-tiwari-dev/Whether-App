function getData() {
  let city = document.querySelector("#city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e55facf0266aa7ab8e4ca33d3e6833c6`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      displayData(res);
      getWeather7Day(res.coord.lat, res.coord.lon);
      console.log(res);
    })

    .catch(function (err) {
      console.log("err:", err);
    });
}
//////////////////////////////////////////////////////////////////////////////
function getDataLocation(lat, lon) {
  // document.querySelector("#forecastdata").innerText = null;
  document.querySelector("#city").value = null;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e55facf0266aa7ab8e4ca33d3e6833c6`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      displayData(res);
      console.log(res);
    })
    .catch(function (err) {
      console.log("err:", err);
    });
}
///////////////////////////////////////////////////////////////////////////////////////
function getWeather7Day(lat, lon) {
  const url7day = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=e55facf0266aa7ab8e4ca33d3e6833c6`;

  fetch(url7day)
    .then(function (result) {
      return result.json();
    })
    .then(function (result) {
      console.log(result);
      let arr = result.daily;
      console.log("here", arr);
      append7Day(arr);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function displayData(data) {
  document.querySelector("#forecastdata").innerText = null;
  let container = document.getElementById("container");
  let map = document.querySelector("#gmap_canvas");
  container.innerText = " ";

  let box = document.createElement("div");
  box.setAttribute("id", "box");
  let city = document.createElement("p");

  city.innerText = `CityName:${data.name}`;
  let min = document.createElement("p");
  min.innerText = `Minimum Temp:${Math.round(data.main.temp_min - 273)} °C`;
  let max = document.createElement("p");
  max.innerText = `Maximun Temp:${Math.round(data.main.temp_max - 273)} °C`;
  let current = document.createElement("p");
  current.innerText = `Current Temp: ${Math.round(data.main.temp - 273)} °C`;
  let sunrise = document.createElement("p");
  // sunrise.innerText = `Sunrise: ${data.sys.sunrise}`;
  let sunset = document.createElement("p");
  // sunrise.innerText = `Sunset: ${data.sys.sunset}`;
  let humidity = document.createElement("p");
  humidity.innerText = `humidity: ${data.main.humidity}`;
  let wind = document.createElement("p");
  wind.innerText = `Wind: ${data.wind.speed}`;

  // fOR SUNRISE AND SUNSET
  const unixTime = data.sys.sunrise;
  let date = new Date(unixTime * 1000);

  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  sunrise.innerText = `Sunrise Date : ${date.toLocaleDateString(
    "en-US"
  )} Time : ${formattedTime}`;

  const unixTime1 = data.sys.sunset;
  const date1 = new Date(unixTime1 * 1000);

  var hours = date1.getHours();
  var minutes = "0" + date1.getMinutes();
  var seconds = "0" + date1.getSeconds();
  var formattedTime1 =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  sunset.innerText = `Sunset Date : ${date1.toLocaleDateString(
    "en-US"
  )} Time : ${formattedTime1}`;
  // END OF SUNRISE AND SUNSE

  map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  box.append(city, current, min, max, sunrise, sunset, wind, humidity);
  container.append(box);
}
///////////////////////////////////////////////////////////////////////////////////////////
function append7Day(data) {
  let main = document.querySelector("#forecastdata");
  main.innerText = null;
  document.querySelector("#fore").innerText =
    "Whether Forecast For Next 7 Day";
  let i = 0;
  data.map(function (elem) {
    if (i == 0) {
    } else {
      let box = document.createElement("div");
      box.setAttribute("id", "foreBox");

      let dateBox = document.createElement("p");
      const unixTime = elem.dt;
      const date = new Date(unixTime * 1000);
      dateBox.innerText = `Date : ${date.toLocaleDateString("en-US")}`;

      let temp = document.createElement("p");
      temp.innerText = `Temp : ${Math.round(elem.temp.day - 273)}°C`;

      let maxTemp = document.createElement("p");
      maxTemp.innerText = `Maximum Temp : ${Math.round(elem.temp.max - 273)}°C`;

      let minTemp = document.createElement("p");
      minTemp.innerText = `Minimum Temp : ${Math.round(elem.temp.min - 273)}°C`;

      let humidity = document.createElement("p");
      humidity.innerText = `Humidity : ${elem.humidity}`;

      let img = document.createElement("img");
      img.setAttribute("id", "wheImg");
      img.src = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;


      box.append(dateBox, img, temp, maxTemp, minTemp, humidity);

      main.append(box);
    }
    i++;
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////

function getloc() {
  navigator.geolocation.getCurrentPosition(success);

  function success(position) {
    let crd = position.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less: ${crd.accuracy} meters.`);

    getDataLocation(crd.latitude, crd.longitude);

    getWeather7Day(crd.latitude, crd.longitude);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
