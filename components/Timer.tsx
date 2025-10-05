"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  minutes: number;
  onEnd?: () => void;
}

export default function Timer({ minutes, onEnd }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutesDisplay = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secondsDisplay = String(secondsLeft % 60).padStart(2, "0");
  const blink = secondsLeft <= 30 ? "animate-blink text-red-500" : "";

  return <div className={`text-2xl font-bold ${blink}`}>• {minutesDisplay} : {secondsDisplay} •</div>;
}
