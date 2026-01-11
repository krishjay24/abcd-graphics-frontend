import { useState } from 'react';
import { useCookies } from 'react-cookie';

export default function CookieConsent() {
  const [cookies, setCookie] = useCookies(['userConsent']);
  const [visible, setVisible] = useState(!cookies.userConsent);

  const acceptCookies = () => {
    setCookie('userConsent', true, { path: '/', maxAge: 31536000 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='cookie-consent'>
      <div className='cookie-consent-icon'>
        <img src='images/cookie.svg' width={48} height={48} />
      </div>
      <p className='cookie-consent-text'>
        We use third-party cookies in order to personalize your site experience.
      </p>
      <div className='cookie-btn'>
        <button onClick={acceptCookies}>
          <span className='btn-text'>Accept</span>
          <span className='btn-ani-bg'></span>
        </button>
        <button className='disagree-button' onClick={() => setVisible(false)}>
          <span className='btn-text'>Decline</span>
          <span className='btn-ani-bg'></span>
        </button>
      </div>
    </div>
  );
}
