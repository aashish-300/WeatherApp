const apiKey = 'bfef3cff51ce592165a333da5021e77f';

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

const state = {};

searchForm.addEventListener('submit', async(e) => {
    state.query = searchInput.value;
    console.log(state.query);

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
  
})

const getResult = async() => {
    console.log(apiKey,"defined");

    //get data from api using city name
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${state.query}&appid=${apiKey}`).then(e =>{ return e.json();});
    const latlong = data.city.coord;
   
    //store data in global object state
    state.lat = latlong.lat;
    state.long = latlong.lon;
    // state.data = data;
    state.Country = data.city.country;
    state.City = data.city.name;

    const weatherDaily = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${state.lat}&lon=${state.long}&appid=${apiKey}`).then(e => {return e.json();});
    console.log(weatherDaily);
   
    //store data in global object state
    const {current} = weatherDaily;
    // state.weatherDaily = weatherDaily;
    state.CurrentTemp = Math.round(current.temp-273);
    state.WeatherCondtion = current.weather[0].description;
    state.FeelsLike = Math.round(current.feels_like-273);
    state.WindSpeed = current.wind_speed;
    state.Visibility = current.visibility/1000;
    state.Humidity = current.humidity;
    state.Pressure = current.pressure;
    state.DewPoint = Math.round(current.dew_point-273);
    state.Icon = current.weather[0].icon;
    
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

    ward.textContent = City;
    city.textContent = Country;
    todayTemp.textContent = Math.round(CurrentTemp);
    presentTime.textContent = `${Hour}:${Minute} ${Timezone}`;
    weatherCondtion.textContent = WeatherCondtion;
    feelsLike.textContent = FeelsLike;
    windSpeed.textContent = WindSpeed;
    visibility.textContent = Visibility;
    humidity.textContent = Humidity;
    pressure.textContent = Pressure;
    dewPoint.textContent = DewPoint;
    cloud.src = `http://openweathermap.org/img/wn/${Icon}@2x.png`;
};

const currentTime = () => { 
    const date = new Date();
    state.Hour = date.getHours() > 12 ? date.getHours()-12 : date.getHours();
    state.Minute = date.getMinutes();
    date.getHours() > 12 ? state.Timezone = 'PM' : state.Timezone = 'AM';
}
console.log(state);
