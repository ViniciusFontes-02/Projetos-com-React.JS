import { useState } from "react";

const useCountdown = (date) => {
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [secound, setSecound] = useState();

  const countdown = () => {
    //getTime -> pega o tempo em millisegundos
    const countDate = new Date(date).getTime();
    const now = new Date().getTime();

    const interval = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Math.floor=>arredonda p/ baixo,pois nao existe 1,1 dia
    const dayNumber = Math.floor(interval / day);
    const hourNumber = Math.floor((interval % day) / hour);
    const minuteNumber = Math.floor((interval % hour) / minute);
    const secoundNumber = Math.floor((interval % minute) / second);

    setDay(dayNumber);
    setHour(hourNumber);
    setMinute(minuteNumber);
    setSecound(secoundNumber);
  };

  //a cada 1s esta executando a função
  setInterval(countdown, 1000);

  return [day, hour, minute, secound];
};

export default useCountdown;
