import BorderBox from "@/components/BorderBox/BorderBox";
import TechStackList from "@/components/Lists/TechStack/TechStack";
import React from "react";

async function About(props: any) {
  console.log(props)

  return (
    <BorderBox
      texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'techstack' }]}
    >
      <TechStackList divIndex={2} />
    </BorderBox>
  );
}
export default React.memo(About)
