import axios from "axios";
import { useEffect, useState } from "react";
import "./Countries.css";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "25px" }}>Loading...</h2>
    );
  }

  return (
    <div
      style={{
        gap: "18px",
        marginTop: "25px",
        marginBottom: "25px",
        display: "flex",
        "flex-wrap": "wrap",
        justifyContent: "center",
      }}
    >
      {countries.map((country, index) => (
        <div
          key={index}
          style={{
            gap: "4px",
            height: "auto",
            width: "175px",
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            "border-radius": "8px",
            border: "1px solid #E4E4E4",
            "box-shadow": "0 3px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={country.flag}
            alt={`Flag of ${country.abbr}`}
            style={{
              width: "85px",
              height: "85px",
              paddingTop: "12px",
              borderRadius: "5px",
            }}
          />

          <h3 style={{ paddingLeft: "6px", paddingRight: "6px" }}>
            {country.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Countries;
