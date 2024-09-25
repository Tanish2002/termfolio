import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import ExperienceList from "@/components/Lists/ExperienceList/ExperienceList";

async function Experience() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "experience" }]}>
			<ExperienceList divIndex={2} />
		</BorderBox>
	);
}

export default Experience;
