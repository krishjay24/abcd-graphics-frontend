import { saveAs } from 'file-saver';
import CardStack from '../components/ui/CardStack.tsx';
import { cn } from '../libs/utils.ts';
import Button from './ui/Button';
import styles from '../styles/Connect.module.css';

export default function Connect({ elementsRef }) {
  const downloadPdf = () => {
    const fileUrl = '/resume.txt';
    const fileName = 'resume.txt';

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
      .catch((error) => console.error('Error downloading the File:', error));
  };

  const CARDS = [
    {
      id: 0,
      name: 'Danielblazer',
      designation: '',
      content: (
        <p>
          Choosing them for web development was a great decision. The skilled
          team created a stunning website, exceeding expectations.
        </p>
      ),
    },
    {
      id: 1,
      name: 'Junglesound',
      designation: '',
      content: (
        <p>
          Exceptional value for the price. The team efficiently crafts complex
          websites in a short time by delivering outstanding results and sales.
        </p>
      ),
    },
    {
      id: 2,
      name: 'Shanmalick',
      designation: '',
      content: (
        <p>
          Highly knowledgeable team swiftly delivered a customized website
          design matching my vision at an affordable price. Best wishes to the
          team.
        </p>
      ),
    },
    {
      id: 3,
      name: 'Matthew',
      designation: '',
      content: (
        <p>
          Thanks for the great, flexible work. Extremely satisfied with the
          result. Will definitely hire them again for their adaptability.
        </p>
      ),
    },
    {
      id: 4,
      name: 'Azngtrading',
      designation: '',
      content: (
        <p>
          Team transformed our outdated website into a modern masterpiece,
          showcasing their web design expertise, attention to detail, and
          competitive edge.
        </p>
      ),
    },
    {
      id: 5,
      name: 'Mukesh kumar',
      designation: '',
      content: (
        <p>
          Working with them on UX design was a game-changer for our app. They
          optimised every interaction, making it a joy to use with a fresh look.
        </p>
      ),
    },
    {
      id: 6,
      name: 'Hina Amir',
      designation: '',
      content: (
        <p>
          The design team's creativity shines in brochures and posters, adding
          professionalism and elevating marketing strategies and content
          efficiency.
        </p>
      ),
    },
    {
      id: 7,
      name: 'Christiansor',
      designation: '',
      content: (
        <p>
          Social media engagement skyrocketed with their graphics, especially
          Akhil's stunning visuals that resonate with our consumers.
        </p>
      ),
    },
    {
      id: 8,
      name: 'Fitzdylandf',
      designation: '',
      content: (
        <p>
          They're our trusted designers, consistently addressing and modifying
          according to our needs. Our go-to partners for all design
          requirements.
        </p>
      ),
    },
    {
      id: 9,
      name: 'Technosnippets',
      designation: '',
      content: (
        <p>
          Their SEO boosted search rankings, enhancing online visibility and
          user-friendliness, resulting in increased sales. A game-changer for
          us.
        </p>
      ),
    },
  ];

  return (
    <div
      data-name='TIME TO CONNECT'
      ref={(el) => (elementsRef.current[14] = el)}
      className={styles.letsConnectContainer}
    >
      <div>
        <div className={styles.letsConnectCol1}>
          <h2>DESIGN EXCELLENCE</h2>
          <p>
            My core belief is always to under-commit and over-deliver. I have
            the strategic ability to understand an idea and convert it into
            meaningful designs in various form factors that meet the objectives
            of clients.
          </p>
          <p>
            Now that you've reached this section of my website, I think we have
            a strong potential to be great friends, and I always treat my
            friends to something special.
          </p>
          <p>
            Here's a quick sneak peek into some of my creative lines of thought
            that I've executed for various global brands in the past.
          </p>
          <p className={styles.first}>
            Now, you be the judge and tell me if I have made sense all this
            while, no pressure!
          </p>
          <p className={styles.last}>So, Why Me? Why not?</p>
        </div>
        <div className={styles.letsConnectCol3}>
          <div className={styles.connectCol21}>
            {/* <div className='connect-resume-col-1'>
              <div className='profile-name-design'>
                <div className='line'></div>
                <div className='round'>
                  <div></div>
                </div>
              </div>
            </div> */}
            <div className='connect-resume-col-2'>
              <Button onClick={downloadPdf} className='resume-download'>
                Download Resume
              </Button>
            </div>
          </div>
          <div className={styles.connectCol22}>
            <CardStack items={CARDS} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Highlight({ children, className }) {
  return (
    <span
      className={cn(
        'font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5',
        className
      )}
    >
      {children}
    </span>
  );
}
