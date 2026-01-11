/* eslint-disable react/prop-types */
import './styles/App.css';
import './styles/output.css';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import ThankyouSection from './components/sections/ThankyouSection';
import HeroSection from './components/sections/HeroSection';
import IndexSection from './components/sections/IndexSection';
import IntroSection from './components/sections/IntroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CreativeSection from './components/sections/CreativeSection';
import CookieConsent from './components/features/CookieConsent';
import Cursor from './components/common/Cursor';
import Connect from './components/features/Connect';
import Contact from './components/features/Contact';
import Social from './components/features/Social';
import Skills from './components/common/Skills';
import Animate from './components/animate';

function App() {
  const elementsRef = useRef([]);
  const [name, setName] = useState('');
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      elementsRef.current.forEach((element) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 400) {
            const attribute = element.getAttribute('data-name');
            const id = element.getAttribute('id');
            setName(attribute);
            if (
              [
                'apps',
                'websites',
                'branding',
                'presentations',
                'social',
                'carousels',
                'collaterals',
                'documents',
                'packaging',
                'infographics',
              ].includes(id)
            ) {
              setCurrentSection(id);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // <div className='min-h-screen bg-[var(--bg-main)]'>
    <div className='min-h-screen'>
      <main className='relative flex w-full'>
        <Sidebar name={name} />
        <div className='scrollable-main flex-1'>
          <Outlet context={{ elementsRef, name, currentSection }} />
        </div>
      </main>
      <CookieConsent />
      <Cursor />
      <Animate />
    </div>
  );
}

export default App;
