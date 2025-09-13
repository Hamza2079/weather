let data;

async function getWeatherData(city) {
	try {
		let response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=6fa8670006b64a83a0e125406251209&q=${city}&days=4&aqi=no&alerts=no`
		);
		data = await response.json();
		displaydata();
	} catch (err) {
		console.error("Error fetching weather:", err);
	}
}

navigator.geolocation.getCurrentPosition(
	(position) => {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		getWeatherData(`${lat},${lon}`);
	},
	(error) => {
		console.error(error);
		// fallback
		getWeatherData("Cairo");
	}
);
function displaydata() {
	document
		.getElementById("weatherIcon")
		.setAttribute("alt", data.current.condition.text);
	document
		.getElementById("weatherIcon")
		.setAttribute("src", "https:" + data.current.condition.icon);
	document.getElementById("currentLocation").innerHTML =
		data.location.name + ", " + data.location.country;
	document.getElementById("weatherDescription").innerHTML =
		data.current.condition.text;
	document.getElementById("currentTemp").innerHTML = data.current.temp_c + "°";
	document.getElementById("currentDate").innerHTML =
		new Date().toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	document.getElementById("visibility").innerHTML = data.current.vis_km + "km";
	document.getElementById("humidity").innerHTML = data.current.humidity + "%";
	document.getElementById("windSpeed").innerHTML =
		data.current.wind_kph + "km/h";
	document.getElementById("pressure").innerHTML =
		data.current.pressure_mb + "mb";
	document.getElementById("feelsLike").innerHTML =
		data.current.feelslike_c + "°c";
	document.getElementById("uvIndex").innerHTML = data.current.uv;
	document.getElementById("chanceOfRain").innerHTML =
		data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
	let box = ``;
	for (let i = 1; i < data.forecast.forecastday.length; i++) {
		box += `
            <div class="col-md-4 col-lg-2-4">
                            <div class="forecast-card text-center">
								<div class="fw-bold mb-2">${new Date(
									data.forecast.forecastday[i].date
								).toLocaleDateString("en-US", { weekday: "long" })}</div>
                                <img src="https:${
																																	data.forecast.forecastday[i].day.condition.icon
																																}" alt="${
			data.forecast.forecastday[i].day.condition.text
		}" class="mb-2" />
                                <div class="mb-2">
                                    <span class="fw-bold">${
																																					data.forecast.forecastday[i].day
																																						.maxtemp_c + "°"
																																				}</span>
                                    <span class="text-muted">/${
																																					data.forecast.forecastday[i].day
																																						.mintemp_c + "°"
																																				}</span>
                                </div>
                                <small class="text-muted">${
																																	data.forecast.forecastday[i].day.condition.text
																																}</small>
                            </div>
                        </div>
            `;
	}
	document.getElementById("forecastContainer").innerHTML = box;
}
function searchWeather() {
	const searchcity = document.getElementById("cityInput").value;
	getWeatherData(searchcity);
}

