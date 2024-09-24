import cn from '@/utils/cn'
import React from 'react'
import BorderBox from '../BorderBox/BorderBox'
import RoutesList from '../Lists/RoutesList/RoutesList'
import SocialList from '../Lists/SocialList/SocialList'
import NavigableDiv from '../NavigableComponents/NavigableDiv/NavigableDiv'

const MobileNavbarContent: React.FC<{ list: React.ReactNode }> = ({ list }) => {
  return (

    // gave indexes starting from 10 so they don't interfere with the other ones
    <div className={cn(
      "gap-4 p-5 bg-tokyo-night-background text-tokyo-night-foreground overflow-y-scroll grid grid-cols-1 grid-rows-6 h-screen"
    )}>
      <NavigableDiv index={10} className='row-span-2'>
        <BorderBox texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'pages' }]}>
          <RoutesList divIndex={1} />
        </BorderBox>
      </NavigableDiv>
      <NavigableDiv index={11} className="row-span-2">
        {/* Render a parallel route based on the current pathName */}
        {list}
      </NavigableDiv>
      <NavigableDiv index={12} className='row-span-2'>
        <BorderBox texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'socials' }]}>
          <SocialList divIndex={3} />
        </BorderBox>
      </NavigableDiv>
    </div>
  )
}

export default MobileNavbarContent
