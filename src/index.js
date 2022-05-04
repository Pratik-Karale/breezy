import "./style.css";


let temperatureElem;
let humidityElem;
let windSpeedElem
let pressureElem
let placeElem
let weatherImageElem
let weatherCard={remove:()=>{}};

const API_KEY="1977debf2877a0be6ba449dd01ada2ce"

const mainElem=document.querySelector(".main-container")
const searchInput=document.querySelector("#search-input")
const searchBtn=document.querySelector("#search-btn")


const textHtmlWeatherCard=`
        <div class="weather-card">
            <h1 data-info="place"></h1>
            <img src="" alt="weather-img">
            <div class="weather-info">Temperature: <span data-info="temperature"></span></div>
            <div class="weather-info">Pressure: <span data-info="pressure"></span></div>
            <div class="humidity">Humidity: <span data-info="humidity"></span></div>
            <div class="wind-speed">Wind-speed: <span data-info="wind-speed"></span></div>
        </div>
`

searchBtn.addEventListener("click",async()=>{
    const inputText=searchInput.value
    if(inputText=="")return;
    weatherCard.remove()
    

    const queryCity=inputText;
    let weatherInfo;
    try{
        weatherInfo=await getWeatherInfo(queryCity)
    }catch(e){
        console.log(e)
        loadFailureCard();
        return;
    }

    insTemplateWeatherCard()
    insWeatherInfo(weatherInfo)
})

function toHtml(text){
    const tempDiv=document.createElement("div")
    tempDiv.innerHTML=text
    return tempDiv.querySelector("*:first-child")
}

// update element variables and add weather card
function insTemplateWeatherCard(){
    weatherCard=toHtml(textHtmlWeatherCard)
    mainElem.appendChild(weatherCard)

    temperatureElem=document.querySelector("[data-info='temperature']")
    humidityElem=document.querySelector("[data-info='humidity']")
    windSpeedElem=document.querySelector("[data-info='wind-speed']")
    pressureElem=document.querySelector("[data-info='pressure']")
    placeElem=document.querySelector(`[data-info="place"]`)
    weatherImageElem=document.querySelector(".weather-card img")
}


// insert weather info and weather image src into the DOM elems
function insWeatherInfo(weatherInfo){
    temperatureElem.textContent=weatherInfo.temperature
    humidityElem.textContent=weatherInfo.humidity
    windSpeedElem.textContent=weatherInfo.wind
    pressureElem.textContent=weatherInfo.pressure
    weatherImageElem.src=weatherInfo.imgUrl
    placeElem.textContent=weatherInfo.place
}

// fetch weather details from external api and filter useful parts
function getWeatherInfo(city){
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
                .then(resp=>resp.json()).then(data=>{
                    return {
                        temperature:data.main.temp,
                        humidity:data.main.pressure,
                        wind:data.wind.speed,
                        pressure:data.main.pressure,
                        imgUrl:`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
                        place:`${data.name}, ${data.sys.country}`
                    }
                })
}


function loadFailureCard(){
    weatherCard=toHtml(`
    <div class="weather-card">
        <h1>Nothing Found!</h1>
        <img src="https://c.tenor.com/T4gJU0BY2KgAAAAC/rick-and.gif">
    </div>
`)
    mainElem.appendChild(weatherCard)
}