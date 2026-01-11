import { Link } from 'react-router-dom';
import styles from '../../styles/ThankyouSection.module.css';
import Button from '../ui/Button';
import Button2 from '../ui/Button2';
import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

export default function ThankyouSection() {
  useEffect(() => {
    // Kick off the polyfill
    smoothscroll.polyfill();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div id='contact' className={styles.thankyouSection}>
      <div className={styles['preview-content']}>
        <div className={styles['thankyou-content']}>
          <h2>
            THANK <br /> YOU
          </h2>
          <img src='images/smile.svg' alt='smile' />
        </div>
        <div className={styles['thankyou-details']}>
          {/* <p>
              <a href="tel:+919701253249">+91 970 125 3249</a>
            </p> */}
          {/* <p>
              <a href='mailto:hello@abcd.graphics'>hello@abcd.graphics</a>
            </p>  
            <p>
              <Link href='/'>abcd.graphics</Link>
            </p> */}

          <Button2>Let The Magic Unfold!</Button2>
          <Button2
            onClick={scrollToTop}
            className="IconTopbar"
            icon={<img src='icons/Up_arrow.svg' className={styles.icons} />}
          ></Button2>
        </div>
        {/* <div className={styles['grid-overlay']}>
          <div className={styles['grid-inner']}>
            <div className={styles['grid-background']}></div>
          </div>
          <div className={styles['grid-fade']}></div>
        </div> */}
      </div>
    </div>
  );
}
