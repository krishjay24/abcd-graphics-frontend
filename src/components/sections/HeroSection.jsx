import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Button from '../ui/Button';
import styles from '../../styles/HeroSection.module.css';

export default function HeroSection({ elementsRef }) {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Kick off the polyfill
    smoothscroll.polyfill();

    const updateYear = () => {
      setYear(new Date().getFullYear());
    };
    updateYear();
  }, []);

  const handleScrollToExpertise = (e) => {
    e.preventDefault();
    const expertiseSection = document.querySelector('#my-expertise');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      data-name=''
      ref={(el) => (elementsRef.current[0] = el)}
      className='hero-section'
    >
      <header className='hero-profile-row'>
        <div>
          <div className='profile-name-design'>
            <div className='round'>
              <div></div>
            </div>
            <div className='line'></div>
          </div>
        </div>
        <div className='hero-profile-col-right'>
          <div className='summary-content'>
            <div>
              <h1
                data-option='strip-slide-up'
                className='portfolio-title animate strip-slide-up'
              >
                AKHIL BANDARU
              </h1>
              <h1
                data-option='strip-slide-up'
                className='portfolio-title animate strip-slide-up'
              >
                CREATIVE DESIGNER
              </h1>
            </div>
          </div>
          <div className='portfolio-title-design'>
            <div></div>
            <div></div>
            <div></div>
            <div className='portfolio-timeline'>
              <p>BORN – 03 NOV 1989</p>
              <p>{year}</p>
            </div>
          </div>
        </div>
      </header>
      <nav className='hero-nav-row'>
        <article className='flip-word-col'>
          <div className='summary-content Heading'>
            <div>
              <h2
                data-option='strip-slide-up'
                className='flip-word-heading animate strip-slide-up'
              >
                LET THE
              </h2>
              <h2
                data-option='strip-slide-up'
                className='flip-word-heading animate strip-slide-up'
              >
                MAGIC UNFOLD!
              </h2>
            </div>

            <p
              data-option='fade-in'
              className='flip-word-sub-heading animate fade-out'
            >
              HELLO VISITOR!
            </p>
            <p
              data-option='fade-in'
              className='flip-word-content animate fade-out'
            >
              Howdy, my friend <i>(yes, I'll call you that henceforth)</i>.
              Thanks for stopping by my website, well, this is actually much
              more than just a website.
            </p>
            <p
              data-option='fade-in'
              className='flip-word-content animate fade-out'
            >
              Consider this to be a portal{' '}
              <i>(you guessed it, I've watched too many sci-fi movies)</i> to
              dive into my world. A world of design possibilities, a place of
              magic, and in this realm, I'm the magician with the magic wand{' '}
              <i>(or a ring, your imaginative choices)!</i>
            </p>
          </div>

          <div className='button-container'>
            <a href='#my-expertise' onClick={handleScrollToExpertise}>
              <Button>Brace Yourself</Button>
            </a>
          </div>
        </article>
      </nav>
      {/* <div>
        <img src="images/bg-main-cropped.png" />
      </div> */}
      <div className='navigation'>
        <a href='#my-expertise' onClick={handleScrollToExpertise}>
          <div>
            <img src='images/nav-arrow.svg' alt='Navigation Arrow' />
          </div>
        </a>
      </div>
    </section>
  );
}
HeroSection.propTypes = {
  elementsRef: PropTypes.object.isRequired,
};
