"use client";

import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import kirby from "@/assets/kirby.webp";
import mario from "@/assets/mario.webp";
import parrot from "@/assets/parrot.webp";
import pikachu from "@/assets/pikachu.webp";
import seagull from "@/assets/seagull.webp";
import sonic from "@/assets/sonic.webp";

const WalkingGif: React.FC = () => {
  const gifs: StaticImageData[] = useMemo(
    () => [mario, kirby, sonic, parrot, seagull, pikachu],
    []
  );
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);

  const getSmartRandomGifIndex = useCallback(() => {
    const availableIndices = gifs
      .map((_, index) => index)
      .filter((index) => index !== currentGifIndex);

    // Randomly select from the available indices
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }, [gifs, currentGifIndex]);

  const animate = useCallback(
    (timestamp: number) => {
      if (containerWidth === 0 || imageWidth === 0) return;

      const speed = 300; // pixels per second
      const totalDistance = containerWidth + imageWidth;
      const progress = (timestamp % ((totalDistance / speed) * 1000)) / 1000;
      const position = progress * speed - imageWidth + 10;

      const currentImage = document.querySelector<HTMLDivElement>(`.gif-${currentGifIndex}`);

      if (currentImage) {
        currentImage.style.transform = `translateX(${position}px)`;
      }

      if (position >= containerWidth) {
        setCurrentGifIndex(getSmartRandomGifIndex());
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [containerWidth, imageWidth, currentGifIndex, getSmartRandomGifIndex]
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      const firstImage = document.querySelector<HTMLImageElement>(`.gif-0`);
      if (firstImage) {
        setImageWidth(firstImage.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div ref={containerRef} className="relative h-32 w-full overflow-hidden">
      {gifs.map((gif, index) => (
        <div
          key={index}
          className={`absolute top-0 gif-${index}`}
          style={{
            display: index === currentGifIndex ? "block" : "none",
            transition: "opacity 0.3s"
          }}
        >
          <Image
            className="h-full w-32"
            src={gif}
            style={{ height: "auto" }}
            alt={`Walking character ${index}`}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
};

export default WalkingGif;
