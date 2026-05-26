import React from "react";
import { formatWeeklyDate } from "../utils/dateFormatter";
import { getWeatherIconUrl } from "../utils/weatherHelpers";

const WeeklyForecast = ({ forecast }) => {
  const dailyData = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <section className="weekly">
      <div className="container weekly-div">
        <h2 className="weekly-title">5-day forecast</h2>
        <div className="weekly-list">
          {dailyData.map((day) => (
            <div key={day.dt} className="weekly-item">
              <p className="weekly-date">{formatWeeklyDate(day.dt)}</p>
              <div className="weekly-center">
                <img src={getWeatherIconUrl(day.weather[0].icon)} alt="weather" />
                <p className="weekly-temp">
                  {Math.round(day.main.temp_max)}/{Math.round(day.main.temp_min)}°C
                </p>
              </div>
              <p className="weekly-desc">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyForecast;