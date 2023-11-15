"use client";
import { useRef, useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useTypewriter(input, keystrokeDuration, delay, doneRef, start = false) {
  const [info, setInfo] = useState(0);
  var isOnTimeout = useRef(false);

  const callback = function () {
    isOnTimeout.current = false;
    setInfo((obj) => {
      const randomizer = 1;
      return obj + randomizer;
    });
  };

  if (!isOnTimeout.current && start) {
    if (info == 0) {
      setTimeout(callback, keystrokeDuration + delay);
    } else if (info <= input.length) {
      const time = keystrokeDuration + getRandomInt(-1, 2) * 50;
      setTimeout(callback, time);
    }
    isOnTimeout.current = true;
  }

  const endAppend =
    (info < input.length && start) ? <span className="font-light">|</span> : <span></span>;
  if (info == input.length && doneRef) doneRef.current = true;
  return (
    <>
      <span className="font-bold">{input.substring(0, info)}</span>
      {endAppend}
    </>
  );
}
