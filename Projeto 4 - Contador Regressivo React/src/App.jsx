import { Outlet } from "react-router-dom";

import { useContext } from "react";

import { CountdownContext } from "./context/CountdownContext";

import NewYear from "./assets/newyear.jpg";

import "./App.css";

function App() {
  const { event } = useContext(CountdownContext);

  let eventImage = null;

  //se a imagem for enviada, event.image recebe a imagem
  if (event) eventImage = event.image;

  return (
    //se a img do evento veio, colocar a img do evento , se não, colocar a imagem padrao
    <div
      className="app"
      style={
        eventImage
          ? { backgroundImage: `url(${eventImage})` }
          : { backgroundImage: `url(${NewYear})` }
      }
    >
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
