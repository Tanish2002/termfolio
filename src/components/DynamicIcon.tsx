import dynamic from "next/dynamic";
import React from "react";
import { IconType } from "react-icons";

export type IconFamily = keyof ReturnType<typeof getDynamicIconImports>;

const getDynamicIconImports = (icon: string) => {
  return {
    ci: dynamic(() => import('react-icons/ci').then(module => module[icon] as IconType)),
    fa6: dynamic(() => import("react-icons/fa6").then(module => module[icon] as IconType)),
    io: dynamic(() => import("react-icons/io").then((mod) => mod[icon] as IconType)),
    io5: dynamic(() => import("react-icons/io5").then((mod) => mod[icon] as IconType)),
    md: dynamic(() => import("react-icons/md").then((mod) => mod[icon] as IconType)),
    ti: dynamic(() => import("react-icons/ti").then((mod) => mod[icon] as IconType)),
    go: dynamic(() => import("react-icons/go").then((mod) => mod[icon] as IconType)),
    fi: dynamic(() => import("react-icons/fi").then((mod) => mod[icon] as IconType)),
    gi: dynamic(() => import("react-icons/gi").then((mod) => mod[icon] as IconType)),
    wi: dynamic(() => import("react-icons/wi").then((mod) => mod[icon] as IconType)),
    di: dynamic(() => import("react-icons/di").then((mod) => mod[icon] as IconType)),
    ai: dynamic(() => import("react-icons/ai").then((mod) => mod[icon] as IconType)),
    bs: dynamic(() => import("react-icons/bs").then((mod) => mod[icon] as IconType)),
    ri: dynamic(() => import("react-icons/ri").then((mod) => mod[icon] as IconType)),
    pi: dynamic(() => import("react-icons/pi").then((mod) => mod[icon] as IconType)),
    fc: dynamic(() => import("react-icons/fc").then((mod) => mod[icon] as IconType)),
    gr: dynamic(() => import("react-icons/gr").then((mod) => mod[icon] as IconType)),
    hi: dynamic(() => import("react-icons/hi").then((mod) => mod[icon] as IconType)),
    hi2: dynamic(() => import("react-icons/hi2").then((mod) => mod[icon] as IconType)),
    si: dynamic(() => import("react-icons/si").then((mod) => mod[icon] as IconType)),
    sl: dynamic(() => import("react-icons/sl").then((mod) => mod[icon] as IconType)),
    im: dynamic(() => import("react-icons/im").then((mod) => mod[icon] as IconType)),
    bi: dynamic(() => import("react-icons/bi").then((mod) => mod[icon] as IconType)),
    cg: dynamic(() => import("react-icons/cg").then((mod) => mod[icon] as IconType)),
    vsc: dynamic(() => import("react-icons/vsc").then((mod) => mod[icon] as IconType)),
    tb: dynamic(() => import("react-icons/tb").then((mod) => mod[icon] as IconType)),
    tfi: dynamic(() => import("react-icons/tfi").then((mod) => mod[icon] as IconType))
  }
}

const DynamicIcon = ({
  iconFamily,
  icon,
  className
}: {
  iconFamily: IconFamily;
  icon: string;
  className: string;

}) => {
  const Icons = getDynamicIconImports(icon)

  const Icon = iconFamily && icon ? Icons[iconFamily] : null;
  if (!Icon) return <></>;

  return (
    <>
      <Icon className={`${className} h-full w-full`} />
    </>
  );
};

export default React.memo(DynamicIcon);
