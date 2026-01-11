import { saveAs } from 'file-saver';
import Reaction from './Reaction';

export default function Social({ elementsRef }) {
  return (
    <div
      data-name='SOCIAL'
      ref={(el) => (elementsRef.current[16] = el)}
      className='lets-connect-container'
    >
      <div>
        <div className='lets-connect-col-1'>
          <h2>SOCIAL SIGNALS</h2>
          {/* <Reaction
            title='Connect with me on social media'
            like={0}
            view={0}
            table='social'
            id='social'
          > */}
          <div className='social-text'>
            <p>
              I’m not socially awkward, and I don’t want you to be as well. What
              are friends for, just hit me up and we can get a conversation
              going.
            </p>
            <p>
              I don't know if you have the habit of sliding into DMs, but you
              can slide into mine (a lil cheeky on purpose).
            </p>
          </div>
          {/* </Reaction> */}
        </div>
        {/* <div className="lets-connect-col-2"></div> */}
        <div className='lets-connect-col-3'>
          <div className='social-links'>
            <div className='link2'>
              <img className='facebook-icon' src='/social-icons/facebook.svg' />
            </div>
            <div className='link2'>
              <img className='behance-icon' src='/social-icons/behance.svg' />
            </div>
            <div className='link2'>
              <img className='linkedin-icon' src='/social-icons/linkedin.svg' />
            </div>
            <div className='link2'>
              <img
                className='instagram-icon'
                src='/social-icons/instagram.svg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
