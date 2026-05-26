import { useState, useEffect } from "react";
import "./css/App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import WeatherChart from "./components/WeatherChart";
import WeeklyForecast from "./components/WeeklyForecast";
import Animals from "./components/Animals";
import NatureSlider from "./components/NatureSlider";
import Footer from "./components/Footer";

import {
  getWeather,
  getForecast,
} from "./services/weatherApi";

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Считываем сохраненные города при загрузке
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(saved);
  }, []);

  // Сохраняем список городов при изменении
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  // Считываем пользователя при загрузке
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // ИСПРАВЛЕНО: Считываем избранное для вошедшего юзера или для гостя (guest)
  useEffect(() => {
    const allFav = JSON.parse(localStorage.getItem("favorites")) || {};
    const activeKey = currentUser ? currentUser.email : "guest";
    setFavorites(allFav[activeKey] || []);
  }, [currentUser]);

  // Дефолтные города
  useEffect(() => {
    const loadDefaultCities = async () => {
      const saved = JSON.parse(localStorage.getItem("cities"));
      if (saved && saved.length > 0) return;

      try {
        const london = await getWeather("London");
        const paris = await getWeather("Paris");
        const newYork = await getWeather("New York");

        setCities([london, paris, newYork]);
      } catch (error) {
        console.log(error);
      }
    };
    loadDefaultCities();
  }, []);

  const addCity = async (cityName) => {
    try {
      const data = await getWeather(cityName);
      const exists = cities.find(
        (c) => c.name.toLowerCase() === cityName.toLowerCase()
      );
      if (exists) return;
      setCities((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCity = (id) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  const refreshCity = async (cityName) => {
    const updated = await getWeather(cityName);
    setCities((prev) =>
      prev.map((c) => (c.name === cityName ? updated : c))
    );
  };

  const showForecast = async (cityName) => {
    if (forecastData?.city?.name === cityName) {
      setForecastData(null);
      return;
    }
    const data = await getForecast(cityName);
    setForecastData(data);
    setWeeklyForecast(null);
  };

  const showWeeklyForecast = async (cityName) => {
    if (weeklyForecast?.city?.name === cityName) {
      setWeeklyForecast(null);
      return;
    }
    const data = await getForecast(cityName);
    setWeeklyForecast(data);
    setForecastData(null);
  };

  // ИСПРАВЛЕНО: Теперь переключение работает ВСЕГДА и сохраняется в localStorage
  const toggleFavorite = (cityName) => {
    const allFav = JSON.parse(localStorage.getItem("favorites")) || {};
    const activeKey = currentUser ? currentUser.email : "guest";
    const userFav = allFav[activeKey] || [];

    let updated = [];

    if (userFav.includes(cityName)) {
      updated = userFav.filter((c) => c !== cityName);
    } else {
      updated = [...userFav, cityName];
    }

    allFav[activeKey] = updated;
    localStorage.setItem("favorites", JSON.stringify(allFav));
    setFavorites(updated);
  };

  const toggleDetails = (city) => {
    if (selectedCity?.id === city.id) {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
  };

  const sortedCities = [
    ...cities.filter((c) => favorites.includes(c.name)),
    ...cities.filter((c) => !favorites.includes(c.name)),
  ];

  return (
    <div>
      <Header />
      <Hero onSearch={addCity} />

      <section className="cards">
        <div className="container cards-div">
          {sortedCities.map((city) => (
            <WeatherCard
              key={city.id}
              city={city}
              onDelete={removeCity}
              onSelect={toggleDetails}
              onRefresh={refreshCity}
              onForecast={showForecast}
              onWeeklyForecast={showWeeklyForecast}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(city.name)}
              selectedCity={selectedCity}
              isWeeklyOpen={weeklyForecast?.city?.name === city.name}
              isHourlyOpen={forecastData?.city?.name === city.name}
            />
          ))}
        </div>
      </section>

      <div className={`forecast-section ${forecastData ? "open" : ""}`}>
        <div className="container hourly-forcast">
          {forecastData && (
            <>
              <h2 className="forecast-title">Hourly Forecast</h2>
              <WeatherChart forecast={forecastData} />
            </>
          )}
        </div>
      </div>

      <section className={`weekly-section ${weeklyForecast ? "open" : ""}`}>
        <div className="container">
          {weeklyForecast && <WeeklyForecast forecast={weeklyForecast} />}
        </div>
      </section>

      <WeatherDetails city={selectedCity} />
      <Animals />
      <NatureSlider />
      <Footer />
    </div>
  );
}

export default App;