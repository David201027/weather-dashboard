import { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
];

const NatureSlider = () => {
  const [index, setIndex] = useState(0);

  const setAsCenter = (clickedIndex) => {
    if (clickedIndex === index) return;
    
    setIndex(clickedIndex);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="nature">
      <div className="container slider-div">
        <h2 className="nature-title">Beautiful nature</h2>

        <div className="slider-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
          
          <button className="slider-arrow left-arrow" onClick={prevSlide}>&#10094;</button>

          <div className="slider">
            {IMAGES.map((img, i) => {
              let position = i - index;

              if (position < -2) position += IMAGES.length;
              if (position > 2) position -= IMAGES.length;

              return (
                <div
                  key={i}
                  className={`slide position-${position}`}
                  onClick={() => setAsCenter(i)}
                  style={{ 
                    cursor: position === 0 ? "default" : "pointer",
                    filter: position === 0 ? "none" : "brightness(0.8)"
                  }} 
                >
                  <img src={img} alt={`nature-${i}`} />
                </div>
              );
            })}
          </div>

          {/* Стрелка Вправо */}
          <button className="slider-arrow right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>
    </section>
  );
};

export default NatureSlider;