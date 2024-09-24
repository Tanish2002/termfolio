import React from 'react';
import { SocialListItemProps, SocialListProps } from './types';
import SocialListItemClient from './SocialListItemClient';
import DynamicIcon from '@/components/DynamicIcon';

const items: SocialListItemProps[] = [
  { socialName: "Github", logo: { type: "fa6", name: "FaGithub" }, href: "https://github.com/Tanish2002" },
  { socialName: "Email", logo: { type: "md", name: "MdEmail" }, href: "mailto:tanishkhare@gmail.com" },
  { socialName: "Twitter/X", logo: { type: "fa6", name: "FaXTwitter" }, href: "https://twitter.com" },
  { socialName: "Linkedin", logo: { type: "fa6", name: "FaLinkedin" }, href: "https://linkedin.com" },
]

const SocialList: React.FC<SocialListProps> = ({ divIndex }) => {
  const icons = items.map((item, index) => (
    <DynamicIcon className='text-inherit' key={index} icon={item.logo.name} iconFamily={item.logo.type} />
  ));
  return (
    <ul className="space-y-2 w-full">
      {items.map((item, itemIndex) => {
        return (
          <SocialListItemClient
            icons={icons}
            key={`social-item-${itemIndex}`}
            divIndex={divIndex}
            socialItem={item}
            itemIndex={itemIndex}
          />
        )
      })}
    </ul>
  );
};

export default React.memo(SocialList);
