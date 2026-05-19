import { useState } from "react";
import search from '../images/hero-search.svg'

const Hero = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(city);
        setCity("");
    };

    return (
        <section className="hero">
            <div className="container hero-div">
                <h1 className="hero-title">Weather dashboard</h1>

                <div className="hero-text-div">

                    <p className="hero-text">Create your personal list of favorite cities and always be aware of the weather.</p>

                    <div className="hero-line"></div>

                    <p className="hero-date">
                        {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                            weekday: "long",
                            day: "numeric",
                        })}
                    </p>

                </div>

                <form className="hero-form" onSubmit={handleSubmit}>
                    <input
                        className="hero-input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search location..."
                    />
                    <button className="hero-button" type="submit"><img src={search} alt="search" /></button>
                </form>
            </div>
        </section>
    );
};

export default Hero;