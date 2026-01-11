import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ballRef = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dotSensitivity, setDotSensitivity] = useState(0.3);
  const [ballSensitivity, setBallSensitivity] = useState(0.1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(ballRef.current, { xPercent: -50, yPercent: -50 });

    const mouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      gsap.to(dotRef.current, {
        duration: dotSensitivity,
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", mouseMove);

    const updatePosition = () => {
      if (!active) {
        setPos((prevPos) => {
          const newPos = {
            x: prevPos.x + (mouse.x - prevPos.x) * ballSensitivity,
            y: prevPos.y + (mouse.y - prevPos.y) * ballSensitivity,
          };
          gsap.set(ballRef.current, { x: newPos.x, y: newPos.y });
          return newPos;
        });
      }
    };

    gsap.ticker.add(updatePosition);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      gsap.ticker.remove(updatePosition);
    };
  }, [mouse.x, mouse.y, dotSensitivity, ballSensitivity, active]);

  return (
    <div id="magic-cursor" className="hovered">
      <div ref={dotRef} id="dot"></div>
      <div ref={ballRef} id="ball"></div>
    </div>
  );
}
