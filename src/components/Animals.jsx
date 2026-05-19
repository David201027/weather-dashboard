import { useEffect, useState, useRef } from "react";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const isInitialMount = useRef(true);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/image/random/4");
      const data = await response.json();

      const newAnimals = data.message.map((img) => {
        const breedRaw = img.split("/")[4]; 
        const breedName = breedRaw
          .split("-")
          .reverse()
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          id: crypto.randomUUID(),
          image: img,
          text: `This beautiful ${breedName} is looking for a new home and a caring owner.`,
        };
      });

      setAnimals((prev) => [...prev, ...newAnimals]);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      loadAnimals();
      isInitialMount.current = false; 
    }
  }, []);

  return (
    <section className="animals">
      <div className="container animals-container">
        <h2 className="animals-title">Interacting with our pets</h2>

        <div className="animals-grid">
          {animals.map((animal) => (
            <div key={animal.id} className="animal-card">
              <img src={animal.image} alt="dog" className="animal-image" />
              <p className="animal-text">{animal.text}</p>
            </div>
          ))}
        </div>

        <button 
          className="animals-btn" 
          onClick={loadAnimals} 
          disabled={loading}
        >
          {loading ? "Loading..." : "See more"}
        </button>
      </div>
    </section>
  );
};

export default Animals;
