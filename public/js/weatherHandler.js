$(document).ready(() => {
    const API_KEY = "0263f433a04fed1051f0fad6061e06fe";

    let hcmQuery = document.getElementById("hcm").innerHTML;
    let hnQuery = document.getElementById("hn").innerHTML;

    // Fetch to get Ho Chi Minh weather data
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${hcmQuery}&units=metrics&appid=${API_KEY}`
        )
        .then((response) => response.json())
        .then((result) => {
            $("#hcmWeather").append(`
                <div>
                    <span>
                        ${result.sys.country}
                    </span>
                    <span>
                        ${Math.round(result.main.temp) / 10}
                        <sup>&deg;C</sup>
                    </span>
                </div>
                <img
                    src="https://openweathermap.org/img/wn/${
                        result.weather[0].icon
                    }@2x.png"
                />
                <p>${result.weather[0].description}</p>
            `);
        })
        .catch((error) => console.log(error));

    // Fetch to get Ha Noi weather data
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${hnQuery}&units=metrics&appid=${API_KEY}`
        )
        .then((response) => response.json())
        .then((result) => {
            $("#hnWeather").append(`
                <div>
                    <span>
                        ${result.sys.country}
                    </span>
                    <span>
                        ${Math.round(result.main.temp) / 10}
                        <sup>&deg;C</sup>
                    </span>
                </div>
                <img
                    src="https://openweathermap.org/img/wn/${
                        result.weather[0].icon
                    }@2x.png"
                />
                <p>${result.weather[0].description}</p>
            `);
        })
        .catch((error) => console.log(error));
});