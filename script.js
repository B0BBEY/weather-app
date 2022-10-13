const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=3f76d79e4da3ad151ac0ab63b2b18519'
const API_UNITS = '&units=metric'
const API_LANG = '&lang=pl'

const API_MAP_LINK = 'https://api.tomtom.com/map/1/tile/basic/main/10/22/22.png?tileSize=256&view=Unified&language=NGT&key=hctkcGGqPpYlFs33RybdeGCZ8aWwP37Z'


const getWeather = () => {
    const city = input.value || 'Warszawa'
    const URL = API_LINK + city + API_KEY + API_LANG + API_UNITS

    axios.get(URL).then(res => {

        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const weatherId = res.data.weather[0].id

        const lat = res.data.coord.lat
        const lon = res.data.coord.lon

         cityName.textContent = res.data.name 
         temperature.textContent = Math.floor(temp) + '°C'
         humidity.textContent = hum + '%'
         weather.textContent = res.data.weather[0].main

         warning.textContent = ''
         input.value = ''

         if (weatherId >= 200 && weatherId < 300) {
            photo.setAttribute('src', 'img/thunderstorm.png')
         } else if (weatherId >= 300 && weatherId < 400) {
            photo.setAttribute('src', 'img/drizzle.png')
         } else if (weatherId >= 500 && weatherId < 600) {
            photo.setAttribute('src', 'img/rain.png')
         } else if (weatherId >= 600 && weatherId < 700) {
            photo.setAttribute('src', 'img/ice.png')
         } else if (weatherId >= 700 && weatherId < 800) {
            photo.setAttribute('src', 'img/fog.png')
         } else if (weatherId === 800 ) {
            photo.setAttribute('src', 'img/sun.png')
         } else if (weatherId > 800 && weatherId < 900) {
            photo.setAttribute('src', 'img/cloud.png')
         } else {
            photo.setAttribute('src', 'img/unknown.png')
         }


         var map = tt.map({
            key: 'hctkcGGqPpYlFs33RybdeGCZ8aWwP37Z',
            container: 'map',
            center: [lon, lat],
            zoom: 11
        });

    }).catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta!' )
     
}

const enterCheck = (e) => {
   if(e.key === 'Enter'){
      getWeather()
   }
}

button.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)
getWeather()
