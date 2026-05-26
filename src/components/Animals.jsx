import { useEffect, useState, useRef } from "react";
import Button from "./ui/Button";
import { formatBreedName } from "../utils/weatherHelpers"; // Импортируем утилиту

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/image/random/4");
      const data = await response.json();

      const newAnimals = data.message.map((img) => ({
        id: crypto.randomUUID(),
        image: img,
        // Используем вынесенную утилиту вместо каши из split и map прямо здесь
        text: `This beautiful ${formatBreedName(img)} is looking for a new home.`,
      }));

      setAnimals((prev) => [...prev, ...newAnimals]);
    } catch (e) {
      console.error("Animal loading error:", e);
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

        <Button className="animals-btn" onClick={loadAnimals} disabled={loading}>
          {loading ? "Loading..." : "Show more"}
        </Button>
      </div>
    </section>
  );
};

export default Animals;