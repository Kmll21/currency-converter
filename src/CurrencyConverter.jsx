// CurrencyConverter.jsx
import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("RUB");
  const [amount, setAmount] = useState(1);
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => {
        const fetchedCurrencies = ["RUB", ...Object.keys(data.Valute)];
        setCurrencies(fetchedCurrencies);
        if (baseCurrency && targetCurrency) {
          setConversionRate(
            calculateRate(data, baseCurrency, targetCurrency)
          );
        }
      })
      .catch((error) => console.error("Ошибка загрузки курсов валют:", error));
  }, [baseCurrency, targetCurrency]);

  const calculateRate = (data, from, to) => {
    if (from === "RUB") return 1 / data.Valute[to]?.Value;
    if (to === "RUB") return data.Valute[from]?.Value / data.Valute[from]?.Nominal;
    return (
      (data.Valute[from]?.Value / data.Valute[from]?.Nominal) / (data.Valute[to]?.Value / data.Valute[to]?.Nominal) || null
    );
  };

  const handleConversion = () => {
    if (!conversionRate) return "Некорректный курс";
    return (amount * conversionRate).toFixed(2);
  };

  return (
    <div className="currency-converter">
      <div className="converter-box">
        <input
          type="number"
          className="amount-input"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Сумма"
        />
        <select
          className="currency-select"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          className="currency-select"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <p className="conversion-result">
        {amount} {baseCurrency} ={" "}
        <span className="result-highlight">{handleConversion()}</span>{" "}
        {targetCurrency}
      </p>
    </div>
  );
};

export default CurrencyConverter;