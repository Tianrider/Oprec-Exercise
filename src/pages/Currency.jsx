import "../style/Currency.css";
import { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";

const Currency = () => {
  const [result, setResult] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD"); // default value = USD
  const [targetCurrency, setTargetCurrency] = useState("IDR"); // default value = IDR
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(1); // default value = 1
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (baseCurrency === targetCurrency) {
      setResult("Please select different currencies");
      return;
    }

    getExchangeRate(baseCurrency, targetCurrency);

    let resultValue = 0;
    if (baseCurrency === "BTC" || targetCurrency === "BTC") {
      resultValue = Number(amount * exchangeRate).toLocaleString(undefined, {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      });
    } else {
      resultValue = Number(amount * exchangeRate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    setResult(`${amount} ${baseCurrency} = ${resultValue} ${targetCurrency}`);
  }, [baseCurrency, targetCurrency, amount, exchangeRate]);

  const getExchangeRate = async (selectedBaseCurrency,selectedTargetCurrency) => {
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectedBaseCurrency.toLowerCase()}.json`;
    const response = await fetch(url);
    const data = await response.json();
    selectedBaseCurrency = selectedBaseCurrency.toLowerCase();

    let exchangeRate = data[selectedBaseCurrency][selectedTargetCurrency.toLowerCase()];
    let lastUpdated = data.date;
    setExchangeRate(exchangeRate);
    setLastUpdated(lastUpdated);
  };

  return (
    <div className="Currency">
      {/* home button */}
      <nav className="fixed-top">
        <a href="/Oprec-Exercise/">
          <RiHomeLine className="home-button" />
        </a>
      </nav>

      {/* Blob Background */}
      <div className="slider-thumb container-fluid"></div>

      {/* Title */}
      <div className="title-container position-absolute text-center fixed-top pt-3 mt-5">
        <h1 className="title">CuConTer</h1>
        <p className="text-light">Currrency Converter</p>
      </div>

      <form
        className="row g-4 align-items-center position-absolute start-50 translate-middle text-center form"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Amount Input */}
        <div
          className="container-fluid input-container"
          onChange={(e) => setAmount(e.target.value)}
        >
          <input
            type="text"
            className="form-control"
            id="amount_one"
            placeholder="Amount"
          ></input>
        </div>

        {/* Currency Selection */}
        <div className="row text-center d-flex justify-content-center select-container">
          <div className="col-2 d-flex justify-content-center">
            <select
              className="form-select-one form-select"
              defaultValue="USD"
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              <option value="IDR">IDR</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          <div className="col-1 d-flex justify-content-center align-content-center">
            <img
              className="arrow-img"
              src="https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png"
            />
          </div>

          <div className="col-2 d-flex justify-content-center">
            <select
              className="form-select-two form-select"
              onChange={(e) => setTargetCurrency(e.target.value)}
              defaultValue="IDR"
            >
              <option value="IDR">IDR</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
        </div>

        {/* Exchange Rate and Result */}
        <div className="result-text-container">
          <h6 className="result-text">Current Exchange Rate: </h6>
          <p className="font-weight-light font-italic text-white">{`last updated (${lastUpdated})`}</p>
          <h6 className="result-text">{`1 ${baseCurrency} = ${exchangeRate.toFixed(6)} ${targetCurrency}`}</h6>
        </div>

        <div className="col-12 submit-button">
          <h3 className="result-text">
            {result !== null ? result : "Waiting for you...."}
          </h3>
        </div>
      </form>
    </div>
  );
};

export default Currency;
