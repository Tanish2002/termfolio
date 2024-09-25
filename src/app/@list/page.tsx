import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import TechStackList from "@/components/Lists/TechStack/TechStack";

async function About() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "techstack" }]}>
			<TechStackList divIndex={2} />
		</BorderBox>
	);
}
export default React.memo(About);
