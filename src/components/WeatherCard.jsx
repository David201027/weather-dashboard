import React from "react";
import reload from '../images/reload-card.svg';
import del from '../images/del-card.svg';

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
  const localTime = new Date(Date.now() + city.timezone * 1000);
  const time = localTime.toUTCString().slice(17, 22);
  const day = localTime.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = localTime.toLocaleDateString();

  const icon = city.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const heartEmpty = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  
  const heartFilled = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23e74c3c" stroke="%23e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

  return (
    <div className={`card ${isFavorite ? "favorite" : ""}`}>
      <div className="card-top">
        <p>{city.name}</p>
        <p>{city.sys.country}</p>
      </div>

      <h1 className="card-time">{time}</h1>

      <div className="forecast-buttons">
        <button className="hourly-btn" onClick={() => onForecast(city.name)}>
          {isHourlyOpen ? "Close" : "Hourly forecast"}
        </button>
        <button className="weekly-btn" onClick={() => onWeeklyForecast(city.name)}>
          {isWeeklyOpen ? "Close" : "Weekly forecast"}
        </button>
      </div>

      <div className="card-date">
        <p>{fullDate}</p>
        <span>|</span>
        <p>{day}</p>
      </div>

      <img className="weather-icon" src={iconUrl} alt="weather" />

      <h2 className="temperature">{Math.round(city.main.temp)}°C</h2>

      <div className="card-actions">
        <button onClick={() => onRefresh(city.name)}>
          <img src={reload} alt="reload" />
        </button>

        <button onClick={() => onToggleFavorite(city.name)}>
          <img
            src={isFavorite ? heartFilled : heartEmpty}
            alt="favorite"
          />
        </button>

        <button className="see-more-btn" onClick={() => onSelect(city)}>
          {selectedCity?.id === city.id ? "Close" : "See more"}
        </button>

        <button onClick={() => onDelete(city.id)}>
          <img src={del} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;