import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import { IconType } from "react-icons";
import { FaCircleQuestion } from "react-icons/fa6";

const getDynamicIconImports = () => ({
  ci: (icon: string) =>
    import("react-icons/ci").then((mod) => mod[icon as keyof typeof mod] as IconType),
  fa6: (icon: string) =>
    import("react-icons/fa6").then((mod) => mod[icon as keyof typeof mod] as IconType),
  io: (icon: string) =>
    import("react-icons/io").then((mod) => mod[icon as keyof typeof mod] as IconType),
  io5: (icon: string) =>
    import("react-icons/io5").then((mod) => mod[icon as keyof typeof mod] as IconType),
  md: (icon: string) =>
    import("react-icons/md").then((mod) => mod[icon as keyof typeof mod] as IconType),
  ti: (icon: string) =>
    import("react-icons/ti").then((mod) => mod[icon as keyof typeof mod] as IconType),
  go: (icon: string) =>
    import("react-icons/go").then((mod) => mod[icon as keyof typeof mod] as IconType),
  fi: (icon: string) =>
    import("react-icons/fi").then((mod) => mod[icon as keyof typeof mod] as IconType),
  gi: (icon: string) =>
    import("react-icons/gi").then((mod) => mod[icon as keyof typeof mod] as IconType),
  wi: (icon: string) =>
    import("react-icons/wi").then((mod) => mod[icon as keyof typeof mod] as IconType),
  di: (icon: string) =>
    import("react-icons/di").then((mod) => mod[icon as keyof typeof mod] as IconType),
  ai: (icon: string) =>
    import("react-icons/ai").then((mod) => mod[icon as keyof typeof mod] as IconType),
  bs: (icon: string) =>
    import("react-icons/bs").then((mod) => mod[icon as keyof typeof mod] as IconType),
  ri: (icon: string) =>
    import("react-icons/ri").then((mod) => mod[icon as keyof typeof mod] as IconType),
  pi: (icon: string) =>
    import("react-icons/pi").then((mod) => mod[icon as keyof typeof mod] as IconType),
  fc: (icon: string) =>
    import("react-icons/fc").then((mod) => mod[icon as keyof typeof mod] as IconType),
  gr: (icon: string) =>
    import("react-icons/gr").then((mod) => mod[icon as keyof typeof mod] as IconType),
  hi: (icon: string) =>
    import("react-icons/hi").then((mod) => mod[icon as keyof typeof mod] as IconType),
  hi2: (icon: string) =>
    import("react-icons/hi2").then((mod) => mod[icon as keyof typeof mod] as IconType),
  si: (icon: string) =>
    import("react-icons/si").then((mod) => mod[icon as keyof typeof mod] as IconType),
  sl: (icon: string) =>
    import("react-icons/sl").then((mod) => mod[icon as keyof typeof mod] as IconType),
  im: (icon: string) =>
    import("react-icons/im").then((mod) => mod[icon as keyof typeof mod] as IconType),
  bi: (icon: string) =>
    import("react-icons/bi").then((mod) => mod[icon as keyof typeof mod] as IconType),
  cg: (icon: string) =>
    import("react-icons/cg").then((mod) => mod[icon as keyof typeof mod] as IconType),
  vsc: (icon: string) =>
    import("react-icons/vsc").then((mod) => mod[icon as keyof typeof mod] as IconType),
  tb: (icon: string) =>
    import("react-icons/tb").then((mod) => mod[icon as keyof typeof mod] as IconType),
  tfi: (icon: string) =>
    import("react-icons/tfi").then((mod) => mod[icon as keyof typeof mod] as IconType)
});

export type IconFamily = keyof ReturnType<typeof getDynamicIconImports>;
export const SUPPORTED_FAMILIES = Object.keys(getDynamicIconImports());

interface DynamicIconProps {
  iconFamily: IconFamily;
  icon: string;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconFamily, icon, className = "" }) => {
  const Icon = useMemo(() => {
    if (!iconFamily || !icon) return null;
    return dynamic(
      () =>
        getDynamicIconImports()
          [iconFamily](icon)
          .then((mod) => mod || (() => <FaCircleQuestion />)),
      { loading: () => <div>Loading...</div> }
    );
  }, [iconFamily, icon]);

  if (!Icon) return <FaCircleQuestion />;

  return <Icon className={`${className} h-full w-full`} />;
};

export default React.memo(DynamicIcon);
