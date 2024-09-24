'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import NavigableDiv from './NavigableComponents/NavigableDiv/NavigableDiv';
import BorderBox from './BorderBox/BorderBox';
import About from './About';
import RoutesList from './Lists/RoutesList/RoutesList';
import SocialList from './Lists/SocialList/SocialList';

interface ResponsiveLayoutProps {
  list: React.ReactNode;
}

export function MobileNavbar({ list }: ResponsiveLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger menu for small screens */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-tokyo-night-foreground text-tokyo-night-background p-2 rounded-full"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-tokyo-night-background z-50 md:hidden">
          <div className="p-4">
            <NavigableDiv index={0} className="mb-4">
              <BorderBox texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'bakaotaku.dev' }]}>
                <About />
              </BorderBox>
            </NavigableDiv>
            <NavigableDiv index={1} className="mb-4">
              <BorderBox texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'pages' }]}>
                <RoutesList divIndex={1} />
              </BorderBox>
            </NavigableDiv>
            <NavigableDiv index={2} className="mb-4">
              {list}
            </NavigableDiv>
            <NavigableDiv index={3} className=''>
              <BorderBox texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'socials' }]}>
                <SocialList divIndex={3} />
              </BorderBox>
            </NavigableDiv>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-tokyo-night-foreground"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
