import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
];

const NatureSlider = () => {

  const [index, setIndex] = useState(0);

  // автослайд
  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="nature">

      <div className="container slider-div">

        <h2 className="nature-title">
          Beautiful nature
        </h2>

        <div className="slider">

          {images.map((img, i) => {

            let position = i - index;

            if (position < -2)
              position += images.length;

            if (position > 2)
              position -= images.length;

            return (

              <img
                key={i}
                src={img}
                alt="nature"
                className={`slide position-${position}`}
              />
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default NatureSlider;