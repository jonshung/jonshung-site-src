"use client";
import { useTypewriter } from "./hook/typing";

export default function homePage() {
  const placeholder = "Hello there, \n<Jons> here.";
  const helloText = useTypewriter(placeholder, 100);
  return (
    <div className="w-full h-full flex flex-row">
      <div className="relative w-[var(--intro-width)] h-full bg-[#739072]">
        <h1 className="relative left-20 top-52 text-[110px] text-[#2f3f2f] whitespace-pre-wrap">
          {helloText}
        </h1>
      </div>
      <div className="relative flex w-[calc(100vh-var(--intro-width))] h-full border-t-[2px] border-[#3A4D39]">
        <div className="grow">
          <div className="w-screen h-full bg-[#ECE3CE]"></div>
        </div>
      </div>
    </div>
  );
}
