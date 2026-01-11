import { useOutletContext } from 'react-router-dom';
import ThankyouSection from '../components/sections/ThankyouSection';
import HeroSection from '../components/sections/HeroSection';
import IndexSection from '../components/sections/IndexSection';
import IntroSection from '../components/sections/IntroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CreativeSection from '../components/sections/CreativeSection';
import Connect from '../components/features/Connect';
import Contact from '../components/features/Contact';
// import Social from '../components/features/Social';
import Skills from '../components/common/Skills';

function Home() {
  const { elementsRef, name, currentSection } = useOutletContext();

  return (
    <>
      <HeroSection elementsRef={elementsRef} />
      <IndexSection elementsRef={elementsRef} />
      <IntroSection elementsRef={elementsRef} />
      <Skills elementsRef={elementsRef} />
      <ProjectsSection
        elementsRef={elementsRef}
        name={name}
        currentSection={currentSection}
      />
      <Connect elementsRef={elementsRef} />
      <Contact elementsRef={elementsRef} />
      {/* <Social elementsRef={elementsRef} /> */}
      <CreativeSection elementsRef={elementsRef} />
      <ThankyouSection />
    </>
  );
}

export default Home;
