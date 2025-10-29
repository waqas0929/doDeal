import { useState, useEffect } from "react";
import { backgroundImage } from "../constants/assets";
// Weather Icons
import sunIcon from "../assets/sun.svg";
import sunAndCloudIcon from "../assets/sunAndCloud.svg";
import rainyIcon from "../assets/rainy (1).svg";
import stormIcon from "../assets/storm.png";
import reelFeelIcon from "../assets/reelFeel.svg";
import chanceToRainIcon from "../assets/chanceToRain.svg";
import windIcon from "../assets/wind.svg";
import uvIndexIcon from "../assets/UVIndex.png";

const Weather = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState("Dubai");

  // OpenWeatherMap API Key - replace with your own key or use environment variable
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "your_api_key_here";
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || "";
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return rainyIcon;
    } else if (
      conditionLower.includes("storm") ||
      conditionLower.includes("thunder")
    ) {
      return stormIcon;
    } else if (conditionLower.includes("clear")) {
      return sunIcon;
    } else if (conditionLower.includes("cloud")) {
      return sunAndCloudIcon;
    }
    return sunAndCloudIcon;
  };

  // Fetch current weather
  const fetchCurrentWeather = async (city) => {
    if (!API_KEY || API_KEY === "your_api_key_here") {
      setError(
        "Please add your OpenWeatherMap API key in .env file (VITE_WEATHER_API_KEY)"
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 404) {
          throw new Error(
            "City not found. Please check the city name and try again."
          );
        } else if (response.status === 401) {
          throw new Error("Invalid API key. Please check your .env file.");
        } else {
          throw new Error(errorData.message || "Failed to fetch weather data");
        }
      }

      const data = await response.json();

      // Fetch forecast data
      try {
        const forecastResponse = await fetch(
          `${BASE_URL}/forecast?q=${encodeURIComponent(
            city
          )}&appid=${API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch forecast");
        }

        const forecastData = await forecastResponse.json();

        // Fetch UV Index (requires different endpoint with lat/lon)
        let uvIndex = 0;
        try {
          const uvResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`
          );
          if (uvResponse.ok) {
            const uvData = await uvResponse.json();
            uvIndex = uvData.value || 0;
          }
        } catch (uvErr) {
          // UV index is optional, continue without it
          console.warn("UV index fetch failed:", uvErr);
        }

        setWeatherData({
          current: data,
          forecast: forecastData,
          uvIndex: uvIndex,
        });
        setCurrentCity(data.name);
        setSearchQuery(""); // Clear search after successful fetch
      } catch {
        // If forecast fails but current weather works, still show current weather
        setWeatherData({
          current: data,
          forecast: null,
          uvIndex: 0,
        });
        setCurrentCity(data.name);
        setError("Current weather loaded, but forecast unavailable");
      }
    } catch (err) {
      setError(
        err.message || "Failed to fetch weather data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchCurrentWeather(searchQuery.trim());
    }
  };

  // Initial load
  useEffect(() => {
    fetchCurrentWeather(currentCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate hourly forecast from API data
  const hourlyForecast = weatherData?.forecast?.list
    ? weatherData.forecast.list.slice(0, 6).map((item) => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const ampm = hours >= 12 ? "PM" : "AM";
        const hour12 = hours % 12 || 12;
        return {
          time: `${hour12}:00 ${ampm}`,
          icon: getWeatherIcon(item.weather[0].main),
          temp: Math.round(item.main.temp),
        };
      })
    : [
        { time: "6:00 AM", icon: sunAndCloudIcon, temp: 26 },
        { time: "9:00 AM", icon: sunAndCloudIcon, temp: 28 },
        { time: "12:00 PM", icon: sunIcon, temp: 33 },
        { time: "3:00 PM", icon: sunIcon, temp: 36 },
        { time: "6:00 PM", icon: sunAndCloudIcon, temp: 30 },
        { time: "9:00 PM", icon: sunAndCloudIcon, temp: 28 },
      ];

  // Air conditions from API data
  const airConditions = weatherData
    ? [
        {
          label: "Real Feel",
          value: `${Math.round(weatherData.current.main.feels_like)}°`,
          icon: reelFeelIcon,
          align: "left",
        },
        {
          label: "Wind",
          value: `${(weatherData.current.wind.speed * 3.6).toFixed(1)} Km/H`,
          icon: windIcon,
          align: "right",
        },
        {
          label: "Chance To Rain",
          value: weatherData.current.rain
            ? `${Math.round((weatherData.current.rain["1h"] || 0) * 10)}%`
            : "0%",
          icon: chanceToRainIcon,
          align: "left",
        },
        {
          label: "UV Index",
          value: `${Math.round(weatherData.uvIndex)}`,
          icon: uvIndexIcon,
          align: "right",
        },
      ]
    : [
        { label: "Real Feel", value: "30°", icon: reelFeelIcon, align: "left" },
        { label: "Wind", value: "0.2 Km/H", icon: windIcon, align: "right" },
        {
          label: "Chance To Rain",
          value: "0%",
          icon: chanceToRainIcon,
          align: "left",
        },
        { label: "UV Index", value: "3", icon: uvIndexIcon, align: "right" },
      ];

  // Weekly forecast from API data - grouped by day for 10 days
  const weeklyForecast = weatherData?.forecast?.list
    ? (() => {
        // Group forecasts by day
        const groupedByDay = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        weatherData.forecast.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          date.setHours(0, 0, 0, 0);
          const dayKey = date.getTime();

          if (!groupedByDay[dayKey]) {
            groupedByDay[dayKey] = {
              date: date,
              temps: [],
              conditions: [],
            };
          }
          groupedByDay[dayKey].temps.push(
            item.main.temp_max,
            item.main.temp_min
          );
          groupedByDay[dayKey].conditions.push(item.weather[0]);
        });

        // Convert to array and sort by date
        const daysArray = Object.values(groupedByDay)
          .sort((a, b) => a.date - b.date)
          .slice(0, 10)
          .map((dayData, index) => {
            const maxTemp = Math.round(Math.max(...dayData.temps));
            const minTemp = Math.round(Math.min(...dayData.temps));
            const mostCommonCondition =
              dayData.conditions[Math.floor(dayData.conditions.length / 2)];
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayName = index === 0 ? "Today" : days[dayData.date.getDay()];

            return {
              day: dayName,
              icon: getWeatherIcon(mostCommonCondition.main),
              condition: mostCommonCondition.main,
              temp: `${maxTemp}/${minTemp}`,
            };
          });

        return daysArray;
      })()
    : [
        { day: "Today", icon: sunIcon, condition: "Sunny", temp: "36/22" },
        {
          day: "Tue",
          icon: sunAndCloudIcon,
          condition: "Cloudy",
          temp: "37/21",
        },
        { day: "Wed", icon: rainyIcon, condition: "Rainy", temp: "35/23" },
        { day: "Thu", icon: rainyIcon, condition: "Rainy", temp: "34/22" },
        { day: "Fri", icon: sunIcon, condition: "Sunny", temp: "36/24" },
        {
          day: "Sat",
          icon: sunAndCloudIcon,
          condition: "Cloudy",
          temp: "38/25",
        },
        { day: "Sun", icon: stormIcon, condition: "Storm", temp: "33/21" },
        { day: "Mon", icon: sunIcon, condition: "Sunny", temp: "35/23" },
        {
          day: "Tue",
          icon: sunAndCloudIcon,
          condition: "Cloudy",
          temp: "34/22",
        },
        { day: "Wed", icon: rainyIcon, condition: "Rainy", temp: "32/20" },
      ];

  // Check if it's currently raining
  const isRaining = weatherData
    ? (() => {
        const condition = weatherData.current.weather[0].main.toLowerCase();
        const hasRainCondition =
          condition.includes("rain") ||
          condition.includes("drizzle") ||
          condition.includes("thunderstorm");
        const hasRainData =
          weatherData.current.rain && weatherData.current.rain["1h"] > 0;
        return hasRainCondition || hasRainData;
      })()
    : false;

  // Generate rain drops for animation
  const generateRainDrops = () => {
    const drops = [];
    const dropCount = isRaining ? 100 : 0;

    for (let i = 0; i < dropCount; i++) {
      const left = Math.random() * 100; // Random horizontal position
      const delay = Math.random() * 2; // Random delay for natural effect
      const duration = 0.8 + Math.random() * 0.4; // Random speed between 0.8-1.2s
      const intensity = Math.random();

      let className = "rain-drop";
      if (intensity > 0.7) {
        className += " heavy";
      } else if (intensity < 0.3) {
        className += " light";
      }

      drops.push({
        id: i,
        left: `${left}%`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        className: className,
      });
    }

    return drops;
  };

  const rainDrops = generateRainDrops();

  return (
    <section
      id="weather"
      className="py-20 md:py-32 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Rain Animation Overlay */}
      {isRaining && (
        <div className="rain-overlay">
          {rainDrops.map((drop) => (
            <div
              key={drop.id}
              className={drop.className}
              style={{
                left: drop.left,
                animationDelay: drop.delay,
                animationDuration: drop.duration,
              }}
            />
          ))}
        </div>
      )}
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          {/* CTA Button */}
          <button
            className="px-6 py-2.5 sm:px-8 sm:py-3 md:px-12 md:py-4 rounded-full font-medium text-sm sm:text-base md:text-lg transition-all relative overflow-hidden mb-4 sm:mb-6 md:mb-8"
            style={{
              border: "0.5px solid rgba(0, 174, 107, 0.5)",
              backgroundColor: "transparent",
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            {/* Bottom glow/shadow effect - internal illumination from bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 opacity-20"
              style={{
                height: "60%",
                background:
                  "linear-gradient(to top, rgba(0, 174, 107, 0.3) 0%, rgba(0, 174, 107, 0.1) 50%, transparent 100%)",
                filter: "blur(6px)",
                borderRadius: "9999px",
              }}
            />
            <span className="relative z-10">Look At Our Services</span>
          </button>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 px-2">
            <span
              className="text-white"
              style={{ color: "rgba(255, 255, 255, 1)" }}
            >
              Explore Our{" "}
            </span>
            <span className="text-primary-green">Weather</span>
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4"
            style={{ color: "rgba(224, 224, 224, 1)" }}
          >
            With DODEAL, Your Goals Are Our Mission. From Ground Breaking
            Marketing Campaigns To Seamless Tech Integrations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Search and Current Weather */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search Cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch(e);
                    }
                  }}
                  className="flex-1 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white/90 placeholder-white/60 focus:outline-none transition-colors"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)",
                    border: "none",
                  }}
                />
                <button
                  type="submit"
                  className="bg-primary-green text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-medium text-sm sm:text-base hover:opacity-90 transition-opacity whitespace-nowrap"
                  disabled={loading || !searchQuery.trim()}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </form>

            {/* Current Weather Display */}
            {loading ? (
              <div className="bg-primary-dark/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div>
                    <div className="h-8 w-48 bg-white/10 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-20 w-32 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-20 w-20 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="bg-primary-dark/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      {weatherData
                        ? `${weatherData.current.name}, ${weatherData.current.sys.country}`
                        : currentCity}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">
                      Chance Of Rain :{" "}
                      {weatherData?.current.rain
                        ? `${Math.round(
                            (weatherData.current.rain["1h"] || 0) * 10
                          )}%`
                        : "0%"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mt-2">
                    {weatherData
                      ? `${Math.round(weatherData.current.main.temp)}°`
                      : "31°"}
                  </div>
                  <div className="flex items-center justify-end">
                    <img
                      src={
                        weatherData
                          ? getWeatherIcon(weatherData.current.weather[0].main)
                          : sunIcon
                      }
                      alt={
                        weatherData
                          ? weatherData.current.weather[0].main
                          : "Weather"
                      }
                      className="w-16 h-16 sm:w-24 sm:h-20 md:w-32 md:h-32"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Today Forecast - Separate Box */}
            <div
              className="bg-primary-dark/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 mb-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)",
                border: "none",
              }}
            >
              <h4
                className="text-lg font-semibold mb-4 uppercase"
                style={{ color: "rgba(203, 190, 187, 1)" }}
              >
                TODAY FORECAST
              </h4>
              {loading ? (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center pb-4"
                    >
                      <div className="h-3 w-12 sm:w-16 bg-white/10 rounded mb-2 animate-pulse"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-8 sm:w-10 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-6">
                  {hourlyForecast.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center pb-4"
                        style={{
                          borderRight:
                            index < hourlyForecast.length - 1
                              ? "1px solid rgba(0, 174, 107, 0.2)"
                              : "none",
                        }}
                      >
                        <p
                          className="text-xs mb-2"
                          style={{ color: "rgba(203, 190, 187, 1)" }}
                        >
                          {item.time}
                        </p>
                        <img
                          src={item.icon}
                          alt="Weather"
                          className="w-6 h-6 md:w-8 md:h-8 mb-2"
                        />
                        <p className="text-white text-sm md:text-base font-medium">
                          {item.temp}°
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Air Conditions - Separate Box */}
            <div
              className="bg-primary-dark/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 relative"
              style={{
                background:
                  "linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)",
                border: "none",
              }}
            >
              <button className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary-green text-white text-xs px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium">
                See More
              </button>
              <h4 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4 uppercase">
                AIR CONDITIONS
              </h4>
              {loading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/10 rounded animate-pulse"></div>
                      <div>
                        <div className="h-4 w-20 bg-white/10 rounded mb-2 animate-pulse"></div>
                        <div className="h-5 w-16 bg-white/10 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {airConditions.map((condition, index) => {
                    const isRightAlign = condition.align === "right";
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 ${
                          isRightAlign ? "justify-end" : ""
                        }`}
                      >
                        <img
                          src={condition.icon}
                          alt={condition.label}
                          className="w-5 h-5"
                        />
                        <div>
                          <p className="text-white/70 text-xs md:text-sm">
                            {condition.label}
                          </p>
                          <p className="text-white text-base md:text-lg font-semibold">
                            {condition.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - 10 Days Forecast */}
          <div
            className="lg:col-span-1 rounded-3xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)",
              border: "none",
            }}
          >
            <div className="bg-primary-dark/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <h4
                className="text-lg sm:text-xl font-bold mb-4 sm:mb-6"
                style={{ color: "rgba(203, 190, 187, 1)" }}
              >
                7- DAYS FORECAST
              </h4>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-primary-green/20 last:border-0"
                    >
                      <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <div className="w-8 h-8 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-white/10 rounded animate-pulse"></div>
                      </div>
                      <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {weeklyForecast.map((day, index) => {
                    const [highTemp, lowTemp] = day.temp.split("/");
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-primary-green/20 last:border-0"
                      >
                        {/* Day Name - Left */}
                        <p
                          className="font-medium text-sm md:text-base"
                          style={{ color: "rgba(203, 190, 187, 1)" }}
                        >
                          {day.day}
                        </p>
                        {/* Icon and Condition - Center */}
                        <div className="flex items-center gap-2 flex-1 justify-center">
                          <img
                            src={day.icon}
                            alt={day.condition}
                            className="w-6 h-6 md:w-8 md:h-8"
                          />
                          <p className="text-white text-xs md:text-sm">
                            {day.condition}
                          </p>
                        </div>
                        {/* Temperature - Right */}
                        <div className="text-sm md:text-base font-semibold">
                          <span className="text-white">{highTemp}</span>
                          <span className="text-white">/</span>
                          <span style={{ color: "rgba(203, 190, 187, 1)" }}>
                            {lowTemp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
