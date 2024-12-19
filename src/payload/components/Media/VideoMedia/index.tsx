import cn from "@/utils/cn";
import { getServerSideURL } from "@/utils/getURL";

import type { Props as MediaProps } from "../types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
	const { onClick, resource, videoClassName } = props;

	if (resource && typeof resource === "object") {
		const { url } = resource;
		return (
			<video className={cn(videoClassName)} controls={true} onClick={onClick}>
				<source src={`${getServerSideURL()}${url}`} />
			</video>
		);
	}

	return null;
};
