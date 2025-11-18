import { useState, useEffect, useRef } from 'react';

export function AnimatedPattern() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const previousAngles = useRef<Map<string, number>>(new Map());
  
  const rows = 1;
  const cols = 72;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const normalizeAngleDifference = (current: number, previous: number) => {
    let diff = current - previous;
    
    // Нормализуем разницу, чтобы она была в диапазоне [-180, 180]
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    
    return previous + diff;
  };

  const calculateRotation = (rowIndex: number, colIndex: number) => {
    if (!containerRef.current) return 0;
    
    const rect = containerRef.current.getBoundingClientRect();
    const charWidth = rect.width / cols;
    const charHeight = rect.height / rows;
    
    const charX = rect.left + colIndex * charWidth + charWidth / 2;
    const charY = rect.top + rowIndex * charHeight + charHeight / 2;
    
    const deltaX = mousePos.x - charX;
    const deltaY = mousePos.y - charY;
    
    // Вычисляем "сырой" угол от -180 до 180
    const rawAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    const key = `${rowIndex}-${colIndex}`;
    const previousAngle = previousAngles.current.get(key);
    
    let finalAngle: number;
    
    if (previousAngle !== undefined) {
      // Нормализуем угол относительно предыдущего значения
      finalAngle = normalizeAngleDifference(rawAngle, previousAngle);
    } else {
      finalAngle = rawAngle;
    }
    
    previousAngles.current.set(key, finalAngle);
    
    return finalAngle;
  };

  return (
    <div 
      ref={containerRef}
      className="inline-block"
      style={{ fontSize: '28px', lineHeight: '28px' }}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', height: '28px' }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className="text-foreground/20 inline-block"
              style={{
                transform: `rotate(${calculateRotation(rowIndex, colIndex)}deg)`,
                transition: 'transform 0.1s ease-out',
                transformOrigin: 'center center',
                width: '10px',
                display: 'inline-block',
                textAlign: 'center'
              }}
            >
              |
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
