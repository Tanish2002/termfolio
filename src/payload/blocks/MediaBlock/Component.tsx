import type { StaticImageData } from "next/image";
import React from "react";

import type { MediaBlock as MediaBlockProps, Media as MediaType } from "@/payload-types";
import { Media } from "@/payload/components/Media";
import RichText from "@/payload/components/RichText";
import cn from "@/utils/cn";

type Props = MediaBlockProps & {
	className?: string;
	imgClassName?: string;
	staticImage?: StaticImageData;
	disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
	const { className, imgClassName, media, staticImage } = props;

	let caption: MediaType["caption"];
	if (media && typeof media === "object") caption = media.caption;

	return (
		<div className={cn(className)}>
			<Media imgClassName={cn("rounded-md", imgClassName)} resource={media} src={staticImage} />
			{caption && (
				<RichText
					className="mx-auto flex max-w-[48rem] justify-center font-thin italic text-tokyo-night-comment"
					data={caption}
				/>
			)}
		</div>
	);
};
