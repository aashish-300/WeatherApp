const apiKey = 'bfef3cff51ce592165a333da5021e77f';

const container = document.querySelector('.container');
const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__field');
const ward = document.querySelector('.home__ward');
const city = document.querySelector('.home__city');
const todayTemp = document.querySelector('.todayTemp');
const presentTime = document.querySelector('.home__present--time');
const weatherCondtion = document.querySelector('.weather__condition');
const feelsLike = document.querySelector('.feels__like--value');
const windSpeed = document.getElementById('windSpeed');
const visibility = document.getElementById('visibility');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const dewPoint = document.getElementById('dewPoint');
const cloud = document.querySelector('.cloud');

//5days cloud class
const cloud1 = document.querySelector('.cloud-1');
const cloud2 = document.querySelector('.cloud-2');
const cloud3 = document.querySelector('.cloud-3');
const cloud4 = document.querySelector('.cloud-4');
const cloud5 = document.querySelector('.cloud-5');

//5days humidity class 
const humidity1 = document.querySelector('.humidity1');
const humidity2 = document.querySelector('.humidity2');
const humidity3 = document.querySelector('.humidity3');
const humidity4 = document.querySelector('.humidity4');
const humidity5 = document.querySelector('.humidity5');

//5days maximum temperature class 
const maxTemp1 = document.querySelector('.temp__max--1');
const maxTemp2 = document.querySelector('.temp__max--2');
const maxTemp3 = document.querySelector('.temp__max--3');
const maxTemp4 = document.querySelector('.temp__max--4');
const maxTemp5 = document.querySelector('.temp__max--5');

//5days minimum temperature class 
const minTemp1 = document.querySelector('.temp__min--1');
const minTemp2 = document.querySelector('.temp__min--2');
const minTemp3 = document.querySelector('.temp__min--3');
const minTemp4 = document.querySelector('.temp__min--4');
const minTemp5 = document.querySelector('.temp__min--5');

//5days date 
const day1 = document.querySelector('.day1');
const day2 = document.querySelector('.day2');
const day3 = document.querySelector('.day3');
const day4 = document.querySelector('.day4');
const day5 = document.querySelector('.day5');


const state = {};

async function success(position){ 
    const {latitude , longitude} = position.coords;
    state.lat = latitude;
    state.long = longitude;
    await getDataByCord();
    currentTime();
    renderResult();
};

function error() { 
    alert('unable to retrieve location');
}



window.onload = async() => { 
    if(!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(success,error);
      }
}

searchForm.addEventListener('submit', async(e) => {
    state.query = searchInput.value;
    searchInput.value = '';
    searchData();
})

const searchData = async() => { 
    if(state.query){
        try{
            currentTime();
            await getResult();
            renderResult();  
        }catch(err){
            alert('something goes wrong!');
            console.log(err);
        }
    }
}

const getDataByCity = async() => { 
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${state.query}&appid=${apiKey}`).then(e =>{ return e.json();});
    const latlong = data.city.coord;
   
    //store data in global object state
    state.lat = latlong.lat;
    state.long = latlong.lon;
    // state.data = data;
    state.Country = data.city.country;
    state.City = data.city.name;
    console.log(data);
};

const getDataByCord = async() => {
    const weatherDaily = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${state.lat}&lon=${state.long}&appid=${apiKey}`).then(e => {return e.json();});
    // console.log(weatherDaily);
    if(!state.City){
        const place = weatherDaily.timezone;
        const word = place.split('/');
        // console.log(word[1]);
        state.City = word[1];
        state.Country = word[0];
        // await getDataByCity();
    }
   

   
    //store data in global object state
    const {current, daily} = weatherDaily;
    // state.weatherDaily = weatherDaily;
    state.CurrentTemp = Math.round(current.temp-273);
    state.WeatherCondtion = current.weather[0].main;
    state.FeelsLike = Math.round(current.feels_like-273);
    state.WindSpeed = current.wind_speed;
    state.Visibility = current.visibility/1000;
    state.Humidity = current.humidity;
    state.Pressure = current.pressure;
    state.DewPoint = Math.round(current.dew_point-273);
    state.Icon = current.weather[0].icon;
    // state.backImage = current.weather[0].main;

    //5days forecast cloud icon
    state.day1CloudIcon = daily[0].weather[0].icon;
    state.day2CloudIcon = daily[1].weather[0].icon;
    state.day3CloudIcon = daily[2].weather[0].icon;
    state.day4CloudIcon = daily[3].weather[0].icon;
    state.day5CloudIcon = daily[4].weather[0].icon;

    //5 days humidity data
    state.day1Humidity = daily[0].humidity;
    state.day2Humidity = daily[1].humidity;
    state.day3Humidity = daily[2].humidity;
    state.day4Humidity = daily[3].humidity;
    state.day5Humidity = daily[4].humidity;

    //5days max temperature
    state.day1Max = Math.round(daily[0].temp.max - 273);
    state.day2Max = Math.round(daily[1].temp.max - 273);
    state.day3Max = Math.round(daily[2].temp.max - 273);
    state.day4Max = Math.round(daily[3].temp.max - 273);
    state.day5Max = Math.round(daily[4].temp.max - 273);

    //5days min temperature
    state.day1Min = Math.round(daily[0].temp.min - 273);
    state.day2Min = Math.round(daily[1].temp.min - 273);
    state.day3Min = Math.round(daily[2].temp.min - 273);
    state.day4Min = Math.round(daily[3].temp.min - 273);
    state.day5Min = Math.round(daily[4].temp.min - 273);
};


const getResult = async() => {
    // console.log(apiKey,"defined");

    //get data from api using city name

    // const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${state.query}&appid=${apiKey}`).then(e =>{ return e.json();});
    // const latlong = data.city.coord;
   
    // //store data in global object state
    // state.lat = latlong.lat;
    // state.long = latlong.lon;
    // // state.data = data;
    // state.Country = data.city.country;
    // state.City = data.city.name;

    await getDataByCity();
    await getDataByCord();

    // const weatherDaily = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${state.lat}&lon=${state.long}&appid=${apiKey}`).then(e => {return e.json();});
    // // console.log(weatherDaily);
   
    // //store data in global object state
    // const {current, daily} = weatherDaily;
    // // state.weatherDaily = weatherDaily;
    // state.CurrentTemp = Math.round(current.temp-273);
    // state.WeatherCondtion = current.weather[0].description;
    // state.FeelsLike = Math.round(current.feels_like-273);
    // state.WindSpeed = current.wind_speed;
    // state.Visibility = current.visibility/1000;
    // state.Humidity = current.humidity;
    // state.Pressure = current.pressure;
    // state.DewPoint = Math.round(current.dew_point-273);
    // state.Icon = current.weather[0].icon;

    // //5days forecast cloud icon
    // state.day1CloudIcon = daily[0].weather[0].icon;
    // state.day2CloudIcon = daily[1].weather[0].icon;
    // state.day3CloudIcon = daily[2].weather[0].icon;
    // state.day4CloudIcon = daily[3].weather[0].icon;
    // state.day5CloudIcon = daily[4].weather[0].icon;

    // //5 days humidity data
    // state.day1Humidity = daily[0].humidity;
    // state.day2Humidity = daily[1].humidity;
    // state.day3Humidity = daily[2].humidity;
    // state.day4Humidity = daily[3].humidity;
    // state.day5Humidity = daily[4].humidity;

    // //5days max temperature
    // state.day1Max = Math.round(daily[0].temp.max - 273);
    // state.day2Max = Math.round(daily[1].temp.max - 273);
    // state.day3Max = Math.round(daily[2].temp.max - 273);
    // state.day4Max = Math.round(daily[3].temp.max - 273);
    // state.day5Max = Math.round(daily[4].temp.max - 273);

    // //5days min temperature
    // state.day1Min = Math.round(daily[0].temp.min - 273);
    // state.day2Min = Math.round(daily[1].temp.min - 273);
    // state.day3Min = Math.round(daily[2].temp.min - 273);
    // state.day4Min = Math.round(daily[3].temp.min - 273);
    // state.day5Min = Math.round(daily[4].temp.min - 273);
}

const renderResult = () => { 
    // const {country,name} = state.data.city;
    const {Country,
           City,
           Hour,
           Minute,
           Timezone,
           CurrentTemp,
           WeatherCondtion,
           FeelsLike,
           WindSpeed,
           Visibility,
           Humidity,
           Pressure,
           DewPoint,
           Icon
        } = state;

        // console.log(Country);
    // console.log(state);
    ward.textContent = City;
    city.textContent = Country;
    todayTemp.innerHTML = Math.round(CurrentTemp);
    presentTime.textContent = `${Hour}:${Minute} ${Timezone}`;
    weatherCondtion.textContent = WeatherCondtion;
    feelsLike.innerHTML = `${FeelsLike} <span>&#176;</span>`;
    windSpeed.textContent = WindSpeed;
    visibility.textContent = Visibility;
    humidity.textContent = Humidity;
    pressure.textContent = Pressure;
    dewPoint.innerHTML = `${DewPoint} <span>&#176;</span>`;
    cloud.src = `http://openweathermap.org/img/wn/${Icon}@2x.png`;

    const clouds = ["Thunderstorm","Snow","Clouds","Rain","Clear","Drizzle"];
    if(clouds.includes(WeatherCondtion)){
        console.log('included');
        container.style.backgroundImage = `linear-gradient(
            to bottom right,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.4)
          ),url('../images/${WeatherCondtion}.jpg')`;
    }
    else{
        console.log('not included');
        container.style.backgroundImage = "url('../images/Clear.jpg')";
    }

    humidity1.textContent = state.day1Humidity+"%";
    humidity2.textContent = state.day2Humidity+"%";
    humidity3.textContent = state.day3Humidity+"%";
    humidity4.textContent = state.day4Humidity+"%";
    humidity5.textContent = state.day5Humidity+"%";

    maxTemp1.innerHTML = `${state.day1Max} <span>&#176;</span>`;
    maxTemp2.innerHTML = `${state.day2Max} <span>&#176;</span>`;
    maxTemp3.innerHTML = `${state.day3Max} <span>&#176;</span>`;
    maxTemp4.innerHTML = `${state.day4Max} <span>&#176;</span>`;
    maxTemp5.innerHTML = `${state.day5Max} <span>&#176;</span>`;

    minTemp1.innerHTML = `${state.day1Min} <span>&#176;</span>`;
    minTemp2.innerHTML = `${state.day2Min} <span>&#176;</span>`;
    minTemp3.innerHTML = `${state.day3Min} <span>&#176;</span>`;
    minTemp4.innerHTML = `${state.day4Min} <span>&#176;</span>`;
    minTemp5.innerHTML = `${state.day5Min} <span>&#176;</span>`;

    day1.textContent = state.Day1;
    day2.textContent = state.Day2;
    day3.textContent = state.Day3;
    day4.textContent = state.Day4;
    day5.textContent = state.Day5;

    console.log(state);
    
};

const currentTime = () => { 
    const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const date = new Date();
    state.Hour = date.getHours() > 12 ? date.getHours()-12 : date.getHours();
    state.Minute = date.getMinutes();
    date.getHours() > 12 ? state.Timezone = 'PM' : state.Timezone = 'AM';
    
    state.Day1 = day[date.getDay()];
    state.Day2 = day[date.getDay()+1];
    state.Day3 = day[date.getDay()+2];
    state.Day4 = day[date.getDay()+3];
    state.Day5 = day[date.getDay()+4];
}

// console.log(state);
