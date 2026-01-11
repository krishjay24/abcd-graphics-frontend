import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/Sidebar.module.css';

export default function Sidebar({ name }) {
  const [menuActive, setActive] = useState(false);

  return (
    <>
      <div className={styles.fixedSidebar}>
        <div>
          <a href='/'>
            <img className={styles.logo} src='/logo/logo-main.svg' />
          </a>
          <p className={styles.sidebarDynamicName}>{name}</p>
          <a className='logo-holder' href='/'>
            <img className='logo' src='/logo/abcd-logo_orange.svg'></img>
          </a>
          {/* Social Links Sections  */}
          <div
            onClick={() => setActive(!menuActive)}
            className={styles.socialLinks}
          >
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='/images/github.svg' alt='GitHub' />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='/images/linkedin.svg' alt='LinkedIn' />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='/images/twitter.svg' alt='Twitter' />
            </a>
          </div>

          <div
            onClick={() => setActive(!menuActive)}
            className={styles.mobileNav}
          >
            <img src='images/mobile-nav.svg' />
          </div>
        </div>
      </div>

      {/* Mobile menu with social links */}
      <div
        className={`${styles.mobileMenu} ${menuActive ? styles.active : ''}`}
      >
        <div className={styles.mobileMenuNav}>
          <img
            onClick={() => setActive(!menuActive)}
            className={styles.cross}
            src='images/cross.png'
          />
        </div>
        <div className={styles.mobileMenuSocialLinks}>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
          <a
            href='https://linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Twitter
          </a>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  name: PropTypes.string.isRequired,
};
