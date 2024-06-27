const input = document.getElementById('city-input')
const submit = document.querySelector('.submit')
submit.addEventListener('click', function(e) {
    e.preventDefault()
    getWeatherData(input.value)
})
async function getWeatherData(location) {
    try {
    const weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=973bf25b6ed14106835134638242606&q=${location}&aqi=no`,
    {mode: 'cors'});
    const rawData = await weather.json()
    console.log('raw', rawData)
    const weatherObj = dataProcessor(rawData)
    console.log('obj', weatherObj)
    }
    catch {
        (function (err) {
            alert(err)
        })
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

    }

    return weatherObject

}

function countryProcessor(rawData) {
    const country = rawData.location.country
    console.log('country', country)
}

// display info from weather object on the page and style the page
