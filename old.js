


function renderWeather(weather) {
    let resultsDiv = document.getElementById("weatherResults");
    resultsDiv.style.visibility = "visible";

    let city = document.createElement("h2");
    city.innerHTML = weather.name + ", " + weather.sys.country;
    resultsDiv.append(city);

    let temp = document.createElement("p");
    temp.style.fontSize = "80px";
    temp.style.margin = "0px";
    temp.innerHTML = Math.round(weather.main.temp - 273, 1) + "°C";
    resultsDiv.append(temp);

    let minMaxTemp = document.createElement("div");
    minMaxTemp.style.marginBottom = "20px";
    minMaxTemp.innerHTML = "Min: " + Math.floor(weather.main.temp_min - 273, 1) + "°C " + "| Max: " + Math.ceil(weather.main.temp_max - 273, 1) + "°C";
    resultsDiv.append(minMaxTemp);

    let description = document.createElement("div");
    description.id = "description";
    description.style.display = "flex";
    description.style.alignItems = "center";
    description.innerHTML = weather.weather[0].description;
    resultsDiv.append(description);
    weatherCalculator(description);

    let humidity = document.createElement("div");
    let humidityIcon = "<i class=\"fa-solid fa-droplet\"></i>";
    humidity.style.display = "flex";
    humidity.style.alignItems = "center";
    humidity.innerHTML = humidityIcon + "Humidity: " + weather.main.humidity + "%";
    resultsDiv.append(humidity);

    let wind = document.createElement("div");
    wind.style.display = "flex";
    wind.style = "flex-direction = column";

    let deg = weather.wind.deg;
    let csstrick="style='transform: rotate(" + deg + "deg)'";   
    wind.innerHTML = "Wind speed: " + weather.wind.speed + " km/h " + '| direction: ' + windDirection(deg) + " " + "<i " + csstrick +" class=\"fa-solid fa-up-long\"></i>";
    resultsDiv.append(wind);
}

function fetchWeather(query) {
    let url
    if (query == undefined){
        url = "https://api.openweathermap.org/data/2.5/weather?q=Zwolle&lat=52.51&lon=6.08&appid=cc2df5270138f85fb98dbe420616cfc3";
    }
    else{
        url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&lat=52.51&lon=6.08&appid=cc2df5270138f85fb98dbe420616cfc3";
    }
    fetch(url)
        .then(response => response.json())
        .then(data => renderWeather(data));
}

function windDirection(deg) {
    if (deg / 22,5){
        let directions = ["N", "N/NE", "NE", "E/NE", "E", "E/SE", "SE", "S/SE", "S", "S/SW", "SW", "W/SW", "W", "W/NW", "NW", "N/NW"];
        let index = (Math.round(deg / 22,5, 1));
        let result = directions[index - 1];
        return result;
    }
}

function weatherCalculator(type) {
    let bodyStyle = document.body.style;
    let iconUrl = "<img class=\"icon\" src=\"icons/";
    let el = document.getElementById("description");

    let clearIcon = iconUrl + "clear-sky-icon.png\">";
    let cloudIcon = iconUrl + "clouds-icon.png\">";
    let rainIcon = iconUrl + "rain-icon.png\">";
    let thunderIcon = iconUrl + "thunder-icon.png\">";
    let snowIcon = iconUrl + "snow-icon.png\">";
    let mistIcon = iconUrl + "mist-icon.png\">";

    let rand = Math.round((Math.random()* 4));

    if (el.innerHTML == "clear sky"){
        bodyStyle.backgroundImage = "url('images/clearBG" + rand + ".avif')";
        el.innerHTML += clearIcon;
    }
    else if (el.innerHTML.includes("clouds")){
        bodyStyle.backgroundImage = "url('images/cloudsBG" + rand + ".avif')";
        el.innerHTML += cloudIcon;
    }
    else if(el.innerHTML.includes("rain")){
        bodyStyle.backgroundImage = "url('images/rainBG" + rand + ".avif')";
        el.innerHTML += rainIcon;
    }
    else if(el.innerHTML.includes("thunderstorm")){
        bodyStyle.backgroundImage = "url('images/thunderBG" + rand + ".avif')";
        el.innerHTML += thunderIcon;
    }
    else if(el.innerHTML.includes("snow")){
        bodyStyle.backgroundImage = "url('images/snowBG" + rand + ".avif')";
        el.innerHTML += snowIcon;
    }
    else if(el.innerHTML.includes("mist")){
        bodyStyle.backgroundImage = "url('images/mistBG" + rand + ".avif')";
        el.innerHTML += mistIcon;
    }
}

function send(){
    console.log("clicked");
    let input = document.getElementById("textBox");
    let weatherResults = document.getElementById("weatherResults");
    if (input.value){
        console.log("value true");
        while (weatherResults.firstChild) {
            weatherResults.removeChild(weatherResults.lastChild);
          }
        fetchWeather(input.value);
    }
    else{
        console.log("value false");
    }
}

function checkInput() {
    let input = document.getElementById("textBox");

    console.log("check");
    if (input.value != ""){
        console.log("value detected");
        button.disabeled = false;
    }
    else{
        console.log("value not detected");
        button.disabeled = true;
    }
}