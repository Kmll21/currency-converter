// CurrencyRates.jsx
import React, { useState, useEffect } from "react";
import "./CurrencyRates.css";

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => {
        setRates(Object.entries(data.Valute));
      })
      .catch((error) =>
        console.error("Ошибка загрузки курсов валют:", error)
      );
  }, []);

  return (
    <div className="currency-rates">
      <ul className="rates-list">
        {rates.map(([key, value]) => (
          <li key={key} className="rate-item">
            <div className="rate-info">
              <span className="rate-currency">{key}</span>
              <span className="rate-name">{value.Name}</span>
            </div>
            <span className="rate-value">{value.Value.toFixed(2)} ₽</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyRates;