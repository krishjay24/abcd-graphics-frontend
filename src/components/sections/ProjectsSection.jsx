import BrandProjects from '../projects/BrandProjects';
import Carousels from '../projects/Carousels';
import Documents from '../projects/Documents';
import Infographics from '../projects/Infographics';
import PackagingProjects from '../projects/PackagingProjects';
import Presentations from '../projects/Presentations';
import Collaterals from '../projects/Collaterals';
import SocialProjects from '../projects/SocialProjects';
import WebProjects from '../projects/WebProjects';
import Websites from '../projects/Websites';
import Button2 from '../ui/Button2';
import ProjectDropdown from '../ui/ProjectDropdown';
import styles from '../../styles/ProjectsSection.module.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function ProjectsSection({ elementsRef, name, currentSection }) {
  const downloadPdf = () => {
    const fileUrl = '/pdf/ABCD-Resume.pdf';
    window.open(fileUrl, '_blank');
  };

  const handleClientLogin = () => {
    window.location.href = 'https://platform.abcd.graphics/login';
  };

  return (
    <div id='works' className={styles.projectsSection}>
      <div className={styles.projectsMainHeading}>
        <div>
          <h2>PROJECTS THAT I'M PROUD OF</h2>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.dropdownContainer}>
            <ProjectDropdown currentSection={currentSection} />
          </div>
          <div className={styles.buttonsContainer}>
            <Button2
              onClick={handleClientLogin}
              className={styles.clientLoginBtn}
            >
              Client Login
            </Button2>
            <Button2 onClick={downloadPdf} className={styles.downloadResumeBtn}>
              Download Resume
            </Button2>
          </div>
        </div>
      </div>
      <WebProjects elementsRef={elementsRef} id='web' />
      <Websites elementsRef={elementsRef} id='websites' />
      <BrandProjects elementsRef={elementsRef} id='brand' />
      <Presentations elementsRef={elementsRef} id='presentations' />
      <SocialProjects elementsRef={elementsRef} id='social' />
      <Carousels elementsRef={elementsRef} id='carousels' />
      <Collaterals elementsRef={elementsRef} id='print' />
      <Documents elementsRef={elementsRef} id='documents' />
      <PackagingProjects elementsRef={elementsRef} id='packaging' />
      <Infographics elementsRef={elementsRef} id='infographics' />
    </div>
  );
}

ProjectsSection.propTypes = {
  elementsRef: PropTypes.object.isRequired,
  name: PropTypes.string,
  currentSection: PropTypes.string,
};
