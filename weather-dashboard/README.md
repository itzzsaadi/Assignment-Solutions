# Weather Dashboard

A responsive weather dashboard application that fetches real-time weather data from the OpenWeatherMap API.

## Features

✨ **Real-time Weather Data**
- Current weather conditions for any city
- Current temperature, feels like temperature, and description
- Detailed weather metrics (humidity, wind speed, pressure, visibility, etc.)
- Sunrise and sunset times

📅 **5-Day Forecast**
- Daily weather predictions
- Temperature trends
- Weather conditions preview

🎨 **Modern UI/UX**
- Responsive design (works on desktop, tablet, mobile)
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Intuitive search functionality

🔍 **Search Functionality**
- Search weather by city name
- Real-time error handling
- Autocomplete support (can be enhanced)

## Prerequisites

- A free OpenWeatherMap API key
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

## Getting Started

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### 2. Setup

1. Clone or download this project
2. Open `app.js`
3. Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key:

```javascript
this.apiKey = 'your_actual_api_key_here';
```

### 3. Run

Simply open `index.html` in your web browser:

```bash
# Option 1: Direct file open
open index.html

# Option 2: Using a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Project Structure

```
weather-dashboard/
├── index.html       # HTML structure
├── style.css        # Styling and responsive design
├── app.js          # JavaScript logic and API calls
└── README.md       # This file
```

## How It Works

1. **Search**: Enter a city name and click search or press Enter
2. **Current Weather**: See real-time weather conditions with temperature and description
3. **Details**: View detailed metrics like humidity, wind speed, pressure, etc.
4. **Forecast**: Check the 5-day weather forecast
5. **Responsive**: The dashboard adapts to different screen sizes

## API Information

- **API Provider**: [OpenWeatherMap](https://openweathermap.org/)
- **Endpoints Used**:
  - `/weather` - Current weather data
  - `/forecast` - 5-day forecast data
- **Free Tier Limits**: 60 calls/minute, 1,000,000 calls/month
- **Units**: Metric (Celsius) - Can be changed to Imperial in `app.js`

## Customization

### Change Temperature Unit

In `app.js`, change the `unit` property:

```javascript
this.unit = 'imperial'; // For Fahrenheit
```

### Add More Weather Details

Edit the `displayWeatherDetails()` method to add more metrics.

### Customize Colors

Edit the CSS gradient colors in `style.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] Geolocation support (auto-detect user location)
- [ ] Favorites/Bookmarks
- [ ] Weather alerts
- [ ] Hourly forecast
- [ ] Multiple weather API support
- [ ] Local storage for search history
- [ ] Theme switcher (dark/light mode)
- [ ] Weather maps integration

## Troubleshooting

### "City not found" error
- Check the city spelling
- Try using the full city name (e.g., "New York" instead of just "York")

### No data displayed
- Verify your API key is correct
- Check your internet connection
- Ensure you have API calls remaining in your free tier quota

### API Key Error
- Make sure you've replaced the placeholder with your actual API key
- Verify the API key is active in your OpenWeatherMap dashboard

## Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Font Awesome Icons](https://fontawesome.com/)

## License

This project is open source and available for educational purposes.

## Author

Created as a weather dashboard solution.

---

**Note**: This is a free API with rate limits. For production use, consider upgrading to a paid plan.