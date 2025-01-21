import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyRates from "./CurrencyRates";
import "./App.css";

const App = () => {
  return (
    <div className="telegram-app">
      <header className="header">
         <h5>Конвертер валют по текущему курсу ЦБ РФ</h5>
      </header>
      <main className="content">
        <CurrencyConverter />
        <CurrencyRates />
      </main>
    </div>
  );
};

export default App;