import React from "react";
import DetailItem from "./DetailItem"; // Импортируем наш атом

// Импорт иконок
import temp from "../images/det-temp.svg";
import hum from "../images/det-hum.svg";
import presure from "../images/det-pre.svg";
import wind from "../images/det-wind.svg";
import vis from "../images/det-vis.svg";

const WeatherDetails = ({ city }) => {
  if (!city) return <div className="details"></div>;

  // Массив данных: убираем кашу из JSX, превращаем в чистые структуры данных
  const itemsConfig = [
    { id: "feels", title: "Feels like", value: `${city.main.feels_like}°C`, icon: temp },
    { id: "minmax", isMinMax: true }, // Пометка для кастомного блока температуры
    { id: "humidity", title: "Humidity", value: `${city.main.humidity}%`, icon: hum },
    { id: "pressure", title: "Pressure", value: `${city.main.pressure} hPa`, icon: presure },
    { id: "wind", title: "Wind", value: `${city.wind.speed} m/s`, icon: wind },
    { id: "visibility", title: "Visibility", value: `${city.visibility / 1000} km`, icon: vis },
  ];

  return (
    <div className={`details ${city ? "open" : ""}`}>
      <div className="container details-div">
        <div className="grid">
          {itemsConfig.map((item) => {
            // Если это блок минимальной/максимальной температуры — рендерим его кастомно
            if (item.isMinMax) {
              return (
                <div key={item.id} className="details-item details-temp">
                  <p>Min °C</p>
                  <h3>{city.main.temp_min}°C</h3>
                  <p>Max °C</p>
                  <h3>{city.main.temp_max}°C</h3>
                </div>
              );
            }

            // Для всех остальных стандартных блоков вызываем наш мелкий DetailItem
            return (
              <DetailItem
                key={item.id}
                title={item.title}
                value={item.value}
                icon={item.icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;