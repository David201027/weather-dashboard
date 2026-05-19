import React from "react";
import temp from  "../images/det-temp.svg"
import hum from  "../images/det-hum.svg"
import presure from  "../images/det-pre.svg"
import wind from  "../images/det-wind.svg"
import vis from  "../images/det-vis.svg"

const WeatherDetails = ({ city, onClose }) => {
  return (
  <div className={`details ${city ? "open" : ""}`}>

    {city && (
      <div className="container details-div">
        <div className="grid">

          <div className="details-item">
            <p>Feels like</p>
            <h3>{city.main.feels_like}°C</h3>
            <img src={temp} alt="" />
          </div>

          <div className="details-item details-temp">
            <p>Min °C</p>
            <h3>{city.main.temp_min}°C</h3>

            <p>Max °C</p>
            <h3>{city.main.temp_max}°C</h3>
          </div>

          <div className="details-item">
            <p>Humidity</p>
            <h3>{city.main.humidity}%</h3>
            <img src={hum} alt="" />
          </div>

          <div className="details-item">
            <p>Pressure</p>
            <h3>{city.main.pressure} hPa</h3>
            <img src={presure} alt="" />
          </div>

          <div className="details-item">
            <p>Wind</p>
            <h3>{city.wind.speed} m/s</h3>
            <img src={wind} alt="" />
          </div>

          <div className="details-item">
            <p>Visibility</p>
            <h3>{city.visibility / 1000} km</h3>
            <img src={vis} alt="" />
          </div>

        </div>
      </div>
    )}

  </div>
);
};

export default WeatherDetails;