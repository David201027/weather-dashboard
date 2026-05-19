import { useState } from "react";
import reload from '../images/reload-card.svg'
import noFavorite from '../images/no-fav-card.svg'
import del from '../images/del-card.svg'

const WeatherCard = ({
  city,
  onDelete,
  onSelect,
  onRefresh,
  onForecast,
  onToggleFavorite,
  isFavorite,
  selectedCity,
  onWeeklyForecast,
  isWeeklyOpen,
  isHourlyOpen,
}) => {

  const localTime = new Date(
    Date.now() + city.timezone * 1000
  );
  const time = localTime.toUTCString().slice(17, 22);
  const day = localTime.toLocaleDateString("en-US", {
    weekday: "long",

  });
  const fullDate = localTime.toLocaleDateString();

  const icon = city.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className={`card ${isFavorite ? "favorite" : ""}`}>

      <div className="card-top">
        <p>{city.name}</p>
        <p>{city.sys.country}</p>
      </div>

      <h1 className="card-time">{time}</h1>

      <div className="forecast-buttons">

        <button
          className="hourly-btn"
          onClick={() => onForecast(city.name)}
          >
            {isHourlyOpen
            ? "Close"
            : "Hourly forecast"}
        </button>

        <button
          className="weekly-btn"
          onClick={() => onWeeklyForecast(city.name)}
          >
            {isWeeklyOpen
            ? "Close"
            : "Weekly forecast"}
        </button>

      </div>

      <div className="card-date">
        <p>{fullDate}</p>
        <span>|</span>
        <p>{day}</p>
      </div>

      <img
        className="weather-icon"
        src={iconUrl}
        alt="weather"
      />

      <h2 className="temperature">
        {Math.round(city.main.temp)}°C
      </h2>

      <div className="card-actions">

        <button onClick={() => onRefresh(city.name)}>
          <img src={reload} alt="reload" />
        </button>

        <button onClick={() => onToggleFavorite(city.name)}>
          <img
            src={isFavorite ? del : noFavorite}
            alt="favorite"
          />
        </button>

        <button
          className="see-more-btn"
          onClick={() => onSelect(city)}
        >
          {selectedCity?.id === city.id
            ? "Close"
            : "See more"}
        </button>

        <button onClick={() => onDelete(city.id)}>
          <img src={del} alt="delete" />
        </button>

      </div>
    </div>
  );
};

export default WeatherCard;