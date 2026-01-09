import React, { useEffect, useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('Amsterdam');
  const [country, setCountry] = useState('NL');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to get weather theme based on condition
  const getWeatherTheme = (condition) => {
    const text = condition?.text?.toLowerCase() || '';

    if (text.includes('sunny') || text.includes('clear')) {
      return {
        gradient: 'from-yellow-300 via-orange-400 to-red-400',
        emoji: '☀️'
      };
    } else if (text.includes('rain') || text.includes('drizzle')) {
      return {
        gradient: 'from-slate-600 via-blue-700 to-indigo-800',
        emoji: '🌧️'
      };
    } else if (text.includes('snow') || text.includes('sleet')) {
      return {
        gradient: 'from-blue-100 via-blue-300 to-blue-400',
        emoji: '❄️'
      };
    } else if (text.includes('thunder') || text.includes('storm')) {
      return {
        gradient: 'from-purple-900 via-indigo-800 to-slate-900',
        emoji: '⛈️'
      };
    } else if (text.includes('cloud') || text.includes('overcast')) {
      return {
        gradient: 'from-gray-400 via-slate-500 to-blue-600',
        emoji: '☁️'
      };
    } else if (text.includes('mist') || text.includes('fog')) {
      return {
        gradient: 'from-gray-300 via-slate-400 to-gray-500',
        emoji: '🌫️'
      };
    } else if (text.includes('partly')) {
      return {
        gradient: 'from-sky-400 via-blue-400 to-indigo-500',
        emoji: '⛅'
      };
    }

    // Default sunny theme
    return {
      gradient: 'from-sky-400 via-blue-400 to-indigo-500',
      emoji: '🌤️'
    };
  };

  const weatherTheme = weatherData?.condition ? getWeatherTheme(weatherData.condition) : getWeatherTheme(null);

  const fetchWeatherData = async () => {
    setErrorMessage('');

    const apiKey = import.meta.env.VITE_WEATHERAPI_KEY;
    if (!apiKey) {
      setErrorMessage('API-sleutel ontbreekt in .env bestand');
      return;
    }

    setLoading(true);
    try {
      const location = `${city},${country}`;
      const days = 3;
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
          location
        )}&days=${days}&aqi=no&alerts=no`
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      setWeatherData(data.current ?? null);
      setForecastData(data.forecast?.forecastday ?? []);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setErrorMessage('Kon weergegevens niet laden. Controleer stad en landcode.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weatherTheme.gradient} relative overflow-hidden transition-all duration-1000`}>
      {/* Floating clouds animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/30 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-40 h-20 bg-white/25 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-36 h-18 bg-white/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-44 h-22 bg-white/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        {/* Sun/Moon effect */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-300 rounded-full blur-md opacity-80 animate-pulse-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        {/* Hero header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-6">
            <span className="text-7xl md:text-9xl drop-shadow-lg animate-bounce-slow">{weatherTheme.emoji}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-white drop-shadow-2xl">
            Weer Nu
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
            Live weersverwachtingen binnen handbereik
          </p>
        </div>

        {/* Search bar */}
        <div className="backdrop-blur-lg bg-white/90 rounded-3xl p-6 mb-10 shadow-2xl border-2 border-white/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="🏙️ Voer stad in"
              className="w-full rounded-2xl bg-white border-2 border-blue-200 px-5 py-4 outline-none focus:border-blue-500 transition-all text-gray-800 placeholder:text-gray-400 shadow-sm font-medium"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeatherData()}
            />
            <input
              type="text"
              placeholder="🌍 Landcode"
              className="w-full rounded-2xl bg-white border-2 border-blue-200 px-5 py-4 outline-none focus:border-blue-500 transition-all text-gray-800 placeholder:text-gray-400 shadow-sm font-medium"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeatherData()}
            />
            <button
              type="button"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-4 font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl text-white"
              onClick={fetchWeatherData}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Laden...
                </span>
              ) : (
                '🔍 Zoeken'
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMessage ? (
          <div className="mb-8 rounded-3xl bg-red-50 border-2 border-red-300 p-5 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <span className="font-bold text-red-700">{errorMessage}</span>
            </div>
          </div>
        ) : null}

        {/* Current weather card */}
        {weatherData && !loading ? (
          <div className="mb-10 rounded-3xl bg-white/95 backdrop-blur-lg p-8 shadow-2xl border-2 border-white/50 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {weatherData?.condition?.icon ? (
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-40"></div>
                    <img
                      src={weatherData.condition.icon}
                      alt="Weather icon"
                      className="w-32 h-32 md:w-40 md:h-40 relative z-10 drop-shadow-2xl"
                    />
                  </div>
                </div>
              ) : null}

              <div className="flex-1">
                <div className="text-blue-600 text-sm font-bold mb-2 uppercase tracking-wider">Huidig Weer</div>
                <div className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                  {city}, {country}
                </div>
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3 mb-6">
                  <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600">
                    {weatherData.temp_c}°
                  </div>
                  <div className="text-2xl md:text-3xl text-gray-700 font-bold pb-3">
                    {weatherData?.condition?.text}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-5 py-3 bg-blue-100 rounded-full border-2 border-blue-200 shadow-sm">
                    <span className="text-xl">💧</span>
                    <span className="text-blue-900 font-bold">{weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-indigo-100 rounded-full border-2 border-indigo-200 shadow-sm">
                    <span className="text-xl">💨</span>
                    <span className="text-indigo-900 font-bold">{weatherData.wind_kph} km/u</span>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-purple-100 rounded-full border-2 border-purple-200 shadow-sm">
                    <span className="text-xl">🌡️</span>
                    <span className="text-purple-900 font-bold">Voelt als {weatherData.feelslike_c}°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Forecast cards */}
        {forecastData.length > 0 && !loading ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-8 flex items-center gap-3">
              <span className="text-4xl">📅</span>
              <span>3-Daagse Voorspelling</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {forecastData.map((day, idx) => (
                <div
                  key={day.date}
                  className="group rounded-3xl bg-white/95 backdrop-blur-lg p-6 shadow-xl border-2 border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-gray-500 text-sm font-bold mb-3 uppercase tracking-wider">
                    {new Date(day.date).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                  <div className="flex items-center gap-4 mb-5">
                    {day?.day?.condition?.icon ? (
                      <img
                        src={day.day.condition.icon}
                        alt="Forecast icon"
                        className="w-20 h-20 drop-shadow-xl"
                      />
                    ) : null}
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 font-semibold mb-2">{day.day.condition.text}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">🔥</span>
                          <span className="text-2xl font-black text-orange-600">{day.day.maxtemp_c}°</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-lg">❄️</span>
                          <span className="text-2xl font-black text-blue-600">{day.day.mintemp_c}°</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-600 border-t-2 border-gray-200 pt-3">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">💧</span>
                      {day.day.avghumidity}%
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">💨</span>
                      {day.day.maxwind_kph} km/u
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Loading state */}
        {loading ? (
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <svg className="animate-spin h-16 w-16 text-blue-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-700 font-bold text-lg">Weergegevens ophalen...</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
