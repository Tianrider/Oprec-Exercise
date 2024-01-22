import "../style/Temperature.css";
import { RiHomeLine } from "react-icons/ri";
import { createRef, useState } from "react";

const Temperature = () => {
  const baseTempRef = createRef();
  const targetTempRef = createRef();
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState(null);
  const [status, setStatus] = useState(null);

  const handleButtonClick = () => {
    setResult("");

    let value = parseFloat(document.getElementById("amount_one").value);
    let selectedBaseTemp = baseTempRef.current.value;
    let selectedTargetTemp = targetTempRef.current.value;

    if (selectedBaseTemp === selectedTargetTemp) {
      setResult("Please select different temperature");
      return;
    }

    setStatus("Calculating..");
    let result = tempConverter(value, selectedBaseTemp, selectedTargetTemp);

    // manual delay :/
    setTimeout(() => {
      setStatus(null);
      setEquation("Result: ");
      setResult(
        `${value} °${selectedBaseTemp} = ${result} °${selectedTargetTemp}`
      );
    }, 2000);
  };

  // Hard coded temperature converter
  const tempConverter = (value, selectedBaseTemp, selectedTargetTemp) => {
    if (selectedBaseTemp == "K") {
      if (selectedTargetTemp == "C") {
        setEquation(`${value} - 273.15`);
        return value - 273.15;
      } else if (selectedTargetTemp == "F") {
        setEquation(`(${value} - 273.15) * 9/5 + 32`);
        return ((value - 273.15) * 9) / 5 + 32;
      } else if (selectedTargetTemp == "R") {
        setEquation(`(${value} - 273.15) * 4/5`);
        return ((value - 273.15) * 4) / 5;
      }
    } else if (selectedBaseTemp == "C") {
      if (selectedTargetTemp == "K") {
        setEquation(`${value} + 273.15`);
        return value + 273.15;
      } else if (selectedTargetTemp == "F") {
        setEquation(`${value} * 9/5 + 32`);
        return (value * 9) / 5 + 32;
      } else if (selectedTargetTemp == "R") {
        setEquation(`${value} * 4/5`);
        return (value * 4) / 5;
      }
    } else if (selectedBaseTemp == "F") {
      if (selectedTargetTemp == "K") {
        setEquation(`(${value} - 32) * 5/9 + 273.15`);
        return ((value - 32) * 5) / 9 + 273.15;
      } else if (selectedTargetTemp == "C") {
        setEquation(`(${value} - 32) * 5/9`);
        return ((value - 32) * 5) / 9;
      } else if (selectedTargetTemp == "R") {
        setEquation(`(${value} - 32) * 4/9`);
        return ((value - 32) * 4) / 9;
      }
    } else if (selectedBaseTemp == "R") {
      if (selectedTargetTemp == "K") {
        setEquation(`${value} * 5/4 + 273.15`);
        return (value * 5) / 4 + 273.15;
      } else if (selectedTargetTemp == "C") {
        setEquation(`${value} * 5/4`);
        return (value * 5) / 4;
      } else if (selectedTargetTemp == "F") {
        setEquation(`${value} * 9/4 + 32`);
        return (value * 9) / 4 + 32;
      }
    }
  };

  return (
    <div className="temperature">
      {/* Home Button */}
      <nav className="fixed-top">
        <a href="/Oprec-Exercise/">
          <RiHomeLine className="home-button"></RiHomeLine>
        </a>
      </nav>

      {/* Blob Background */}
      <div className="slider-thumb container-fluid"></div>

      {/* Title */}
      <div className="title-container position-absolute text-center fixed-top pt-3 mt-5">
        <h1 className="title">TemConTor</h1>
        <p className="text-light">Temperature Converter</p>
      </div>

      <form
        className="row g-4 align-items-center position-absolute start-50 translate-middle text-center form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="container-fluid input-container">
          <input
            type="text"
            className="form-control"
            id="amount_one"
            placeholder="Amount"
          ></input>
        </div>

        <div className="row text-center d-flex justify-content-center select-container">
          <div className="col-2 d-flex justify-content-center">
            <select
              className="form-select-one form-select"
              ref={baseTempRef}
              defaultValue={"C"}
            >
              <option value="K">°K(Kelvin)</option>
              <option value="C">°C(Celcius)</option>
              <option value="F">°F(Fahrenheit)</option>
              <option value="R">°Re(Reamur)</option>
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
              ref={targetTempRef}
              defaultValue={"F"}
            >
              <option value="K">°K(Kelvin)</option>
              <option value="C">°C(Celcius)</option>
              <option value="F">°F(Fahrenheit)</option>
              <option value="R">°Re(Reamur)</option>
            </select>
          </div>
        </div>

        <div className="result-text-container">
          <h6 className="result-text">{status !== null ? status : ""}</h6>
          <h6 className="result-text">{equation !== null ? equation : ""}</h6>
          <h5 className="result-text">
            {result !== null ? result : "Waiting for you...."}
          </h5>
        </div>

        <div className="col-12 submit-button">
          <button type="submit" className="btn" onClick={handleButtonClick}>
            Convert!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Temperature;
