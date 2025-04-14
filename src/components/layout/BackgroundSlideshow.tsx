
import { useState, useEffect } from "react";

type BackgroundSlideshowProps = {
  images: string[];
  interval?: number;
  children: React.ReactNode;
  overlay?: boolean;
};

const BackgroundSlideshow = ({
  images,
  interval = 5000,
  children,
  overlay = true,
}: BackgroundSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  return (
    <div className="relative min-h-screen">
      {/* Background images */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      ))}
      
      {/* Optional overlay for better readability */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40" 
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundSlideshow;
