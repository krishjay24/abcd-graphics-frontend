import { useEffect, useRef } from 'react';
import { ContainerScroll } from '../ui/ContainerScrollAnimation';

export default function ScrollSection() {
  const elementsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      elementsRef.current.forEach((element, index) => {
        if (element) {
          const speed = parseFloat(element.getAttribute('data-speed'));
          const currentTop = element.getBoundingClientRect().top;

          let yOffset =
            Math.max(0, window.innerHeight - currentTop) * speed * 0.1;

          element.style.transform = `translateY(${-yOffset}px)`;
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
          }
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='container-scroll-row'>
      <div
        data-speed='3'
        ref={(el) => (elementsRef.current[0] = el)}
        className='w-[200px] h-[200px] box-slides'
      >
        <img src='/images/app-watch.webp' alt='App Watch' />
      </div>
      <div
        data-speed='1.5'
        ref={(el) => (elementsRef.current[1] = el)}
        className='w-[200px] h-[200px] box-slides'
      >
        <div className='h-[300px]'></div>
        <img src='/images/app-scene.webp' alt='App Scene' />
      </div>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className='text-4xl leading-8 font-semibold text-[#ed7d31] dark:text-white container-scroll'>
              EFFORTLESS <br />
              <span className='text-4xl md:text-[6rem] font-bold mt-1 leading-none container-scroll-heading'>
                CREATIVE MANAGEMENT
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/images/banner.png`}
          alt='hero'
          height={720}
          width={1400}
          className='mx-auto rounded-2xl object-cover h-full object-left-top'
          draggable={false}
        />
      </ContainerScroll>
      <div
        data-speed='4'
        ref={(el) => (elementsRef.current[2] = el)}
        className='w-[200px] h-[200px] box-slides'
      >
        <img src='/images/health.webp' alt='Health' />
      </div>
      <div
        data-speed='3'
        ref={(el) => (elementsRef.current[3] = el)}
        className='w-[200px] h-[200px] box-slides'
      >
        <div className='h-[200px]'></div>
        <img src='/images/Service_Location__1_.webp' alt='Service Location' />
      </div>
    </div>
  );
}
