//usa para gerenciar, tanto para receber quanto para modificar
import React, { useState } from "react";

//nao existe dado nenhum quando inicia o programa
const CountdownContext = React.createContext(null);

//da acesso aos dados da pagina
const CountdownProvider = ({ children }) => {
  const [event, setEvent] = useState(null);

  return (
    //uma maneira de consultar e alterar os valores do evento
    <CountdownContext.Provider value={{ event, setEvent }}>
      {children}
    </CountdownContext.Provider>
  );
};

export { CountdownContext, CountdownProvider };
