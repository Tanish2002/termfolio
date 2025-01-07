import dynamic from "next/dynamic";
import React from "react";

import { IconType, IconBaseProps } from "react-icons";
import { FaCircleQuestion } from "react-icons/fa6";

interface IconComponentProps extends IconBaseProps {
  iconName: string;
}

const IconFamilies = {
  ci: dynamic(() => import('react-icons/ci').then(mod => {
    return function CiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    }
  })),
  fa6: dynamic(() => import('react-icons/fa6').then(mod => {
    return function FaIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  io: dynamic(() => import('react-icons/io').then(mod => {
    return function IoIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  io5: dynamic(() => import('react-icons/io5').then(mod => {
    return function Io5Icon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  md: dynamic(() => import('react-icons/md').then(mod => {
    return function MdIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  ti: dynamic(() => import('react-icons/ti').then(mod => {
    return function TiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  go: dynamic(() => import('react-icons/go').then(mod => {
    return function GoIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  fi: dynamic(() => import('react-icons/fi').then(mod => {
    return function FiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  gi: dynamic(() => import('react-icons/gi').then(mod => {
    return function GiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  wi: dynamic(() => import('react-icons/wi').then(mod => {
    return function WiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  di: dynamic(() => import('react-icons/di').then(mod => {
    return function DiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  ai: dynamic(() => import('react-icons/ai').then(mod => {
    return function AiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  bs: dynamic(() => import('react-icons/bs').then(mod => {
    return function BsIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  ri: dynamic(() => import('react-icons/ri').then(mod => {
    return function RiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  pi: dynamic(() => import('react-icons/pi').then(mod => {
    return function PiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  fc: dynamic(() => import('react-icons/fc').then(mod => {
    return function FcIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  gr: dynamic(() => import('react-icons/gr').then(mod => {
    return function GrIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  hi: dynamic(() => import('react-icons/hi').then(mod => {
    return function HiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  hi2: dynamic(() => import('react-icons/hi2').then(mod => {
    return function Hi2Icon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  si: dynamic(() => import('react-icons/si').then(mod => {
    return function SiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  sl: dynamic(() => import('react-icons/sl').then(mod => {
    return function SlIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  im: dynamic(() => import('react-icons/im').then(mod => {
    return function ImIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  bi: dynamic(() => import('react-icons/bi').then(mod => {
    return function BiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  cg: dynamic(() => import('react-icons/cg').then(mod => {
    return function CgIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  vsc: dynamic(() => import('react-icons/vsc').then(mod => {
    return function VscIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  tb: dynamic(() => import('react-icons/tb').then(mod => {
    return function TbIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  })),
  tfi: dynamic(() => import('react-icons/tfi').then(mod => {
    return function TfiIcon({ iconName, ...props }: IconComponentProps) {
      const Icon = mod[iconName as keyof typeof mod] as IconType;
      return Icon ? <Icon {...props} /> : <FaCircleQuestion {...props} />;
    };
  }))
} as const;
export type IconFamily = keyof typeof IconFamilies;
export const SUPPORTED_FAMILIES = Object.keys(IconFamilies);

interface DynamicIconProps {
  iconFamily: IconFamily;
  icon: string;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = async ({ iconFamily, icon, className = "" }) => {
  const Icon = IconFamilies[iconFamily];

  if (!Icon) return <FaCircleQuestion className={`${className} h-full w-full`} />;
  return <Icon iconName={icon} className={`${className} h-full w-full`} />;
};

export default React.memo(DynamicIcon);
