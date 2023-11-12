"use client";
import { useRef, useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useTypewriter(input, keystrokeDuration) {
  const [info, setInfo] = useState(0);
  var isOnTimeout = useRef(false);

  const callback = function () {
    isOnTimeout.current = false;
    setInfo((obj) => {
      const randomizer = 1;
      return obj + randomizer;
    });
  };

  if (!isOnTimeout.current) {
    if (info == 0) {
      setTimeout(callback, keystrokeDuration + 1000);
    } else if (info <= input.length) {
      const time = keystrokeDuration + getRandomInt(-1, 2) * 50;
      setTimeout(callback, time);
    }
    isOnTimeout.current = true;
  }

  const endAppend =
    info < input.length ? (
      <span className="font-light">|</span>
    ) : (
      <span></span>
    );
  return (
    <>
      <span className="font-bold">{input.substring(0, info)}</span>
      {endAppend}
    </>
  );
}
