import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils/cn';


const DynamicHeightContainer = ({children, className, offsetPercentage=5}) => {
  const containerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('100%');

  useEffect(() => {
    const updateMaxHeight = () => {
      if (!containerRef.current) return;
      
      // Get container's top position relative to viewport
      const containerRect = containerRef.current.getBoundingClientRect();
      const topPosition = containerRect.top;
      
      // Calculate available height from container's top to viewport bottom
      const viewportHeight = window.innerHeight;
      const offset = (viewportHeight * offsetPercentage) / 100;
      
      // Calculate available height minus offset
      const availableHeight = viewportHeight - topPosition - offset;
      
      // Add small buffer to prevent exact edge cases
      const heightWithBuffer = Math.floor(availableHeight - 4);
      
      setMaxHeight(`${heightWithBuffer}px`);
    };

    // Initial calculation
    updateMaxHeight();

    // Update on resize and content changes
    const resizeObserver = new ResizeObserver(updateMaxHeight);
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateMaxHeight);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-y-auto", className)}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};

export default DynamicHeightContainer;

// but thing is, the component will never ever overflow the screen, it dynamically adjusts its max height whenver screen resizes