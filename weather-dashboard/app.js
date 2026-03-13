// ============================================
// Weather Dashboard - Main Application
// ============================================

class WeatherDashboard {
    constructor() {
        // API Configuration
        this.apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
        this.apiBaseUrl = 'https://api.openweathermap.org/data/2.5';
        this.unit = 'metric'; // Celsius (use 'imperial' for Fahrenheit)

        // DOM Elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.currentWeatherDiv = document.getElementById('currentWeather');
        this.weatherDetailsDiv = document.getElementById('weatherDetails');
        this.forecastContainer = document.getElementById('forecastContainer');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');

        // Event Listeners
        this.searchBtn.addEventListener('click', () => this.searchCity());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchCity();
        });

        // Load default city on startup
        this.loadWeather('London');
    }

    /**
     * Fetch weather data for a city
     */
    async loadWeather(city) {
        try {
            this.clearError();
            this.showLoading();

            // Fetch current weather
            const currentResponse = await fetch(
                `${this.apiBaseUrl}/weather?q=${city}&appid=${this.apiKey}&units=${this.unit}`
            );

            if (!currentResponse.ok) {
                throw new Error('City not found');
            }

            const currentData = await currentResponse.json();

            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `${this.apiBaseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=${this.unit}`
            );

            const forecastData = await forecastResponse.json();

            // Render data
            this.displayCurrentWeather(currentData);
            this.displayWeatherDetails(currentData);
            this.displayForecast(forecastData);

        } catch (error) {
            this.showError(error.message || 'Failed to fetch weather data');
            console.error('Error:', error);
        }
    }

    /**
     * Search for a city
     */
    searchCity() {
        const city = this.searchInput.value.trim();
        if (city) {
            this.loadWeather(city);
            this.searchInput.value = '';
        }
    }

    /**
     * Display current weather
     */
    displayCurrentWeather(data) {
        const { main, weather, name, sys, wind } = data;
        const temp = Math.round(main.temp);
        const feelsLike = Math.round(main.feels_like);
        const description = weather[0].main;
        const icon = this.getWeatherIcon(weather[0].main);

        const html = `
            <div class="current-info">
                <div class="weather-icon">
                    ${icon}
                </div>
                <div class="weather-main">
                    <div class="location">${name}, ${sys.country}</div>
                    <div class="temperature">${temp}°C</div>
                    <div class="description">${description}</div>
                    <div style="font-size: 0.95rem; opacity: 0.8;">
                        Feels like ${feelsLike}°C
                    </div>
                </div>
            </div>
        `;

        this.currentWeatherDiv.innerHTML = html;
    }

    /**
     * Display weather details cards
     */
    displayWeatherDetails(data) {
        const { main, wind, clouds, sys } = data;
        const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const details = [
            {
                icon: '<i class="fas fa-tint"></i>',
                label: 'Humidity',
                value: `${main.humidity}%`
            },
            {
                icon: '<i class="fas fa-wind"></i>',
                label: 'Wind Speed',
                value: `${Math.round(wind.speed)} m/s`
            },
            {
                icon: '<i class="fas fa-compress"></i>',
                label: 'Pressure',
                value: `${main.pressure} mb`
            },
            {
                icon: '<i class="fas fa-eye"></i>',
                label: 'Visibility',
                value: `${(data.visibility / 1000).toFixed(1)} km`
            },
            {
                icon: '<i class="fas fa-cloud"></i>',
                label: 'Cloudiness',
                value: `${clouds.all}%`
            },
            {
                icon: '<i class="fas fa-sun"></i>',
                label: 'Sunrise',
                value: sunrise
            },
            {
                icon: '<i class="fas fa-moon"></i>',
                label: 'Sunset',
                value: sunset
            },
            {
                icon: '<i class="fas fa-arrow-up"></i>',
                label: 'Max Temp',
                value: `${Math.round(main.temp_max)}°C`
            }
        ];

        const html = details.map(detail => `
            <div class="detail-card">
                ${detail.icon}
                <div class="detail-label">${detail.label}</div>
                <div class="detail-value">${detail.value}</div>
            </div>
        `).join('');

        this.weatherDetailsDiv.innerHTML = html;
    }

    /**
     * Display 5-day forecast
     */
    displayForecast(data) {
        const forecasts = {};

        // Group forecast by day
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });

            if (!forecasts[date]) {
                forecasts[date] = [];
            }
            forecasts[date].push(item);
        });

        // Get one forecast per day (middle of the day)
        const forecastDays = Object.entries(forecasts).slice(0, 5).map(([date, items]) => {
            const midIndex = Math.floor(items.length / 2);
            const item = items[midIndex];

            return {
                date,
                temp: Math.round(item.main.temp),
                description: item.weather[0].main,
                icon: this.getWeatherIcon(item.weather[0].main)
            };
        });

        const html = forecastDays.map(forecast => `
            <div class="forecast-card">
                <div class="forecast-date">${forecast.date}</div>
                <div class="forecast-icon">${forecast.icon}</div>
                <div class="forecast-temp">${forecast.temp}°C</div>
                <div class="forecast-desc">${forecast.description}</div>
            </div>
        `).join('');

        this.forecastContainer.innerHTML = html;
    }

    /**
     * Map weather conditions to emoji/icons
     */
    getWeatherIcon(condition) {
        const iconMap = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '💨',
            'Haze': '🌫️',
            'Dust': '🌪️',
            'Fog': '🌫️',
            'Sand': '🌪️',
            'Ash': '💨',
            'Squall': '💨',
            'Tornado': '🌪️'
        };

        return iconMap[condition] || '🌤️';
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.currentWeatherDiv.innerHTML = `
            <div class="weather-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading weather data...</p>
            </div>
        `;
    }

    /**
     * Show error message
     */
    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.style.display = 'flex';
        this.currentWeatherDiv.innerHTML = '';
        this.weatherDetailsDiv.innerHTML = '';
        this.forecastContainer.innerHTML = '';
    }

    /**
     * Clear error message
     */
    clearError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});