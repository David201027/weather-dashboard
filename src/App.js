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

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("cities")) || [];

    setCities(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cities",
      JSON.stringify(cities)
    );
  }, [cities]);

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const allFav =
      JSON.parse(localStorage.getItem("favorites")) || {};

    setFavorites(
      allFav[currentUser.email] || []
    );
  }, [currentUser]);

  useEffect(() => {

    const loadDefaultCities = async () => {

      const saved =
        JSON.parse(localStorage.getItem("cities"));

      if (saved && saved.length > 0) return;

      try {

        const london =
          await getWeather("London");

        const paris =
          await getWeather("Paris");

        const newYork =
          await getWeather("New York");

        setCities([
          london,
          paris,
          newYork,
        ]);

      } catch (error) {
        console.log(error);
      }
    };

    loadDefaultCities();

  }, []);

  const addCity = async (cityName) => {

    try {

      const data =
        await getWeather(cityName);

      // проверка на дубликаты
      const exists = cities.find(
        (c) =>
          c.name.toLowerCase() ===
          cityName.toLowerCase()
      );

      if (exists) return;

      setCities((prev) => [...prev, data]);

    } catch (error) {
      console.log(error);
    }
  };

  const removeCity = (id) => {

    setCities(
      cities.filter((c) => c.id !== id)
    );
  };

  const refreshCity = async (cityName) => {

    const updated =
      await getWeather(cityName);

    setCities((prev) =>
      prev.map((c) =>
        c.name === cityName
          ? updated
          : c
      )
    );
  };

const showForecast = async (cityName) => {

  if (
    forecastData?.city?.name === cityName
  ) {
    setForecastData(null);
    return;
  }

  const data =
    await getForecast(cityName);

  setForecastData(data);

  setWeeklyForecast(null);
};

  const showWeeklyForecast = async (
  cityName
) => {

  if (
    weeklyForecast?.city?.name === cityName
  ) {
    setWeeklyForecast(null);
    return;
  }

  const data =
    await getForecast(cityName);

  setWeeklyForecast(data);

  // закрываем hourly
  setForecastData(null);
};

  const toggleFavorite = (cityName) => {

    if (!currentUser) return;

    const allFav =
      JSON.parse(localStorage.getItem("favorites")) || {};

    const userFav =
      allFav[currentUser.email] || [];

    let updated = [];

    if (userFav.includes(cityName)) {

      updated = userFav.filter(
        (c) => c !== cityName
      );

    } else {

      updated = [...userFav, cityName];
    }

    allFav[currentUser.email] = updated;

    localStorage.setItem(
      "favorites",
      JSON.stringify(allFav)
    );

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

    ...cities.filter((c) =>
      favorites.includes(c.name)
    ),

    ...cities.filter(
      (c) =>
        !favorites.includes(c.name)
    ),
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

              onWeeklyForecast={
                showWeeklyForecast
              }

              onToggleFavorite={
                toggleFavorite
              }

              isFavorite={favorites.includes(
                city.name
              )}

              selectedCity={selectedCity}

              isWeeklyOpen={
                weeklyForecast?.city?.name === city.name
              }

              isHourlyOpen={
                  forecastData?.city?.name === city.name
              }
            />
          ))}

        </div>

      </section>


      {forecastData && (

        <div className="forecast-section">

          <div className="container hourly-forcast">

            <div className="forecast-header">

              <h2 className="forecast-title">
                Hourly Forecast
              </h2>
            </div>

            <WeatherChart
              forecast={forecastData}
            />

          </div>

        </div>
      )}


      {weeklyForecast && (

        <section className="weekly-section">

          <div className="container">
            <WeeklyForecast
              forecast={weeklyForecast}
            />

          </div>

        </section>
      )}


      <WeatherDetails
        city={selectedCity}
      />

      <Animals />

      <NatureSlider />

      <Footer/>

    </div>
  );
}

export default App;