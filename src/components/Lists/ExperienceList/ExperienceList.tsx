import React from 'react';
import { ExperienceListProps } from './types';
import ExperienceListItemClient from './ExperienceListItemClient';

const items = [
  { jobTitle: 'Software Engineer', companyName: "company", slug: "sde-company1" },
  { jobTitle: 'Backend Developer', companyName: "company", slug: "sde-company2" },
  { jobTitle: 'Open Source Contributer', companyName: "Github", slug: "slug-company3" },
]

const ExperienceList: React.FC<ExperienceListProps> = ({ divIndex }) => {
  return (
    <ul className="space-y-2 w-full">
      {items.map((item, itemIndex) => {
        return (
          <ExperienceListItemClient
            key={`experience-item-${itemIndex}`}
            divIndex={divIndex}
            experienceItem={{ ...item, slug: `/experience/${item.slug}` }}
            itemIndex={itemIndex}
          />
        )
      })}
    </ul>
  );
};

export default React.memo(ExperienceList);
