const WeeklyForecast = ({ forecast, city }) => {

  const dailyData =
    forecast.list.filter(
      (_, index) => index % 8 === 0
    );

  return (
    

    <section className="weekly">

      <div className="container weekly-div">

        <h2 className="weekly-title">
          5-day forecast
        </h2>

        <div className="weekly-list">

          {dailyData.map((day) => {

            const date = new Date(
              day.dt * 1000
            );

            const formattedDate =
              date.toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }
              );

            const icon =
              `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

            return (

              <div
                key={day.dt}
                className="weekly-item"
              >

                <p className="weekly-date">
                  {formattedDate}
                </p>

                <div className="weekly-center">

                  <img
                    src={icon}
                    alt="weather"
                  />

                  <p className="weekly-temp">
                    {Math.round(day.main.temp_max)}
                    /
                    {Math.round(day.main.temp_min)}
                    °C
                  </p>

                </div>

                <p className="weekly-desc">
                  {day.weather[0].description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default WeeklyForecast;