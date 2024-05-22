"use client";
import { FC, useEffect, useRef, useState } from "react";

interface LongPressButtonProp
  extends React.HTMLAttributes<HTMLParagraphElement> {
  onLongPress: () => void;
  onClick?: () => void;
  delay?: number;
  children: React.ReactNode;
}

const LongPressButton: FC<LongPressButtonProp> = ({
  onLongPress,
  onClick,
  children,
  delay = 500,
  ...prop
}) => {
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef<any>(null);

  const startPress = () => {
    setIsPressing(true);
    timerRef.current = setTimeout(() => {
      onLongPress();
      setIsPressing(false);
    }, delay);
  };

  const endPress = () => {
    setIsPressing(false);
    clearTimeout(timerRef.current);
  };

  const handleMouseDown = () => startPress();
  const handleMouseUp = () => endPress();
  const handleMouseLeave = () => endPress();

  const handleTouchStart = () => startPress();
  const handleTouchEnd = () => endPress();

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      {...prop}
    >
      {children}
    </div>
  );
};

export default LongPressButton;
