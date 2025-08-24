import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const scrollY = window.scrollY;
      
      if (scrollY === 0) {
        setVisible(true);
        return;
      }

      if (Math.abs(scrollY - prevOffset) < 10) {
        return;
      }

      const direction = scrollY > prevOffset ? "down" : "up";

      if (direction !== scrollDirection) {
        setScrollDirection(direction);
        setVisible(direction === "up");
      }

      setPrevOffset(scrollY);
    };

    window.addEventListener("scroll", toggleScrollDirection);

    return () => {
      window.removeEventListener("scroll", toggleScrollDirection);
    };
  }, [scrollDirection, prevOffset]);

  return visible;
}
