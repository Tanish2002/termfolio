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

	const animate = useCallback(
		(timestamp: number) => {
			if (!imageRef.current || containerWidth === 0 || imageWidth === 0) return;

			const speed = 300; // pixels per second
			const totalDistance = containerWidth + imageWidth;
			const progress = (timestamp % ((totalDistance / speed) * 1000)) / 1000;
			const position = progress * speed - imageWidth + 10;

			imageRef.current.style.transform = `translateX(${position}px)`;

			if (position >= containerWidth) {
				setCurrentGif(getRandomGif());
			}

			animationRef.current = requestAnimationFrame(animate);
		},
		[containerWidth, imageWidth, getRandomGif]
	);

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
			<div className="absolute top-0">
				<Image
					ref={imageRef}
					className="h-full w-32"
					src={currentGif}
					style={{ height: "auto" }}
					alt="Walking character"
					onLoad={(img) => setImageWidth(img.currentTarget.naturalWidth)}
					unoptimized
				/>
			</div>
		</div>
	);
};

export default WalkingGif;
