'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';
import mario from '@/assets/mario.gif';
import kirby from '@/assets/kirby.gif';
import sonic from '@/assets/sonic.gif';
import parrot from '@/assets/parrot.gif';
import seagull from '@/assets/seagull.gif';
import pikachu from '@/assets/pikachu.gif';

const WalkingGif: React.FC = () => {
  const gifs: StaticImageData[] = useMemo(() => [mario, kirby, sonic, parrot, seagull, pikachu], []);
  const [currentGif, setCurrentGif] = useState<StaticImageData>(gifs[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number>();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);

  const getRandomGif = useCallback((): StaticImageData => {
    const currentIndex = gifs.indexOf(currentGif);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * gifs.length);
    } while (newIndex === currentIndex);
    return gifs[newIndex];
  }, [gifs, currentGif]);

  const animate = useCallback((timestamp: number) => {
    if (!imageRef.current || containerWidth === 0 || imageWidth === 0) return;

    const speed = 300; // pixels per second
    const totalDistance = containerWidth + imageWidth;
    const progress = (timestamp % (totalDistance / speed * 1000)) / 1000;
    const position = (progress * speed - imageWidth) + 10;

    imageRef.current.style.transform = `translateX(${position}px)`;

    if (position >= containerWidth) {
      setCurrentGif(getRandomGif());
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [containerWidth, imageWidth, getRandomGif]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      if (imageRef.current) {
        setImageWidth(imageRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
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
    <div ref={containerRef} className="relative w-full h-32 overflow-hidden">
      <div className="absolute top-0">
        <Image
          ref={imageRef}
          className="w-32 h-full"
          src={currentGif}
          style={{ height: "auto" }}
          alt="Walking character"
          onLoad={(img) => setImageWidth(img.currentTarget.naturalWidth)}
        />
      </div>
    </div>
  );
};

export default WalkingGif;
