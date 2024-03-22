import { data } from "./data/data.js";

import { useState } from "react";

import ImcCalc from "./components/ImcCalc";
import ImcTable from "./components/ImcTable.jsx";

import "./App.css";

function App() {
  const calcImc = (e, height, weight) => {
    e.preventDefault();

    // se nao passar os dados retornar
    if (!weight || !height) return;

    // formatando string para numero
    const weightFloat = +weight.replace(",", ".");
    const heightFloat = +height.replace(",", ".");

    // calculando IMC
    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1);

    setImc(imcResult);

    data.forEach((item) => {
      if (imcResult >= item.min && imcResult <= item.max) {
        setInfo(item.info);
        setInfoClass(item.infoClass);
      }
    });

    if (!info) return;
  };

  //para resetar
  const resetCalc = (e) => {
    e.preventDefault();

    setImc("");
    setInfo("");
    setInfoClass("");
  };

  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");

  return (
    <div className="container">
      {/* SE NÃO TIVER IMC, RETORNAR IMC CALC, SE TIVER RETORNAR O IMC TABLE */}
      {!imc ? (
        <ImcCalc calcImc={calcImc} />
      ) : (
        <ImcTable
          data={data}
          imc={imc}
          info={info}
          infoClass={infoClass}
          resetCalc={resetCalc}
        />
      )}
    </div>
  );
}

export default App;
