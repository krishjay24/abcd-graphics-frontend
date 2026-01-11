import EndCards from '../EndCards';
import ScrollSection from './ScrollSection';
import { Lamp } from '../ui/Lamp';

export default function CreativeSection({ elementsRef }) {
  return (
    <div
      id='ecm'
      data-name=''
      ref={(el) => (elementsRef.current[17] = el)}
      className='creative-section'
    >
      {/* <Lamp /> */}
      <div className='summary-content'>
        <h2 className='creative-section-main-heading'>
          When in doubt, peddle it out
        </h2>
        <p className='pb-4 text-center text-[30px] font-medium tracking-tight  md:text-[30px] creative-section-top-heading creative-section-sub-heading'>
          We have reached this far, but did you know that I'm a cyclist? Well,
          now you do. You could hire me to cycle a marathon….maybe not but there
          are so many other reasons why I think I'm really cool. Here's a very
          short short list!
        </p>
      </div>

      <ScrollSection />
      <EndCards />
    </div>
  );
}
